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

export interface Path {
	type: 'path';
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
		path?: Path;
	};
}
