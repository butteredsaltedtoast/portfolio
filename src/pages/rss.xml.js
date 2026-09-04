import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const writeups = (await getCollection('writeups')).sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: writeups.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/writeups/${post.id}/`,
			categories: [post.data.category, post.data.ctf],
		})),
	});
}
