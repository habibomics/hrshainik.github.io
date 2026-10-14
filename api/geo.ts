/**
 * /api/geo — Visitor country for language auto-detection (see lang.js)
 *
 * Runs on Vercel's Edge runtime and reads the country code Vercel's edge
 * network already attaches to every request, so the browser never has to call
 * a third-party IP lookup (which the site's CSP blocks anyway).
 *
 * Response: { "country_code": "BD" }  — empty string when unknown (e.g. local dev).
 * Never cached: the answer is different for every visitor.
 */

export const config = {
  runtime: "edge",
};

export default function handler(req: Request): Response {
  const country = req.headers.get("x-vercel-ip-country") ?? "";

  return new Response(JSON.stringify({ country_code: country }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, no-store",
      "x-robots-tag": "noindex",
    },
  });
}
