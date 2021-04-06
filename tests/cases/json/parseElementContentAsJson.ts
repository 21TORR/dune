import QUnit from 'qunit';
import {parseElementContentAsJson} from '../../../src/json';

QUnit.module("json::parseElementContentAsJson()");


QUnit.test("basic test", assert =>
{
	const fixture = document.getElementById("qunit-fixture")!;
	const cases = [
		[`<img>`, null],
		[`<div>"test"</div>`, "test"],
		[`<script type="application/json">{"a": "test"}</script>`, {a: "test"}],
		[`<script type="application/json">{"a": "test&amp;"}</script>`, {a: "test&"}],
		[`<script type="application/json">{"a": "test &lt;strong&gt;bold&lt;/strong&gt;"}</script>`, {a: "test <strong>bold</strong>"}],
	];

	cases.forEach(([html, expected]) => {
		fixture.innerHTML = html;
		const element = fixture.firstElementChild;

		assert.deepEqual(
			parseElementContentAsJson(element),
			expected,
			`HTML: ${html}`
		);
	});
});

