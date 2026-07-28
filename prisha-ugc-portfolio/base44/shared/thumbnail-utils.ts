// Shared helpers for Instagram/TikTok thumbnail extractors.

export function decodeHtml(s) {
  // Build entity patterns from parts so the ampersand entity isn't mangled
  const AMP = "&" + "amp;";
  const QUOT = "&" + "quot;";
  const APOS = "&" + "#39;";
  const SLASH = "&" + "#x2F;";
  return s
    .replace(new RegExp(AMP, "g"), "&")
    .replace(new RegExp(QUOT, "g"), '"')
    .replace(new RegExp(SLASH, "g"), "/")
    .replace(new RegExp(APOS, "g"), "'");
}

export function extractFromHtml(html) {
  let thumb = null;
  const og1 = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
  );
  if (og1) thumb = decodeHtml(og1[1]);
  if (!thumb) {
    const og2 = html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
    );
    if (og2) thumb = decodeHtml(og2[1]);
  }
  if (!thumb) {
    const poster = html.match(/poster=["']([^"']+)["']/i);
    if (poster) thumb = decodeHtml(poster[1]);
  }
  if (!thumb) {
    const img = html.match(/(https:\/\/scontent[^"'\s\\]+\.jpg)/i);
    if (img) thumb = img[1];
  }
  if (!thumb) {
    const json = html.match(
      /"display_url":"(https:\\\/\\\/scontent[^"]+\.jpg)"/
    );
    if (json) thumb = json[1].replace(/\\\//g, "/");
  }
  if (!thumb) {
    const json2 = html.match(
      /"thumbnail_src":"(https:\\\/\\\/scontent[^"]+\.jpg)"/
    );
    if (json2) thumb = json2[1].replace(/\\\//g, "/");
  }
  // TikTok CDN thumbnail hosts
  if (!thumb) {
    const m = html.match(/(https:\/\/p\d+-sign(?:-va)?\.tiktokcdn[^"'\s\\]+)/i);
    if (m) thumb = m[1];
  }
  if (!thumb) {
    const m = html.match(/(https:\/\/p\d+\.tiktokpic[^"'\s\\]+)/i);
    if (m) thumb = m[1];
  }
  return thumb;
}

export async function fetchHtml(url, userAgent) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        userAgent ||
        "Googlebot/2.1 (+http://www.google.com/bot.html)",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
    },
    redirect: "follow",
  });
  const html = await res.text();
  return { html, finalUrl: res.url };
}