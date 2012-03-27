"use strict";
var vows = require('vows');
var pseudo = require('../../lib/css/pseudoelement');
var util = require('./util');

vows.describe('lib/css/pseudoelement.js').addBatch({
	'pseudoelement.css': util.tokenizeFile({
		'pseudoelement.json': util.compareResult(pseudo)
	})
}).export(module);