import QUnit from "qunit";
import {findFirst, closest} from '../../../../src/dom/traverse';

QUnit.module("dom/closest");

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


QUnit.test("closest(): test cases", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	[
		["#element-2-inner-2-inner", "#element-2-inner-2-inner", null, null],
		["#element-2-inner-2-inner", "#element-2-inner-2", null, "element-2-inner-2"],
		["#element-2-inner-2-inner", "#element-2", null, "element-2"],
		["#element-2-inner-2-inner", "#element-2", "#element-2-inner-2", null],
		["#element-3", ".missing", null, null],
		["#element-2-inner-2-inner", "#element-2", "#element-3", "element-2"],
		["#element-2-inner-2-inner", ".missing", "#element-3", null],
	]
		.forEach(([referenceId, selector, rootElementSelector, expected]: [string, string, string|null, string|null]) => {
			const reference = findFirst(referenceId, fixture);
			const rootElement = rootElementSelector ? findFirst(rootElementSelector, fixture) : null;
			const result = closest(reference, selector, rootElement);

			assert.equal(result ? result.id : null, expected);
		});
});


QUnit.test("closest(): with body", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const reference = findFirst("#element-2-inner-2-inner", fixture);

	assert.equal(closest(reference, "body"), document.body);
	assert.equal(closest(reference, "body", document.documentElement), document.body);
});
