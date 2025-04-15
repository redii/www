export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	image?: string;
	draft?: boolean;
};

export type ItadmContent = {
	sort: number;
	date_created: Date;
	date_updated: Date;
	image?: string;
	slug: string;
	title: string;
	description?: string;
	text?: string;
};
