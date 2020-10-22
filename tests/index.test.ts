import { AST, parse } from '../src/index';

describe('Index', () => {
	test('should parse google.de', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 8,
			value: 'google.de',
			url: {
				host: {
					type: 'host',
					start: 0,
					end: 8,
					value: 'google.de'
				}
			}
		};
		const actual: AST = parse('google.de');

		expect(actual).toEqual(expected);
	});

	test('should parse http://google.de', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 15,
			value: 'http://google.de',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 3,
					value: 'http'
				},
				host: {
					type: 'host',
					start: 7,
					end: 15,
					value: 'google.de'
				}
			}
		};
		const actual: AST = parse('http://google.de');

		expect(actual).toEqual(expected);
	});
});
