import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { load } from "cheerio";
import { describe, expect, it } from "vitest";
import { Site } from "../src/Site";

describe("coverage map accessibility", () => {
  for (const path of ["/locations/", "/service-areas/"]) {
    it(`uses unique element IDs on ${path}`, () => {
      const $ = load(renderToStaticMarkup(createElement(Site, { path })));
      const ids = $("[id]")
        .map((_, element) => $(element).attr("id"))
        .get();
      expect(new Set(ids).size).toBe(ids.length);
    });
  }

  it("renders uniquely addressable quote islands on the contact page", () => {
    const $ = load(
      renderToStaticMarkup(createElement(Site, { path: "/contact-us/" })),
    );
    const ids = $("[id]")
      .map((_, element) => $(element).attr("id"))
      .get();

    expect(new Set(ids).size).toBe(ids.length);
    expect($("[data-quote-island]")).toHaveLength(2);
  });
});
