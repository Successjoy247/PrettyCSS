/* <minmax>
 *
 * Used by <col-width>
 * minmax( WS? p WS? , WS? q WS? )
 */

"use strict";

var base = require('./base');
var length = require('./length');
var util = require('../../util');

var Minmax = base.baseConstructor();

util.extend(Minmax.prototype, base.base, {
	name: "minmax"
});


exports.parse = function (unparsed, parser, container) {
	var minmax = new Minmax(parser, container, unparsed);
	minmax.debug('parse', unparsed);

	if (! minmax.functionParser('minmax(',
		[ length, "max-content", "min-content", "*" ],
		[ length, "max-content", "min-content", "*" ])) {
		return null;
	}

	// TODO:  If P > Q then assume minmax(P,P) - add warning
	minmax.debug('parse success', minmax.unparsed);
	validate.call(minmax, 'minimumCss', 3);
	return minmax;
};