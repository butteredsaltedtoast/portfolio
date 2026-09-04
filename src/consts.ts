
export const SITE_TITLE = '.butteredtoast';
export const SITE_DESCRIPTION = "Writeups from CTFs I've participated in.";

export const PROJECT_CATEGORIES = [
	{
		id: 'security',
		label: 'Security',
		blurb: 'Offensive security and CTF tooling.',
	},
	{
		id: 'systems',
		label: 'Systems',
		blurb: 'Backend work: concurrency and real-time state.',
	},
	{
		id: 'games',
		label: 'Games',
		blurb: 'Game development and game jams.',
	},
	{
		id: 'tools',
		label: 'Tools',
		blurb: 'Small tools I built for myself.',
	},
	{
		id: 'ai',
		label: 'AI',
		blurb: 'Things I built on top of hosted language models.',
	},
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]['id'];

export const PROJECT_CATEGORY_IDS = PROJECT_CATEGORIES.map((c) => c.id) as [
	ProjectCategory,
	...ProjectCategory[],
];

export const COURSEWORK_SUBJECTS = [
	{ id: 'cs', label: 'Computer Science' },
	{ id: 'math', label: 'Mathematics' },
] as const;

export type CourseworkSubject = (typeof COURSEWORK_SUBJECTS)[number]['id'];

export const COURSEWORK_SUBJECT_IDS = COURSEWORK_SUBJECTS.map((s) => s.id) as [
	CourseworkSubject,
	...CourseworkSubject[],
];
