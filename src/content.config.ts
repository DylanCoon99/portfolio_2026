import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
    // Position on the home page among featured projects (lower comes first)
    order: z.number().optional(),
  }),
});

const hobby = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hobby" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    github: z.string().optional(),
    status: z.enum(["completed", "in-progress"]).default("completed"),
  }),
});

export const collections = { projects, hobby };
