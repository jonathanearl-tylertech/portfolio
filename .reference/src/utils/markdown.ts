import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

export const renderMarkdown = (markdown: string) => {
	return md.render(markdown);
};
