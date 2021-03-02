import QUnit from "qunit";
import {mount} from '../../../src/mount';

QUnit.module("mount::mount()");

const exampleHtml = `
	<div id="element-1">
		<div id="element-1-1" class="a"></div>
		<div id="element-1-2"></div>
	</div>
	<div id="element-2">
		<div id="element-2-1" class="a"></div>
		<div id="element-2-2" class="a"></div>
	</div>
	<div id="element-3" class="a"></div>
`;

QUnit.test("basic test", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	mount(".a", (element) => assert.step(element.id));

	assert.verifySteps([
		"element-1-1",
		"element-2-1",
		"element-2-2",
		"element-3",
	]);
});

QUnit.test("with context", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const context = document.getElementById("element-1");

	mount(
		".a",
		(element) => assert.step(element.id),
		{context}
	);

	assert.verifySteps([
		"element-1-1",
	]);
});


QUnit.test("with args", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;
	const arg1 = 123;
	const arg2 = "test";

	mount(
		"#element-2",
		(element, a, b) =>
		{
			assert.step(element.id);
			assert.equal(a, arg1);
			assert.equal(b, arg2);
		},
		{args: [arg1, arg2]}
	);

	assert.verifySteps([
		"element-2",
	]);
});
