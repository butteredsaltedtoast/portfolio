// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = '.butteredtoast';
export const SITE_DESCRIPTION = "Writeups from CTFs I've participated in.";

// Order here IS the display order on /projects. Security and systems work
// leads; the LLM-backed things trail. Change the order of this array to
// change the page. Nothing about ordering is hardcoded in the JSX.
export const PROJECT_CATEGORIES = [
	{
		id: 'security',
		label: 'Security',
		blurb: 'Offensive security and CTF tooling.',
	},
	{
		id: 'systems',
		label: 'Systems',
		blurb: 'Concurrency, real-time state, and the backends underneath.',
	},
	{
		id: 'games',
		label: 'Games',
		blurb: 'Game development and game jams.',
	},
	{
		id: 'tools',
		label: 'Tools',
		blurb: 'Small utilities built to scratch an itch.',
	},
	{
		id: 'ai',
		label: 'AI',
		blurb: 'Applications built on top of hosted language models.',
	},
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]['id'];

export const PROJECT_CATEGORY_IDS = PROJECT_CATEGORIES.map((c) => c.id) as [
	ProjectCategory,
	...ProjectCategory[],
];
