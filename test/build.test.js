import { execSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { beforeAll, beforeEach, describe, expect, test } from "vitest";

const distDir = resolve(import.meta.dirname, "../dist");

describe("production build", () => {
  beforeAll(() => {
    execSync("npx vite build", {
      cwd: resolve(import.meta.dirname, ".."),
      stdio: "pipe"
    });
  });

  beforeEach(() => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    document.documentElement.innerHTML = html;
  });

  test("outputs index.html", () => {
    expect(document.querySelector("html")).not.toBeNull();
    expect(document.querySelector("head")).not.toBeNull();
    expect(document.querySelector("body")).not.toBeNull();
  });

  test("html contains expected page structure", () => {
    expect(document.querySelector("title").textContent).toBe(
      "Tailwind CSS Template"
    );
    expect(document.querySelector("h1").textContent).toContain(
      "Tailwind CSS Template"
    );
    expect(document.body.textContent).toContain(
      "plain-old-HTML template using Tailwind CSS"
    );
  });

  test("html links to a compiled css file", () => {
    const link = document.querySelector('link[rel="stylesheet"]');
    expect(link).not.toBeNull();
    expect(link.getAttribute("href")).toMatch(/\.\/assets\/.*\.css$/);
  });

  test("compiled css contains tailwind utility styles", () => {
    const assets = readdirSync(resolve(distDir, "assets"));
    const cssFile = assets.find((f) => f.endsWith(".css"));
    expect(cssFile).toBeDefined();

    const css = readFileSync(resolve(distDir, "assets", cssFile), "utf-8");
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
