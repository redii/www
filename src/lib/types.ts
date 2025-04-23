export type Notification = {
	type: 'default' | 'info' | 'success' | 'warning' | 'error';
	title: string;
	description: string;
};

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

export type Droplet = {
	id: number;
	status: string;
	name: string;
	ipv4: string;
	region: string;
	size: string;
	claimCode: string;
};
