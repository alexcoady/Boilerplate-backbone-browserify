module.exports = {

  _instance: undefined,

  getInstance: function (optns) {

    if ( !this._instance ) this._instance = new this(optns);
    return this._instance;
  }
};
