import QUnit from "qunit";
import {trigger} from '../../../../src/dom/events';

QUnit.module("dom/events::trigger()");

const exampleHtml = `
	<div id="element-1" class="_e _e-test _e-first"></div>
	<div id="element-2" class="_e">
		<span id="element-2-inner" class="_e _e-test"></span>
	</div>
	Some text
	<div id="element-3" class="_e"></div>
`;


QUnit.test("triggering an event works + null-support", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element = document.getElementById("element-2")!;

	// triggering before should do nothing
	trigger(element, "click");
	// this test may not use internals, so that we know that triggering works in any case
	element.addEventListener("click", () => assert.step("event matched"), false);

	// triggering should work
	trigger(element, "click");

	// triggering with null
	trigger(null, "click");
	assert.verifySteps(["event matched"]);
});


QUnit.test("data support", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element = document.getElementById("element-2")!;
	const data = {o: "hai"};

	element.addEventListener(
		"click",
		event => {
			assert.step("event matched");
			assert.equal(event.detail, data);
		},
		false
	);

	trigger(element, "click", data);
	assert.verifySteps(["event matched"]);
});


QUnit.test("bubbling works", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const inner = document.getElementById("element-2-inner")!;
	const outer = document.getElementById("element-2")!;

	outer.addEventListener("click", () => assert.step("event matched"), false);

	trigger(inner, "click");
	assert.verifySteps(["event matched"]);
});
