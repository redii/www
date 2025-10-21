export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	image?: string;
	draft?: boolean;
};

export type Comment = {
	author: string;
	text: string;
	related_items: Array<{
		collection: string;
		item: string;
	}>;
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

export type Droplet = {
	id: number;
	status: string;
	name: string;
	ipv4: string;
	region: string;
	size: string;
	claimCode: string;
};
