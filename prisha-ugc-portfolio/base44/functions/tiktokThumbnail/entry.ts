import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { fetchHtml } from "../../shared/thumbnail-utils.ts";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

function extractFromOembed(json) {
  if (json && typeof json.thumbnail_url === "string" && json.thumbnail_url) {
    return json.thumbnail_url;
  }
  return null;
}

export default async function (req) {
  try {
    // Public: thumbnails come from TikTok's public oEmbed, no user needed.
    createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const url = body.url;
    if (!url)
      return Response.json({ error: "url required" }, { status: 400 });

    const input = String(url).trim();
    if (!/tiktok\.com/i.test(input))
      return Response.json({ error: "invalid tiktok url" }, { status: 400 });

    // Resolve short links (vm.tiktok.com, /t/...) to the full video URL
    let link = input;
    try {
      const { finalUrl } = await fetchHtml(input, UA);
      link = finalUrl || input;
    } catch {
      // keep input if the resolve fails; oembed can still try it
    }

    let thumbnail = null;
    // Primary: TikTok oEmbed returns a reliable thumbnail_url
    try {
      const oembedUrl =
        "https://www.tiktok.com/oembed?url=" + encodeURIComponent(link);
      const res = await fetch(oembedUrl, {
        headers: { "User-Agent": UA, Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        thumbnail = extractFromOembed(data);
      }
    } catch {
      // fall through to html scrape below
    }

    if (!thumbnail) {
      // Fallback: scrape og:image from the video page
      try {
        const { html } = await fetchHtml(link, UA);
        // inline minimal extraction to catch tiktok cdn patterns
        const og = html.match(
          /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
        );
        if (og && og[1]) thumbnail = og[1];
      } catch {
        // ignore
      }
    }

    return Response.json({
      thumbnail,
      link,
      error: thumbnail ? null : "no thumbnail found",
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}