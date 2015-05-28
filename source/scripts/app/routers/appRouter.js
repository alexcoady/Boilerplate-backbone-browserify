// NPM dependencies
var Mn = require("backbone.marionette");
var _ = require("lodash");

// App dependencies
var Singleton = require("./../mixins/singleton");
var appController = require("./../controllers/appController");
var Constants = require("./../common/constants");
var Radio = require("./../radio");

var AppRouter = Mn.AppRouter.extend({


  controller: appController,


  appRoutes: {
    "": "root",
    "page1": "page1Handler"
  },


  /**
   *  Listens to the channel to detect clicks that should be actioned using this router
   *
   *  @method initialize
   */
  initialize: function () {

    this.listenTo( Radio, Constants.EVENT_LINK_CLICKED, this.handleLinkClicked );
  },


  /**
   *  Actions a link being clicked by navigating to it
   *
   *  @method handleLinkClicked
   *  @param {String} href URL to navigate to
   */
  handleLinkClicked: function ( href ) {

    // 2nd param ensures the route functon is called
    this.navigate( href, true );
  }

});

_.extend( AppRouter, Singleton );

module.exports = AppRouter;
