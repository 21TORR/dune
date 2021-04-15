import QUnit from "qunit";
import {addConsecutiveClasses} from '../../../src/animation';

QUnit.module("animation::addConsecutiveClasses()");


QUnit.test("basic test", assert =>
{
	const element = document.createElement("div");
	const done = assert.async();
	assert.expect(2);

	addConsecutiveClasses(element, "class-1", "class-2");

	requestAnimationFrame(() => {
		assert.true(element.classList.contains("class-1"));

		requestAnimationFrame(() => {
			assert.true(element.classList.contains("class-2"));
			done();
		});
	});
});


QUnit.test("fast removal", assert =>
{
	const element = document.createElement("div");
	const done = assert.async();
	assert.expect(2);

	addConsecutiveClasses(element, "class-1", "class-2");

	requestAnimationFrame(() => {
		assert.true(element.classList.contains("class-1"));
		element.classList.remove("class-1");

		requestAnimationFrame(() => {
			assert.false(element.classList.contains("class-2"));
			done();
		});
	});
});
