// NPM dependencies
var Mn = require("backbone.marionette");

// App dependencies
var Singleton = require("./../mixins/singleton");
var Constants = require("./../common/constants");
var Radio = require("./../radio");


var AppView = Mn.LayoutView.extend({


  events: {
    "click a": "handleClick"
  },


  el: document.body,


  template: window.JST["app.html"],


  regions: {},


  initialize: function () {

    console.log("| AppView -> initialize");
  },


  /**
   *  Stops links from loading new page and triggers app event
   *  to handle action instead
   *
   *  @method handleClick
   *  @param {$.event} ev Click event object
   *  @return {Void}
   */
  handleClick: function ( ev ) {

    ev.preventDefault();

    var href = ev.currentTarget.getAttribute("href");

    Radio.trigger( Constants.EVENT_LINK_CLICKED, href );
  }

});

_.extend( AppView, Singleton );

module.exports = AppView;
