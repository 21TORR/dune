import QUnit from "qunit";
import {once, trigger} from '../../../../src/dom/events';

QUnit.module("dom/events::once()");

const exampleHtml = `
	<div id="element"></div>
`;


QUnit.test("basic test", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element = document.getElementById("element")!;

	// triggering before should do nothing
	trigger(element, "click");

	// register event listeners
	once(element, "click", () => assert.step("event matched"));

	// triggering should work
	trigger(element, "click");
	trigger(element, "click");

	assert.verifySteps(["event matched"]);
});


QUnit.test("manual remove", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element = document.getElementById("element")!;

	// triggering before should do nothing
	trigger(element, "click");

	// register event listeners
	const remove = once(element, "click", () => assert.step("event matched"));

	// immediately remove
	remove();

	// triggering should work
	trigger(element, "click");

	assert.verifySteps([]);
});
