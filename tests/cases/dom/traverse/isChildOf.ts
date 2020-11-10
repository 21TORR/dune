import QUnit from "qunit";
import {findFirst, isChildOf} from '../../../../src/dom/traverse';

QUnit.module("dom/isChildOf");

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


QUnit.test("isChildOf(): test cases", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	[
		[true, "#element-2-inner-2-inner", "#element-2-inner-2-inner"],
		[true, "#element-2-inner-2-inner", "#element-2-inner-2"],
		[true, "#element-2-inner-2-inner", "#element-2"],
		[false, "#element-2", "#element-2-inner-2-inner"],
		[false, "#element-2-inner-2-inner", "#element-3"],
	]
		.forEach(([expected, referenceId, parentId]: [boolean, string, string]) => {
			const reference = findFirst(referenceId, fixture);
			const parent = findFirst(parentId, fixture);

			assert.equal(isChildOf(parent, reference), expected);
		});
});


QUnit.test("isChildOf(): with body", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const reference = findFirst("#element-2-inner-2-inner", fixture);

	assert.equal(isChildOf(document.body, reference), true);
	assert.equal(isChildOf(document.documentElement, reference), true);
});
