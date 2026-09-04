import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROJECT_CATEGORY_IDS, COURSEWORK_SUBJECT_IDS } from './consts';

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

			github: z.string().optional(),
			site: z.object({ label: z.string(), url: z.string() }).optional(),

			stack: z.array(z.string()),

			category: z.enum(PROJECT_CATEGORY_IDS),

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

const coursework = defineCollection({
	loader: file('./src/content/coursework.yaml'),
	schema: z.object({
		name: z.string(),
		subject: z.enum(COURSEWORK_SUBJECT_IDS),
		status: z.enum(['completed', 'in-progress']),
		order: z.number(),
		designation: z.string().optional(),
	}),
});

const practice = defineCollection({
	loader: file('./src/content/practice.yaml'),
	schema: z.object({
		name: z.string(),
		url: z.string(),
		blurb: z.string(),
		unit: z.string(),
		order: z.number(),
		status: z.enum(['active', 'planned']).default('active'),
		items: z
			.array(
				z.object({
					label: z.string(),
					done: z.number(),
					total: z.number(),
					note: z.string().optional(),
				})
			)
			.default([]),
	}),
});

export const collections = { writeups, projects, ctfs, coursework, practice };