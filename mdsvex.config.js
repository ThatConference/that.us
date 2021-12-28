import path from 'path';
import autolinkHeadings from 'rehype-autolink-headings';
import slugPlugin from 'rehype-slug';
import readingTime from 'remark-reading-time';
import preview, { textFormatter, htmlFormatter } from 'remark-preview';

export default {
	extensions: ['.svx', '.md'],
	layout: {
		support: './src/_elements/layouts/markdown/Support.svelte',
		blog: './src/_elements/layouts/markdown/Blog.svelte'
	},
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [
		// adds a `readingTime` frontmatter attribute
		readingTime(),

		// Add a text preview snippet (no formatting) so we can use it in the meta description tag
		preview(textFormatter({ length: 300, maxBlocks: 1 })),

		// Add an HTML preview snippet (formatted) so we can use it when displaying all posts
		preview(
			htmlFormatter({
				length: 300,
				maxBlocks: 1
			}),
			{
				attribute: 'previewHtml'
			}
		),
		posts
	],
	rehypePlugins: [
		slugPlugin,
		[
			autolinkHeadings,
			{
				behavior: 'prepend'
			}
		]
	]
};

/**
 * Add slug to metadata and convert `date` timezone to UTC
 */
function posts() {
	return (_, file) => {
		const parsed = path.parse(file.filename);
		const slug =
			parsed.name === 'index' ? path.parse(file.filename).dir.split('/').pop() : parsed.name;

		file.data.fm = {
			...file.data.fm,
			slug,

			// remove timezone from parsed date
			date: file.data.fm.date ? new Date(file.data.fm.date).toLocaleDateString() : undefined
		};
	};
}
