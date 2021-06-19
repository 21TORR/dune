import QUnit from "qunit";
import {delegate, trigger} from '../../../../src/dom/events';

QUnit.module("dom/events::delegate()");

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
	const done = assert.async();
	fixture.innerHTML = exampleHtml;

	delegate(fixture, "._e-test", "click", (event, delegateTarget) =>
	{
		assert.step(delegateTarget.id);

		if ("element-4" === delegateTarget.id)
		{
			done();
		}
	});

	trigger(fixture.querySelector("#element-1"), 'click');
	trigger(fixture.querySelector("#element-2"), 'click');
	trigger(fixture.querySelector("#element-2-inner"), 'click');
	trigger(fixture.querySelector("#element-3"), 'click');

	// append new item
	const newElement = document.createElement("div");
	newElement.id = "element-4";
	newElement.classList.add("_e-test");
	fixture.appendChild(newElement);

	const newElement2 = document.createElement("div");
	newElement2.id = "element-5";
	fixture.appendChild(newElement2);

	trigger(newElement2, 'click');
	trigger(newElement, 'click');

	assert.verifySteps([
		"element-1",
		"element-2-inner",
		"element-4",
	]);
});
