import { execSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { beforeAll, describe, expect, test } from "vitest";

const distDir = resolve(import.meta.dirname, "../dist");

describe("production build", () => {
  beforeAll(() => {
    execSync("npx vite build", {
      cwd: resolve(import.meta.dirname, ".."),
      stdio: "pipe"
    });
  });

  test("outputs index.html", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    expect(html.toLowerCase()).toContain("<!doctype html>");
  });

  test("html contains expected page structure", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    expect(html).toContain("<title>Tailwind CSS Template</title>");
    expect(html).toMatch(/Tailwind CSS Template\s*<\/h1>/);
    expect(html).toContain("plain-old-HTML template using Tailwind CSS");
  });

  test("html links to a compiled css file", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    const cssLinkMatch = html.match(/href="\.\/assets\/[^"]+\.css"/);
    expect(cssLinkMatch).not.toBeNull();
  });

  test("compiled css contains tailwind utility styles", () => {
    const assets = readdirSync(resolve(distDir, "assets"));
    const cssFile = assets.find((f) => f.endsWith(".css"));
    expect(cssFile).toBeDefined();

    const css = readFileSync(resolve(distDir, "assets", cssFile), "utf-8");
    // Tailwind should have compiled these utilities used in index.html
    expect(css).toContain("font-bold");
    expect(css).toContain("text-center");
    expect(css.length).toBeGreaterThan(100);
  });

  test("image asset is included in build output", () => {
    const assets = readdirSync(resolve(distDir, "assets"));
    const imgFile = assets.find((f) => /\.(png|jpg|svg)$/.test(f));
    expect(imgFile).toBeDefined();
  });
});
