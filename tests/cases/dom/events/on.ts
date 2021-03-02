import QUnit from "qunit";
import {on, trigger} from '../../../../src/dom/events';

QUnit.module("dom/events::on()");

const exampleHtml = `
	<div id="element-1" class="_e _e-test _e-first"></div>
	<div id="element-2" class="_e">
		<span id="element-2-inner" class="_e _e-test"></span>
	</div>
	Some text
	<div id="element-3" class="_e"></div>
`;


QUnit.test("basic test", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element = document.getElementById("element-2")!;

	// triggering before should do nothing
	trigger(element, "click");

	// register event listeners
	on(element, "click", () => assert.step("event matched"));
	on(element, "custom:event", () => assert.step("custom event matched"));
	on(null, "click", () => assert.step("should not happen"));

	// triggering should work
	trigger(element, "click");
	trigger(element, "custom:event");
	trigger(element, "custom:event:unregistered");

	assert.verifySteps(["event matched", "custom event matched"]);
});

QUnit.test("registering multiple events on multiple elements", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element2 = document.getElementById("element-2")!;
	const element3 = document.getElementById("element-3")!;

	// register event listeners
	on(
		[element2, element3, null],
		["click", "custom:event"],
		event => assert.step(`event '${event.type}' matched on '${(event.target as Element).id}'`)
	);

	// triggering should work
	trigger(element2, "click");
	trigger(element2, "custom:event");
	trigger(element3, "click");
	trigger(element3, "custom:event");
	trigger(element2, "custom:event:unregistered");
	trigger(element3, "custom:event:unregistered");

	assert.verifySteps([
		"event 'click' matched on 'element-2'",
		"event 'custom:event' matched on 'element-2'",
		"event 'click' matched on 'element-3'",
		"event 'custom:event' matched on 'element-3'",
	]);
});



QUnit.test("data support", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;
	assert.expect(3);

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
	assert.expect(2);

	const inner = document.getElementById("element-2-inner")!;
	const outer = document.getElementById("element-2")!;

	outer.addEventListener("click", () => assert.step("event matched"), false);

	trigger(inner, "click");
	assert.verifySteps(["event matched"]);
});
