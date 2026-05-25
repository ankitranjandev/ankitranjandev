import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    heroVideo: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    technologies: z.array(z.string()),
    links: z.object({
      github: z.string().optional(),
      playstore: z.string().optional(),
      appstore: z.string().optional(),
      website: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const deepDiveQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
  explanation: z.string(),
});

const deepDiveTopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
});

const deepDives = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/deep-dives' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    color: z.string().optional(),
    category: z.string().default('Dart'),
    subject: z.string(),
    order: z.number(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topics: z.array(deepDiveTopicSchema),
    quiz: z.object({
      title: z.string(),
      description: z.string(),
      questions: z.array(deepDiveQuestionSchema),
    }),
  }),
});

export const collections = { posts, notes, projects, deepDives };
