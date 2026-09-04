import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROJECT_CATEGORY_IDS } from './consts';

const writeups = defineCollection({
	loader: glob({ base: './src/content/writeups', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			
			ctf: z.string(),
			category: z.enum(['pwn', 'web', 'crypto', 'reversing', 'misc', 'osint', 'forensics']),

			// 'solver' = I solved this challenge during the CTF.
			// 'author' = I wrote this challenge for the CTF.
			// Defaults to 'solver' so existing writeups need no frontmatter change.
			role: z.enum(['solver', 'author']).default('solver'),
		}),
});

const projects = defineCollection({

	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),

			github: z.string(),
			stack: z.array(z.string()),

			// Drives grouping and order on /projects. The order lives in
			// PROJECT_CATEGORIES in consts.ts, not in the page.
			category: z.enum(PROJECT_CATEGORY_IDS),

			// Draft projects stay in the repo but are excluded from the build,
			// so placeholder copy can never ship by accident.
			draft: z.boolean().default(false),
		}),

});

const ctfs = defineCollection({
	loader: file('./src/content/ctfs.yaml'),
	schema: z.object({
		name: z.string(),
		date: z.coerce.date(),
		team: z.string(),
		placement: z.number().optional(),
		division: z.string().optional(),
		status: z.string().optional(),
	}),
});

export const collections = { writeups, projects, ctfs };