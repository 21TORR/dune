import QUnit from "qunit";
import {splitStringValue} from '../../../../src/lib/string';

QUnit.module("lib/string/splitStringValue");


QUnit.test("splitStringValue(): test cases", assert =>
{
	[
		[[], ""],
		[[], null],
		[[], []],
		[["test"], "test"],
		[["test"], "  test  "],
		[["a", "b"], "a b"],
		[["a", "b"], "  a   b   "],
		[["a", "b"], ["a", "b"]],
	]
		.forEach(([expected, value]: [string[], string|null|string[]]) => {
			const result = splitStringValue(value);

			assert.deepEqual(
				result,
				expected
			);
		});
});
