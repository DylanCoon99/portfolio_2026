import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const projects = await getCollection("projects");
  const posts = await getCollection("blog");

  const items = [
    ...projects.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/projects/${p.id}`,
    })),
    ...posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "Dylan — Electronics, Code & Projects",
    description: "Electronics builds, breadboard prototypes, and programming projects.",
    site: context.site!,
    items,
  });
}
