/* border-width
 *
 * CSS1:  <border-width-single>{1,4}
 */

"use strict";

var base = require('./base');
var borderWidthSingle = require('./border-width-single');
var util = require('../../util');
var validate = require('./validate');

var BorderWidth = base.baseConstructor();

util.extend(BorderWidth.prototype, base.base, {
	name: "border-width"
});


exports.parse = function (unparsedReal, parser, container) {
	var bw = new BorderWidth(parser, container, unparsedReal);
	bw.debug('parse', unparsedReal);
	bw.repeatParser(borderWidthSingle);

	if (bw.list.length < 1) {
		bw.debug('parse fail');
		return null;
	}

	if (bw.list.length > 1) {
		bw.warnIfInherit();
	}

	bw.warnIfTooManyRepeatingAttributes(bw.list, 4);
	bw.debug('parse success', bw.unparsed);
	return bw;
};