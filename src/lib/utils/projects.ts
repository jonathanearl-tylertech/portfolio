import type { IAuthor } from './authors';
import { JONATHAN_EARL } from './authors';
import { renderMarkdown } from './markdown';
import portfolioContent from '$lib/markdown/portfolio.md?raw';
import k8sContent from '$lib/markdown/k8s.md?raw';
import porfolioThumb from '$lib/images/portfolio.png';
import k8sThumb from '$lib/images/k8s.png';

export interface IComment {
	author: string;
	verified: boolean;
	comment: string;
	createdAt: string;
}

export interface IProject {
	id: number;
	name: string;
	createdAt: string;
	tags: string[];
	media: string;
	author: IAuthor;
	content: string;
	comments: IComment[];
}

export const COMMENTS: IComment[] = [
	{
		author: 'Jonathan Earl',
		comment: 'Happy holidays 🎄🎁',
		createdAt: '2022-12-26T23:48:00.927Z',
		verified: true
	}
];

export const listProjects = () => {
	const projects: IProject[] = [
		{
			id: 0,
			name: 'porfolio',
			author: JONATHAN_EARL,
			comments: COMMENTS,
			createdAt: '12/24/2022',
			content: renderMarkdown(portfolioContent),
			tags: ['solidjs', 'frontend'],
			media: porfolioThumb
		},
		{
			id: 1,
			name: 'k8s',
			author: JONATHAN_EARL,
			comments: COMMENTS,
			createdAt: '12/24/2022',
			content: renderMarkdown(k8sContent),
			tags: ['k8s', 'infrastructure'],
			media: k8sThumb
		}
	];
	return projects;
};
