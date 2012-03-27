"use strict";

var base = require('./base');
var util = require('../../util');

var Unparsed = function (list, parser, container) {
	this.list = list;
	this.parser = parser;
	this.container = container;
};

util.extend(Unparsed.prototype, base.base, {
	name: 'unparsed',

	advance: function () {
		if (! this.list.length) {
			return null;
		}

		var out = this.list.shift();

		this.skipWhitespace();
		return out;
	},

	clone: function () {
		return new Unparsed(this.list.slice(0), this.parser, this.container);
	},

	getTokens: function () {
		return this.list;
	},

	isContent: function (content) {
		if (content instanceof Array) {
			var myself = this;

			return content.some(function (contentElement) {
				return myself.isContent(contentElement);
			});
		}

		return this.list.length && this.list[0].content.toLowerCase() == content;
	},

	isTypeContent: function (type, content) {
		if (type instanceof Array || content instanceof Array) {
			return this.isType(type) && this.isContent(content);
		}

		return this.list.length && this.list[0].type == type && this.list[0].content.toLowerCase() == content;
	},

	isType: function (type) {
		if (type instanceof Array) {
			var myself = this;

			return type.some(function (typeElement) {
				return myself.isContent(typeElement);
			});
		}

		return this.list.length && this.list[0].type == type;
	},

	length: function () {
		return this.list.length;
	},

	match: function (against, container) {
		if (typeof against == 'string') {
			if (this.isContent(against)) {
				var tokens = this.clone();
				var v = tokens.advance();
				v.unparsed = tokens;
				return v;
			}
		} else if (typeof against == 'object') {
			if (typeof against.parse == 'function') {
				var parse = against.parse(this, container.parser, container);

				if (parse) {
					return parse;
				}
			} else {
				throw new Error("match against object without parse");
			}
		} else {
			throw new Error("match against " + (typeof against));
		}

		return null;
	},

	// [ a | b | c ]
	matchAny: function (possibilities, container) {
		if (! (possibilities instanceof Array)) {
			possibilities = [ possibilities ];
		}

		var result = null;

		while (! result && possibilities.length) {
			var t = possibilities.shift();
			result = this.match(t, container);
		}

		return result;
	},

	// [ a || b || c ]
	matchAnyOrder: function (possibilities, container) {
		var matches = [];
		var unparsed = this.clone();

		while (unparsed.length() && possibilities.length) {
			possibilities = possibilities.filter(function (value) {
				var result = unparsed.match(value, container);

				if (result) {
					matches.push(result);
					unparsed = result.unparsed;
					return false;  // No longer should match this possibility
				}

				return true;  // Try this one again later
			});
		}
		
		return {
			matches: matches,
			unparsed: unparsed
		};
	},

	shift: function () {
		return this.list.shift();
	},

	skipWhitespace: function () {
		if (this.list.length && this.list[0].type == 'S') {
			this.list.shift();
		}
	}
});

exports.constructor = Unparsed;