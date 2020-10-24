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

export interface PathSegment {
	type: 'path-segment';
	start: number;
	end: number;
	value: string;
}

export interface Path {
	type: 'path';
	start: number;
	end: number;
	value: string;
	segments: PathSegment[];
}

export interface Fragment {
	type: 'fragment';
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
		authority?: Authority;
		path?: Path;
		fragment?: Fragment;
	};
}
