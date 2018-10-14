//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import { InputProcessor, FileTypes } from '../InputProcessor';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function () {

    // Defines a Mocha unit test
    test("Input valid test", function() {
				let inputProc = new InputProcessor("ValidName");
				assert.equal(inputProc.IsValid,true);
        assert.equal(inputProc.componentName,"ValidNameComponent");
		});
		test("Input invalid test",function(){
			let inputProc = new InputProcessor("invalid name");
				assert.equal(inputProc.IsValid,false);
		});
		test("Input invalid test2",function(){
			let inputProc = new InputProcessor("invalid.name");
				assert.equal(inputProc.IsValid,false);
		});
		test("Input invalid test3",function(){
			let inputProc = new InputProcessor("3invalid");
				assert.equal(inputProc.IsValid,false);
		});
		test("File names test", function() {
			let inputProc = new InputProcessor("ValidName");
			assert.equal(inputProc.fileNameEquivalent(FileTypes.css),"validname.component.css");
			assert.equal(inputProc.fileNameEquivalent(FileTypes.ts),"validname.component.ts");
			assert.equal(inputProc.fileNameEquivalent(FileTypes.html),"validname.component.html");
	});
	test("Dir name test", function() {
		let inputProc = new InputProcessor("validname");
		assert.equal(inputProc.componentName,"ValidnameComponent");
});
});