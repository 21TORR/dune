import QUnit from "qunit";
import {findFirst, children} from '../../../../src/dom/traverse';

QUnit.module("dom/children");

const exampleHtml = `
	<div id="element-1"></div>
	<div id="element-2" class="match">
		<span id="element-2-inner">
			<span id="element-2-inner-inner"></span>
		</span>
		<span id="element-2-inner-2" class="filter">
			<span id="element-2-inner-2-inner"></span>
		</span>
	</div>
	Some text
	<div id="element-3"></div>
`;


QUnit.test("children(): test cases", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;

	fixture.innerHTML = exampleHtml;

	[
		["#element-1", undefined, []],
		["#element-1", null, []],
		["#element-1", "test", []],
		["#element-2", undefined, ["element-2-inner", "element-2-inner-2"]],
		["#element-2", ".filter", ["element-2-inner-2"]],
		["#element-2", ".missing", []],
		["#element-2-inner-inner", ".match", []],
		["#element-2-inner", undefined, ["element-2-inner-inner"]],
	]
		.forEach(([referenceId, selector, matches]: [string, string|null|undefined, string[]]) => {
			const reference = findFirst(referenceId, fixture);
			const result = children(reference, selector);

			assert.deepEqual(
				result.map(element => element.id),
				matches
			);
		});
});
