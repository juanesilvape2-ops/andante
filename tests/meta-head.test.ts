import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { siteMeta } from "@/content/site-meta";

const indexHtmlPath = resolve(process.cwd(), "index.html");
const html = readFileSync(indexHtmlPath, "utf-8");

describe("index.html <head> matches content/site-meta.ts", () => {
  it("uses the site title", () => {
    expect(html).toContain(`<title>${siteMeta.title}</title>`);
    expect(html).toContain(`content="${siteMeta.title}"`);
  });

  it("uses the site description", () => {
    expect(html).toContain(`content="${siteMeta.description}"`);
  });

  it("references the OG image path", () => {
    expect(html).toContain(`content="${siteMeta.ogImageUrl}"`);
  });

  it("references the favicon path", () => {
    expect(html).toContain(`href="${siteMeta.faviconUrl}"`);
  });
});
