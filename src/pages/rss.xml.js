import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	// This said getCollection('blog'), a collection that does not exist. The
	// build did not fail, it just emitted a feed with zero items.
	const writeups = (await getCollection('writeups')).sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		// Mapped explicitly rather than spreading post.data, so collection
		// fields like heroImage and role cannot leak into the feed.
		items: writeups.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/writeups/${post.id}/`,
			categories: [post.data.category, post.data.ctf],
		})),
	});
}
