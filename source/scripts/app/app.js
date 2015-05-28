// NPM dependencies
var Backbone = require("backbone");

// Cache libraries
window.$ = Backbone.$ = require("jquery");
window._ = Backbone._ = require("lodash");
Backbone.Radio = require("backbone.radio");

var Mn = require("backbone.marionette");

// Attach templates to window (window.JST[templateName])
require("./../../templates/templates");

// App dependencies
var Application = require("./applications/application");
var AppRouter = require("./routers/appRouter");
var AppView = require("./views/appView");


var app = Application.getInstance();

app.on("start", function () {

  console.log("| Application : start");

  this.appRouter = AppRouter.getInstance();
  this.appView = AppView.getInstance();

  Backbone.history.start({ pushState: true });
});

module.exports = app;
