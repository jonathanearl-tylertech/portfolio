export interface IAuthor {
	id: number;
	name: string;
	media: {
		profileImageUrl: string;
	};
	verified: boolean;
}

export const JONATHAN_EARL: IAuthor = {
	id: 0,
	name: 'Jonathan Earl',
	media: {
		profileImageUrl: '/favicon.svg'
	},
	verified: true
};

export const getAuthor = () => {
	return JONATHAN_EARL;
};
