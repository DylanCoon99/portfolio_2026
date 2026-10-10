import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const projects = (await getCollection("projects")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: "Dylan Coon — Projects",
    description: "Software engineering and machine learning projects by Dylan Coon.",
    site: context.site!,
    items: projects.map((project) => ({
      title: project.data.title,
      description: project.data.description,
      pubDate: project.data.date,
      link: `/projects/${project.id}/`,
    })),
  });
}
