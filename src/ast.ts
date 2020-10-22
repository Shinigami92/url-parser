export interface Schema {
	type: 'schema';
	start: number;
	end: number;
	value: string;
}

export interface Host {
	type: 'host';
	start: number;
	end: number;
	value: string;
}

export interface Pathname {
	type: 'pathname';
	start: number;
	end: number;
	value: string;
}

export interface AST {
	type: 'url';
	start: number;
	end: number;
	value: string;
	url: {
		schema?: Schema;
		host: Host;
		pathname?: Pathname;
	};
}
