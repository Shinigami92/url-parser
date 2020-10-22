import { AST, parse } from '../src/index';

describe('Index', () => {
	test('should parse google.de', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 9,
			value: 'google.de',
			url: {
				host: {
					type: 'host',
					start: 0,
					end: 9
				}
			}
		};
		const actual: AST = parse('google.de');

		expect(actual).toStrictEqual(expected);
	});
});
