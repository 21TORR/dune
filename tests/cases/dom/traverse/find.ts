import QUnit from "qunit";
import {find, findFirst} from '../../../../src/dom/traverse';

QUnit.module("dom/traverse");

const exampleHtml = `
	<div id="element-1" class="_e _e-test _e-first"></div>
	<div id="element-2" class="_e">
		<span id="element-2-inner" class="_e _e-test"></span>
	</div>
	Some text
	<div id="element-3" class="_e"></div>
`;


QUnit.test("find() + findFirst(): global cases", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	[
		["._e-first", ["element-1"]],
		["span", ["element-2-inner"]],
		[".missing", []],
		["._e", ["element-1", "element-2", "element-2-inner", "element-3"]],
	]
		.forEach(([selector, matches]: [string, string[]]) => {
			const elements = find(selector, fixture);

			assert.deepEqual(
				elements.map(element => element.id),
				matches
			);
			assert.equal(findFirst(selector, fixture), elements[0] ?? null);
		});
});


QUnit.test("find() + findFirst(): local tests", assert =>
{
	document.getElementById("qunit-fixture")!.innerHTML = exampleHtml;
	const context = document.getElementById("element-2")!;
	const elements = find("._e", context);

	assert.equal(elements.length, 1);
	assert.equal(elements[0].id, "element-2-inner");
	assert.equal(findFirst("._e", context), elements[0]);
});
