import { AST, Authority, Host, Path, PathSegment, Port, Schema } from './ast';

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

	let authority: Authority | undefined;
	let host: Host | undefined;
	let port: Port | undefined;
	let portOffset: number;

	if (hostMatch) {
		const portMatchResult: RegExpExecArray | null = /^([^:]*):?(\d*)/.exec(hostMatch);
		console.log('portMatchResult:', portMatchResult);
		const portMatch: string | undefined = portMatchResult?.[2];
		console.log('portMatch:', portMatch);
		if (portMatch) {
			hostMatch = hostMatch.slice(0, -portMatch.length - 1);
		}
		console.log('hostMatch:', hostMatch);

		host = {
			type: 'host',
			start: hostOffset,
			end: hostOffset + hostMatch.length - 1,
			value: hostMatch
		};

		authority = {
			type: 'authority',
			start: host.start,
			end: host.end,
			value: host.value,
			host
		};

		console.log('host.end:', host.end);
		portOffset = host.end + (portMatch ? 2 : 0);
		console.log('portOffset:', portOffset);

		if (portMatch) {
			port = {
				type: 'port',
				start: portOffset,
				end: portOffset + portMatch.length - 1,
				value: portMatch
			};

			authority.end = port.end;
			authority.value += ':';
			authority.value += port.value;
			authority.port = port;
		}
	} else {
		portOffset = -1;
	}

	let path: Path | undefined;
	// console.log({
	// 	portOffset,
	// 	'port?.value.length': port?.value.length,
	// 	'portOffset + (port?.value.length ?? 0)': portOffset + ((port?.value.length ?? 1) - 1 ?? 0),
	// 	'urlWithoutSchema.length': urlWithoutSchema.length,
	// 	'url.length': url.length
	// });

	const urlWithoutHost: string = url.slice(portOffset + ((port?.value.length ?? 1) - 1 ?? 0) + 1);
	console.log('urlWithoutHost:', urlWithoutHost);
	const pathOffset: number = (port ? port.end : host?.end ?? -1) + 1;
	console.log('pathOffset:', pathOffset);

	if (urlWithoutHost) {
		const pathSegments: PathSegment[] = [];

		const pathSegmentRegex: RegExp = /(\/[^/]*)/g;
		let pathSegmentMatchResult: RegExpExecArray | null;

		let nextPathSegmentOffset: number = pathOffset;

		while ((pathSegmentMatchResult = pathSegmentRegex.exec(urlWithoutHost)) !== null) {
			console.log('pathSegmentMatchResult:', pathSegmentMatchResult);

			pathSegments.push({
				type: 'path-segment',
				start: nextPathSegmentOffset,
				end: nextPathSegmentOffset + (pathSegmentMatchResult[1].length - 1),
				value: pathSegmentMatchResult[1]
			});

			nextPathSegmentOffset += pathSegmentMatchResult[1].length;
		}

		path = {
			type: 'path',
			start: pathOffset,
			end: pathOffset + urlWithoutHost.length - 1,
			value: urlWithoutHost,
			segments: pathSegments
		};
	}

	const ast: AST = {
		type: 'url',
		start: 0,
		end: url.length - 1,
		value: url,
		url: { schema, authority, path }
	};

	return ast;
}
