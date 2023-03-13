import QUnit from "qunit";
import {mountJsx} from '../../../src/mount';
import {findFirst} from '../../../src/dom/traverse';

QUnit.module("mount::mountJsx()");

QUnit.test("basics", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = `<div class="base"></div>`;
	const element = fixture.firstElementChild as HTMLElement;

	const TestComponent = () => <div className="from-jsx">Test</div>;

	mountJsx(element, TestComponent);

	// replace the element
	assert.equal(1, fixture.childElementCount);
	assert.true(null === findFirst(".base", fixture));
	assert.true(null !== findFirst(".from-jsx", fixture));
});

QUnit.test("mount with selector", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = `<div class="base"><div class="target"></div></div>`;

	const TestComponent = () => <div className="mounted">Test</div>;

	mountJsx(".target", TestComponent);

	// check the mounted structure
	assert.equal(1, fixture.childElementCount);
	assert.true(null !== findFirst(".base .mounted", fixture));
});


QUnit.test("params from argument", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = `<div></div>`;

	const args = {
		test: 1,
		a: true,
	};

	const TestComponent = (props) => {
		assert.deepEqual(props, args);
		return null;
	};

	mountJsx(fixture.firstElementChild as HTMLElement, TestComponent, {
		args
	});
});


QUnit.test("params from element", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = `<div>{"test": 1,"a":true}</div>`;

	const args = {
		test: 1,
		a: true,
	};

	const TestComponent = (props) => {
		assert.deepEqual(props, args);
		return null;
	};

	mountJsx(fixture.firstElementChild as HTMLElement, TestComponent);
});


QUnit.test("merged params", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = `<div>{"test":1,"a":true}</div>`;

	const args = {
		test: 3,
		b: "test",
	};

	const TestComponent = (props) => {
		assert.deepEqual(props, {
			// the one from the embedded script should win
			test: 1,
			b: "test",
			a: true,
		});
		return null;
	};

	mountJsx(fixture.firstElementChild as HTMLElement, TestComponent, {
		args,
	});
});


QUnit.test("wrap element", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = `<div></div>`;
	const element = fixture.firstElementChild as HTMLElement;

	const TestComponent = () => null;

	mountJsx(element, TestComponent, {
		wrap: "test-element-123",
	});

	assert.equal(1, fixture.childElementCount);
	assert.equal(true, fixture.firstElementChild.classList.contains("test-element-123"));
});


QUnit.test("context", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = `
		<div class="target">
			<div class="mount-here"></div>
		</div>
		<div class="no-target">
			<div class="mount-here"></div>
		</div>
	`;

	const target = findFirst(".target", fixture);
	const TestComponent = () => <div className="mounted">Test</div>;

	mountJsx(".mount-here", TestComponent, {
		context: target,
	});

	// check that only one element exists
	assert.true(null === findFirst(".no-target .mounted", fixture));
	assert.true(null !== findFirst(".target .mounted", fixture));
});
