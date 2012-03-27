/* <font-size>
 *
 * CSS1:  xx-small | x-small | small | medium | large | x-large | xx-large
 * CSS1:  larger | smaller | <length> | <percentage>
 * CSS2:  inherit
 */

"use strict";

var base = require('./base');
var length = require('./length');
var percentage = require('./percentage');
var util = require('../../util');
var validate = require('./validate');

var FontSize = base.baseConstructor();

util.extend(FontSize.prototype, base.base, {
	name: "font-size",

	allowed: [
		{
			validation: [
				validate.positiveValue()
			],
			values: [ 
				length,
				percentage
			]
		},
		{
			validation: [],
			values: [ 
				// absolute
				base.makeRegexp('(x?x-)?(small|large)'),
				'medium',
				// relative
				'larger',
				'smaller'
			]
		},
		{
			validation: [
				validate.minimumCss(2)
			],
			values: [
				"inherit"
			]
		}
	]
});

exports.parse = base.simpleParser(FontSize);