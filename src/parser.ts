import { AST } from './ast';

export function parse(url: string): AST {
	return {
		type: 'url',
		start: 0,
		end: url.length,
		value: url,
		url: {
			host: {
				type: 'host',
				start: 0,
				end: url.length
			}
		}
	};
}
