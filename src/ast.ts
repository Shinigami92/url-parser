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

export interface Port {
	type: 'port';
	start: number;
	end: number;
	value: string;
}

export interface Authority {
	type: 'authority';
	start: number;
	end: number;
	value: string;
	host: Host;
	port?: Port;
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
		authority: Authority;
		path?: Path;
	};
}
