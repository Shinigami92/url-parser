import { AST, Host, Path, Schema } from './ast';

export function parse(url: string): AST {
	console.log('url:', url);

	const schemaMatchResult: RegExpExecArray | null = /^(.*):\/\//.exec(url);
	console.log('schemaMatchResult:', schemaMatchResult);
	const schemaMatch: string | undefined = schemaMatchResult?.[1];
	console.log('schemaMatch:', schemaMatch);
	console.log('schemaMatch.length:', schemaMatch?.length);
	let schema: Schema | undefined;
	if (schemaMatch) {
		schema = {
			type: 'schema',
			start: 0,
			end: schemaMatch.length - 1,
			value: schemaMatch
		};
	}

	const hostOffset: number = schema ? schema.value.length + 3 : 0;
	console.log('hostOffset:', hostOffset);

	const urlWithoutSchema: string = url.slice(hostOffset);
	console.log('urlWithoutSchema:', urlWithoutSchema);

	const hostMatchResult: RegExpExecArray | null = /^(.+)\/?/.exec(urlWithoutSchema);
	console.log('hostMatchResult:', hostMatchResult);
	let hostMatch: string = hostMatchResult?.[1] ?? '';
	if (hostMatch[hostMatch.length - 1] === '/') {
		hostMatch = hostMatch.slice(0, -1);
	}
	console.log('hostMatch:', hostMatch);

	const host: Host = {
		type: 'host',
		start: hostOffset,
		end: hostOffset + hostMatch.length - 1,
		value: hostMatch
	};

	let path: Path | undefined;
	if (hostMatch.length !== urlWithoutSchema.length) {
		const urlWithoutHost: string = urlWithoutSchema.slice(hostMatch.length);
		const pathOffset: number = host.end + 1;
		path = {
			type: 'path',
			start: pathOffset,
			end: pathOffset + urlWithoutHost.length - 1,
			value: urlWithoutHost
		};
	}

	const ast: AST = {
		type: 'url',
		start: 0,
		end: url.length - 1,
		value: url,
		url: { schema, host, path }
	};

	return ast;
}
