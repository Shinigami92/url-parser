import { AST, parse } from '../src/index';

describe('Parser', () => {
	//                 0
	//                 012345678
	test('should parse google.de', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 8,
			value: 'google.de',
			url: {
				authority: {
					type: 'authority',
					start: 0,
					end: 8,
					value: 'google.de',
					host: {
						type: 'host',
						start: 0,
						end: 8,
						value: 'google.de'
					}
				}
			}
		};
		const actual: AST = parse('google.de');

		expect(actual).toEqual(expected);
	});

	//                 0         1
	//                 0123456789012345
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
				authority: {
					type: 'authority',
					start: 7,
					end: 15,
					value: 'google.de',
					host: {
						type: 'host',
						start: 7,
						end: 15,
						value: 'google.de'
					}
				}
			}
		};
		const actual: AST = parse('http://google.de');

		expect(actual).toEqual(expected);
	});

	//                 0         1         2
	//                 0123456789012345678901
	test('should parse https://www.google.de/', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 21,
			value: 'https://www.google.de/',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 4,
					value: 'https'
				},
				authority: {
					type: 'authority',
					start: 8,
					end: 20,
					value: 'www.google.de',
					host: {
						type: 'host',
						start: 8,
						end: 20,
						value: 'www.google.de'
					}
				},
				path: {
					type: 'path',
					start: 21,
					end: 21,
					value: '/',
					segments: [
						{
							type: 'path-segment',
							start: 21,
							end: 21,
							value: '/'
						}
					]
				}
			}
		};
		const actual: AST = parse('https://www.google.de/');

		expect(actual).toEqual(expected);
	});

	//                 0         1         2
	//                 012345678901234567890123456789
	test('should parse https://github.com/Shinigami92', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 29,
			value: 'https://github.com/Shinigami92',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 4,
					value: 'https'
				},
				authority: {
					type: 'authority',
					start: 8,
					end: 17,
					value: 'github.com',
					host: {
						type: 'host',
						start: 8,
						end: 17,
						value: 'github.com'
					}
				},
				path: {
					type: 'path',
					start: 18,
					end: 29,
					value: '/Shinigami92',
					segments: [
						{
							type: 'path-segment',
							start: 18,
							end: 29,
							value: '/Shinigami92'
						}
					]
				}
			}
		};
		const actual: AST = parse('https://github.com/Shinigami92');

		expect(actual).toEqual(expected);
	});

	//                 0         1         2         3         4
	//                 01234567890123456789012345678901234567890
	test('should parse https://github.com/Shinigami92/url-parser', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 40,
			value: 'https://github.com/Shinigami92/url-parser',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 4,
					value: 'https'
				},
				authority: {
					type: 'authority',
					start: 8,
					end: 17,
					value: 'github.com',
					host: {
						type: 'host',
						start: 8,
						end: 17,
						value: 'github.com'
					}
				},
				path: {
					type: 'path',
					start: 18,
					end: 40,
					value: '/Shinigami92/url-parser',
					segments: [
						{
							type: 'path-segment',
							start: 18,
							end: 29,
							value: '/Shinigami92'
						},
						{
							type: 'path-segment',
							start: 30,
							end: 40,
							value: '/url-parser'
						}
					]
				}
			}
		};
		const actual: AST = parse('https://github.com/Shinigami92/url-parser');

		expect(actual).toEqual(expected);
	});

	//                 0         1         2         3         4         5
	//                 01234567890123456789012345678901234567890123456789012345678
	test('should parse https://github.com/Shinigami92/url-parser/settings/branches', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 58,
			value: 'https://github.com/Shinigami92/url-parser/settings/branches',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 4,
					value: 'https'
				},
				authority: {
					type: 'authority',
					start: 8,
					end: 17,
					value: 'github.com',
					host: {
						type: 'host',
						start: 8,
						end: 17,
						value: 'github.com'
					}
				},
				path: {
					type: 'path',
					start: 18,
					end: 58,
					value: '/Shinigami92/url-parser/settings/branches',
					segments: [
						{
							type: 'path-segment',
							start: 18,
							end: 29,
							value: '/Shinigami92'
						},
						{
							type: 'path-segment',
							start: 30,
							end: 40,
							value: '/url-parser'
						},
						{
							type: 'path-segment',
							start: 41,
							end: 49,
							value: '/settings'
						},
						{
							type: 'path-segment',
							start: 50,
							end: 58,
							value: '/branches'
						}
					]
				}
			}
		};
		const actual: AST = parse('https://github.com/Shinigami92/url-parser/settings/branches');

		expect(actual).toEqual(expected);
	});

	//                 0         1         2         3         4         5         6         7         8         9
	//                 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456
	test('should parse https://github.com/Shinigami92/url-parser/compare/fe02a622ef9292c8d2fecd643529ed04856ff8c9...main', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 96,
			value: 'https://github.com/Shinigami92/url-parser/compare/fe02a622ef9292c8d2fecd643529ed04856ff8c9...main',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 4,
					value: 'https'
				},
				authority: {
					type: 'authority',
					start: 8,
					end: 17,
					value: 'github.com',
					host: {
						type: 'host',
						start: 8,
						end: 17,
						value: 'github.com'
					}
				},
				path: {
					type: 'path',
					start: 18,
					end: 96,
					value: '/Shinigami92/url-parser/compare/fe02a622ef9292c8d2fecd643529ed04856ff8c9...main',
					segments: [
						{
							type: 'path-segment',
							start: 18,
							end: 29,
							value: '/Shinigami92'
						},
						{
							type: 'path-segment',
							start: 30,
							end: 40,
							value: '/url-parser'
						},
						{
							type: 'path-segment',
							start: 41,
							end: 48,
							value: '/compare'
						},
						{
							type: 'path-segment',
							start: 49,
							end: 96,
							value: '/fe02a622ef9292c8d2fecd643529ed04856ff8c9...main'
						}
					]
				}
			}
		};
		const actual: AST = parse(
			'https://github.com/Shinigami92/url-parser/compare/fe02a622ef9292c8d2fecd643529ed04856ff8c9...main'
		);

		expect(actual).toEqual(expected);
	});

	//                 0         1         2
	//                 01234567890123456789012345678
	test('should parse http://127.0.0.1:8080/service', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 28,
			value: 'http://127.0.0.1:8080/service',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 3,
					value: 'http'
				},
				authority: {
					type: 'authority',
					start: 7,
					end: 20,
					value: '127.0.0.1:8080',
					host: {
						type: 'host',
						start: 7,
						end: 15,
						value: '127.0.0.1'
					},
					port: {
						type: 'port',
						start: 17,
						end: 20,
						value: '8080'
					}
				},
				path: {
					type: 'path',
					start: 21,
					end: 28,
					value: '/service',
					segments: [
						{
							type: 'path-segment',
							start: 21,
							end: 28,
							value: '/service'
						}
					]
				}
			}
		};
		const actual: AST = parse('http://127.0.0.1:8080/service');

		expect(actual).toEqual(expected);
	});

	//                 0
	//                 01234567
	test('should parse /service', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 7,
			value: '/service',
			url: {
				path: {
					type: 'path',
					start: 0,
					end: 7,
					value: '/service',
					segments: [
						{
							type: 'path-segment',
							start: 0,
							end: 7,
							value: '/service'
						}
					]
				}
			}
		};
		const actual: AST = parse('/service');

		expect(actual).toEqual(expected);
	});

	//                 0         1         2
	//                 0123456789012345678901234
	test('should parse http://[::1]:8080/service', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 24,
			value: 'http://[::1]:8080/service',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 3,
					value: 'http'
				},
				authority: {
					type: 'authority',
					start: 7,
					end: 16,
					value: '[::1]:8080',
					host: {
						type: 'host',
						start: 7,
						end: 11,
						value: '[::1]'
					},
					port: {
						type: 'port',
						start: 13,
						end: 16,
						value: '8080'
					}
				},
				path: {
					type: 'path',
					start: 17,
					end: 24,
					value: '/service',
					segments: [
						{
							type: 'path-segment',
							start: 17,
							end: 24,
							value: '/service'
						}
					]
				}
			}
		};
		const actual: AST = parse('http://[::1]:8080/service');

		expect(actual).toEqual(expected);
	});

	//                 0         1         2         3         4         5         6
	//                 0123456789012345678901234567890123456789012345678901234567890123456
	test('should parse https://github.com/Shinigami92/url-parser/blob/main/package.json#L3', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 66,
			value: 'https://github.com/Shinigami92/url-parser/blob/main/package.json#L3',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 4,
					value: 'https'
				},
				authority: {
					type: 'authority',
					start: 8,
					end: 17,
					value: 'github.com',
					host: {
						type: 'host',
						start: 8,
						end: 17,
						value: 'github.com'
					}
				},
				path: {
					type: 'path',
					start: 18,
					end: 63,
					value: '/Shinigami92/url-parser/blob/main/package.json',
					segments: [
						{
							type: 'path-segment',
							start: 18,
							end: 29,
							value: '/Shinigami92'
						},
						{
							type: 'path-segment',
							start: 30,
							end: 40,
							value: '/url-parser'
						},
						{
							type: 'path-segment',
							start: 41,
							end: 45,
							value: '/blob'
						},
						{
							type: 'path-segment',
							start: 46,
							end: 50,
							value: '/main'
						},
						{
							type: 'path-segment',
							start: 51,
							end: 63,
							value: '/package.json'
						}
					]
				},
				fragment: {
					type: 'fragment',
					start: 64,
					end: 66,
					value: '#L3'
				}
			}
		};
		const actual: AST = parse('https://github.com/Shinigami92/url-parser/blob/main/package.json#L3');

		expect(actual).toEqual(expected);
	});

	//                 0         1         2         3         4         5         6         7
	//                 012345678901234567890123456789012345678901234567890123456789012345678901
	test('should parse https://github.com/Shinigami92/url-parser/issues?q=is%3Aissue+is%3Aopen+', () => {
		const expected: AST = {
			type: 'url',
			start: 0,
			end: 71,
			value: 'https://github.com/Shinigami92/url-parser/issues?q=is%3Aissue+is%3Aopen+',
			url: {
				schema: {
					type: 'schema',
					start: 0,
					end: 4,
					value: 'https'
				},
				authority: {
					type: 'authority',
					start: 8,
					end: 17,
					value: 'github.com',
					host: {
						type: 'host',
						start: 8,
						end: 17,
						value: 'github.com'
					}
				},
				path: {
					type: 'path',
					start: 18,
					end: 47,
					value: '/Shinigami92/url-parser/issues',
					segments: [
						{
							type: 'path-segment',
							start: 18,
							end: 29,
							value: '/Shinigami92'
						},
						{
							type: 'path-segment',
							start: 30,
							end: 40,
							value: '/url-parser'
						},
						{
							type: 'path-segment',
							start: 41,
							end: 47,
							value: '/issues'
						}
					]
				},
				query: {
					type: 'query',
					start: 48,
					end: 71,
					value: '?q=is%3Aissue+is%3Aopen+'
				}
			}
		};
		const actual: AST = parse('https://github.com/Shinigami92/url-parser/issues?q=is%3Aissue+is%3Aopen+');

		expect(actual).toEqual(expected);
	});
});
