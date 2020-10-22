import { AST, Host, Path, Port, Schema } from './ast';

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

	const hostMatchResult: RegExpExecArray | null = /^([^/]*)/.exec(urlWithoutSchema);
	console.log('hostMatchResult:', hostMatchResult);
	let hostMatch: string = hostMatchResult?.[1] ?? '';
	console.log('hostMatch:', hostMatch);

	const portMatchResult: RegExpExecArray | null = /^([^:]*):?(\d*)/.exec(hostMatch);
	console.log('portMatchResult:', portMatchResult);
	const portMatch: string | undefined = portMatchResult?.[2];
	console.log('portMatch:', portMatch);
	if (portMatch) {
		hostMatch = hostMatch.slice(0, -portMatch.length - 1);
	}
	console.log('hostMatch:', hostMatch);

	const host: Host = {
		type: 'host',
		start: hostOffset,
		end: hostOffset + hostMatch.length - 1,
		value: hostMatch
	};

	console.log('host.end:', host.end);
	const portOffset: number = host.end + (portMatch ? 2 : 0);
	console.log('portOffset:', portOffset);
	let port: Port | undefined;
	if (portMatch) {
		port = {
			type: 'port',
			start: portOffset,
			end: portOffset + portMatch.length - 1,
			value: portMatch
		};
	}

	let path: Path | undefined;
	console.log({
		portOffset,
		'port?.value.length': port?.value.length,
		'portOffset + (port?.value.length ?? 0)': portOffset + ((port?.value.length ?? 1) - 1 ?? 0),
		'urlWithoutSchema.length': urlWithoutSchema.length,
		'url.length': url.length
	});

	const urlWithoutHost: string = url.slice(portOffset + ((port?.value.length ?? 1) - 1 ?? 0) + 1);
	console.log('urlWithoutHost:', urlWithoutHost);
	const pathOffset: number = (port ? port.end : host.end) + 1;
	console.log('pathOffset:', pathOffset);

	if (urlWithoutHost) {
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
		url: { schema, host, port, path }
	};

	return ast;
}
