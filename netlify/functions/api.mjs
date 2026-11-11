// Archivio della gestione: opere, impostazioni e foto salvate su Netlify Blobs.
// Le modifiche richiedono la password scritta su Netlify nella variabile ADMIN_PASSWORD.
import { getStore } from "@netlify/blobs";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";

export const config = { path: "/api/*" };

const store = () => getStore({ name: "sito-vincenzo-izzi", consistency: "strong" });
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
const sha = v => createHash("sha256").update(String(v)).digest();
const secret = () => (globalThis.Netlify?.env?.get?.("ADMIN_PASSWORD") ?? process.env.ADMIN_PASSWORD ?? "").trim();
const isAdmin = req => {
  const pw = secret();
  if (!pw) return false;
  return timingSafeEqual(sha(req.headers.get("x-password") || ""), sha(pw));
};
const pause = () => new Promise(r => setTimeout(r, 700));
const TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export default async (req) => {
  const [route, arg] = new URL(req.url).pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);
  const s = store();
  try {
    if (req.method === "GET" && route === "data") {
      const [works, settings] = await Promise.all([s.get("works", { type: "json" }), s.get("settings", { type: "json" })]);
      return json({ works, settings });
    }
    if (req.method === "GET" && route === "img" && arg) {
      const e = await s.getWithMetadata("img/" + arg, { type: "arrayBuffer" });
      if (!e) return new Response("Foto non trovata", { status: 404 });
      return new Response(e.data, { headers: { "content-type": e.metadata?.type || "image/jpeg", "cache-control": "public, max-age=31536000, immutable" } });
    }
    if (req.method === "POST" && route === "login") {
      if (!secret()) return json({ error: "nopassword" }, 503);
      if (!isAdmin(req)) { await pause(); return json({ error: "wrong" }, 401); }
      return json({ ok: true });
    }
    if (!isAdmin(req)) { await pause(); return json({ error: "wrong" }, 401); }

    if (req.method === "PUT" && route === "works") {
      const body = await req.json();
      if (!Array.isArray(body)) return json({ error: "bad" }, 400);
      await s.setJSON("works", body);
      return json({ ok: true });
    }
    if (req.method === "PUT" && route === "settings") {
      const body = await req.json();
      if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "bad" }, 400);
      await s.setJSON("settings", body);
      return json({ ok: true });
    }
    if (req.method === "POST" && route === "upload") {
      const type = (req.headers.get("content-type") || "").split(";")[0].trim();
      if (!TYPES[type]) return json({ error: "type" }, 415);
      const buf = await req.arrayBuffer();
      if (!buf.byteLength) return json({ error: "empty" }, 400);
      const key = `${randomUUID()}.${TYPES[type]}`;
      await s.set("img/" + key, buf, { metadata: { type } });
      return json({ url: "/api/img/" + key });
    }
    return json({ error: "notfound" }, 404);
  } catch (e) {
    return json({ error: "server", message: String(e && e.message || e) }, 500);
  }
};
