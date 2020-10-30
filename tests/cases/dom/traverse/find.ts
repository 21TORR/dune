import QUnit from "qunit";
import {find} from '../../../../src/dom/traverse';

QUnit.module("dom/traverse");

QUnit.test("find(): global cases", assert =>
{
	document.getElementById("qunit-fixture")!.innerHTML = `
		<div class="_e _e-test _e-first" data-id="1"></div>
		<div class="_e" data-id="2">
			<span class="_e _e-test" data-id="2-inner"></span>
		</div>
		Some text
		<div class="_e" data-id="3"></div>
	`;

	[
		["._e-first", ["1"]],
		["span", ["2-inner"]],
		[".missing", []],
		["._e", ["1", "2", "2-inner", "3"]],
	]
		.forEach(([selector, matches]: [string, string[]]) => {
			const elements = find(`#qunit-fixture ${selector}`);
			console.log(elements);

			assert.deepEqual(
				elements.map(element => element.dataset.id),
				matches
			);
		});
});


QUnit.test("find(): local tests", assert =>
{
	document.getElementById("qunit-fixture")!.innerHTML = `
		<div class="_e _e-test _e-first" data-id="1"></div>
		<div class="_e" data-id="2" id="test-context">
			<span class="_e _e-test" data-id="2-inner"></span>
		</div>
		Some text
		<div class="_e" data-id="3"></div>
	`;

	const context = document.getElementById("test-context")!;

	const elements = find("._e", context);

	assert.equal(elements.length, 1);
	assert.equal(elements[0].dataset.id, "2-inner");
});
