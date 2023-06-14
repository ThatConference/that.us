import path from 'path';
import autolinkHeadings from 'rehype-autolink-headings';
import slugPlugin from 'rehype-slug';
import readingTime from 'remark-reading-time';
import { s } from 'hastscript';
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
				behavior: 'prepend',
				// properties: {
				// 	ariaHidden: true,
				// 	tabIndex: -1,
				// 	class: ''
				// },
				// on auto-headings insert svg along with anchor slug
				content: s(
					'svg',
					{
						xmlns: 'http://www.w3.org/2000/svg',
						viewBox: '0 0 16 16',
						width: 16,
						height: 16,
						class: 'mr-2 inline rounded-full hover:bg-gray-400'
					},
					s('path', {
						d: 'm7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z'
					})
				)
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
