"use strict";
var util = require('./util');

exports.batch = util.makeVows('bg-attachment', {
	'fixed': {
		'tokens': ['IDENT'],
		'toString': 'fixed',
		'unparsed': [],
		'warnings': []
	},
	'inherit': {
		'tokens': ['IDENT'],
		'toString': 'inherit',
		'unparsed': [],
		'warnings': ['minimum_css_version_2']
	},
	'local fixed': {
		'tokens': ['IDENT', 'S', 'IDENT'],
		'toString': 'local',
		'unparsed': ['IDENT'],
		'warnings': [ 'minimum_css_version_3' ]
	},
	'invalidValue': {
		'tokens': ['IDENT'],
		'toString': null,
		'unparsed': ['IDENT'],
		'warnings': null
	}
});
