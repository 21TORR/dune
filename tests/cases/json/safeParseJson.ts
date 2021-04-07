import QUnit from 'qunit';
import {safeParseJson} from '../../../src/json';

QUnit.module("json::safeParseJson()");

QUnit.test("basic test", assert =>
{
	const cases = [
		[null, null],
		["", null],
		["    ", null],
		['{"a": true}', {a: true}],
		['  {"a": true}  ', {a: true}],
		["invalid", null],
		[213, null],
		[true, null],
		[false, null],
	];

	cases.forEach(([value, expected]) => {
		assert.deepEqual(safeParseJson(value), expected);
	});
});
