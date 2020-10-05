const {Firefly} = require("@21torr/firefly");

module.exports = (new Firefly())
	.js({
		tests: "tests/testsuite.ts",
	})
	.outputTo("tests/dist")
	.withExternals({
		qunit: "QUnit",
	})
	.disableFileNameHashing();
