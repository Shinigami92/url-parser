export interface Host {
	type: 'host';
	start: number;
	end: number;
}

export interface Pathname {
	type: 'pathname';
	start: number;
	end: number;
}

export interface AST {
	type: 'url';
	start: number;
	end: number;
	value: string;
	url: {
		host: Host;
		pathname?: Pathname;
	};
}
