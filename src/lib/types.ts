export type Post = {
	slug: string;
	date: string;
	title: string;
	description?: string;
	image?: string;
	status: 'draft' | 'published' | 'archived' | 'hidden';
};

export type Comment = {
	author: string;
	text: string;
	related_items: Array<{
		collection: string;
		item: string;
	}>;
};

export type Reaction = {
	emoji: string;
	related_items: Array<{
		collection: string;
		item: string;
	}>;
};

export type VacationDay = {
	id: string;
	vacation: string;
	date: string;
	title: string;
	text: string;
	location: {
		coordinates: number[];
	};
	images: Array<{
		image: string;
		description: string;
	}>;
	comments?: Array<{
		id: string;
		author?: string;
		text: string;
	}>;
	reactions?: Array<{
		id: string;
		value: string;
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
