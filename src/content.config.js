import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.mdx",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/[\\/]index\.mdx$/, "").replace(/\\/g, "/"),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      canonical: z.string().url().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      readingTime: z.number().int().positive().optional(),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      author: z.string(),
      thumbnail: image(),
      thumbnailAlt: z.string().default(""),
      imageCredit: z
        .object({
          caption: z.string().optional(),
          author: z.string(),
          authorUrl: z.string().url(),
          source: z.string().default("Unsplash"),
          sourceUrl: z.string().url(),
        })
        .optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const books = defineCollection({
  loader: glob({
    pattern: "**/index.mdx",
    base: "./src/content/books",
    generateId: ({ entry }) => entry.replace(/[\\/]index\.mdx$/, "").replace(/\\/g, "/"),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image().optional(),
      authorId: z.string().optional(), // slug of the poet
      authorName: z.string().optional(), // fallback text
      downloadUrl: z.string().optional(),
    }),
});

const poets = defineCollection({
  loader: glob({
    pattern: "**/index.mdx",
    base: "./src/content/poets",
    generateId: ({ entry }) => entry.replace(/[\\/]index\.mdx$/, "").replace(/\\/g, "/"),
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      photo: image().optional(),
    }),
});

const poems = defineCollection({
  loader: glob({
    pattern: "**/index.mdx",
    base: "./src/content/poems",
    generateId: ({ entry }) => entry.replace(/[\\/]index\.mdx$/, "").replace(/\\/g, "/"),
  }),
  schema: () =>
    z.object({
      title: z.string(),
      poetId: z.string(), // slug of the poet
    }),
});

export const collections = { blog, books, poets, poems };

