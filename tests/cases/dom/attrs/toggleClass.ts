import QUnit from "qunit";
import {toggleClass} from '../../../../src/dom/attrs';

QUnit.module("dom/attrs::toggleClass()");

const exampleHtml = `
	<div id="element-1"></div>
	<div id="element-2"></div>
	<div id="element-3"></div>
`;

QUnit.test("basic test", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element = document.getElementById("element-1");

	assert.equal(false, element.classList.contains("test"));

	toggleClass(element, "test", true);
	assert.equal(true, element.classList.contains("test"));

	toggleClass(element, "test", true);
	assert.equal(true, element.classList.contains("test"));

	toggleClass(element, "test", false);
	assert.equal(false, element.classList.contains("test"));

	toggleClass(element, "test", false);
	assert.equal(false, element.classList.contains("test"));
});

QUnit.test("multiple elements", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element1 = document.getElementById("element-1");
	const element2 = document.getElementById("element-2");
	const element3 = document.getElementById("element-3");

	element2.classList.add("to-add");
	element3.classList.add("to-remove");

	// check proper setup
	assert.equal(false, element1.classList.contains("to-add"));
	assert.equal(true, element2.classList.contains("to-add"));
	assert.equal(false, element3.classList.contains("to-add"));

	assert.equal(false, element1.classList.contains("to-remove"));
	assert.equal(false, element2.classList.contains("to-remove"));
	assert.equal(true, element3.classList.contains("to-remove"));

	toggleClass([element1, element2, element3], "to-add", true);
	toggleClass([element1, element2, element3], "to-remove", false);

	assert.equal(true, element1.classList.contains("to-add"));
	assert.equal(true, element2.classList.contains("to-add"));
	assert.equal(true, element3.classList.contains("to-add"));

	assert.equal(false, element1.classList.contains("to-remove"));
	assert.equal(false, element2.classList.contains("to-remove"));
	assert.equal(false, element3.classList.contains("to-remove"));
});

QUnit.test("multiple classes", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	fixture.innerHTML = exampleHtml;

	const element = document.getElementById("element-1");

	// check proper setup
	assert.equal(false, element.classList.contains("test"));
	assert.equal(false, element.classList.contains("test2"));
	assert.equal(false, element.classList.contains("test3"));

	// add multiple
	toggleClass(element, ["test", "test2", "test3"], true);
	assert.equal(true, element.classList.contains("test"));
	assert.equal(true, element.classList.contains("test2"));
	assert.equal(true, element.classList.contains("test3"));

	// remove multiple
	toggleClass(element, ["test", "test2", "test3"], false);
	assert.equal(false, element.classList.contains("test"));
	assert.equal(false, element.classList.contains("test2"));
	assert.equal(false, element.classList.contains("test3"));
});
