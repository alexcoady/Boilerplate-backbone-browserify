function AppController () {}

AppController.root = function () {

  console.log("| AppController -> root()");
};

AppController.page1Handler = function () {

  console.log("| AppController -> page1Handler()");
};

module.exports = AppController;
