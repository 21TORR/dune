import QUnit from "qunit";
import {findFirst, next} from '../../../../src/dom/traverse';

QUnit.module("dom/next");

const exampleHtml = `
	<div id="element-1"></div>
	<div id="element-2" class="match">
		<span id="element-2-inner"></span>
	</div>
	Some text
	<div id="element-3"></div>
`;


QUnit.test("next(): test cases", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;

	fixture.innerHTML = exampleHtml;

	[
		["#element-1", undefined, ["element-2", "element-3"]],
		["#element-1", null, ["element-2", "element-3"]],
		["#element-1", "test", []],
		["#element-3", undefined, []],
		["#element-1", ".missing", []],
		["#element-1", ".match", ["element-2"]],
		["#element-2-inner", undefined, []],
	]
		.forEach(([referenceId, selector, matches]: [string, string|null|undefined, string[]]) => {
			const reference = findFirst(referenceId, fixture);
			const result = next(reference, selector);

			assert.deepEqual(
				result.map(element => element.id),
				matches
			);
		});
});
