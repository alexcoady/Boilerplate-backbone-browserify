// NPM dependencies
var Mn = require("backbone.marionette");
var _ = require("lodash");

// App dependencies
var Singleton = require("./../mixins/singleton");

var Application = Mn.Application.extend({

});

_.extend( Application, Singleton );

module.exports = Application;
