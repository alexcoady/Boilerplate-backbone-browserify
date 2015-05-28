# Front-end boilerplate

A front-end boilerplate that provides the following:
- gulp
    - browserify
    - javascript uglifier
    - sass compiler
    - CSS autoprefixer
    - browser-sync live-reload server
    - index.html serving middleware (any link loads index.html)
    - template compiler and concatenation
- app
    - backbone
    - backbone.marionette
    - backbone.radio
    - lodash
    - jquery

### To run

- `git clone https://github.com/alexcoady/Boilerplate-backbone-browserify.git`
- `cd Boilerplate-backbone-browserify`
- `npm install`
- `gulp [--production]` **or** `gulp watch [--production]`

### App structure

| app  
| -- app.js  
| -- radio.js  
| -- applications  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | -- application.js  
| -- common  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | -- constants.js  
| -- controllers  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | -- appController.js  
| -- mixins  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | -- singleton.js  
| -- routers  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | -- appRouter.js  
| -- views  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | -- appView.js  
| main.js  
