import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { extractFromHtml, fetchHtml } from "../../shared/thumbnail-utils.ts";

function extractShortcode(url) {
  const m = String(url).match(
    /instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i
  );
  return m ? m[1] : null;
}

async function fetchThumbnail(shortcode) {
  const candidates = [
    `https://www.instagram.com/reel/${shortcode}/`,
    `https://www.instagram.com/p/${shortcode}/embed/captioned/`,
  ];
  for (const u of candidates) {
    let html;
    try {
      ({ html } = await fetchHtml(u));
    } catch {
      continue;
    }
    const thumb = extractFromHtml(html);
    if (thumb) return thumb;
  }
  return null;
}

export default async function (req) {
  try {
    // Public: thumbnails are fetched from Instagram's public page, no user needed.
    createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const url = body.url;
    if (!url)
      return Response.json({ error: "url required" }, { status: 400 });

    const shortcode = extractShortcode(url);
    if (!shortcode)
      return Response.json({ error: "invalid instagram url" }, { status: 400 });

    let thumbnail = null;
    try {
      thumbnail = await fetchThumbnail(shortcode);
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }

    return Response.json({
      shortcode,
      thumbnail,
      link: `https://www.instagram.com/reel/${shortcode}/`,
      error: thumbnail ? null : "no thumbnail found",
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}