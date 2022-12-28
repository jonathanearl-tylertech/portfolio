import { IComment } from '../../../interfaces/comments';
import { IProject } from '../../../interfaces/projects';
import { renderMarkdown } from '../../../utils/markdown';
import { JONATHAN_EARL } from '../../authors/jonathan_earl';
import content from './content.md?raw';
import media from './thumb.png';

export const K8S_COMMENTS: IComment[] = [
	{
		author: 'Jonathan Earl',
		comment: 'Happy holidays 🎄🎁',
		createdAt: '2022-12-26T23:48:00.927Z',
		verified: true
	}
];

export const K8S_METADATA: IProject = {
	id: 1,
	name: 'k8s',
	author: JONATHAN_EARL,
	comments: K8S_COMMENTS,
	createdAt: '12/24/2022',
	content: renderMarkdown(content),
	tags: ['k8s', 'infrastructure'],
	media: media
};

