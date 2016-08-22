# Starter Kit - Lapis
---

#DONE
* API server with express, passport, mongo, socket.io, socket auth, oAuth
* Change current API handling in redux [redux-saga](https://github.com/yelouafi/redux-saga)
* Cool as fuck NASA style webpack-dashboard 
* Postcss

##TODO
* Add React-router examples with named routes and others
* Write simple TODO List
* Add example with form validation
* Add test examples for Karma and PhantomJS
* Resolve dependency issues
* Add API calls from client
* Merge api config and src config using configstore or ???
* Add google analytics to serverside rendering?
* Write tests for frontend, backend, sagas, redux, mongoose
* Update webpack-dashboard when it fixes [61](https://github.com/FormidableLabs/webpack-dashboard/issues/61)
* Fix asset not found global.css when global.css only required in html.js
* Rewrite webpack config in ES6 

## About
this is my starter kit

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [Redux Saga]()
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [ESLint](http://eslint.org) to maintain a consistent code style
* [style-loader](https://github.com/webpack/style-loader), [postcss-loader](https://github.com/postcss/postcss-loader) to use postcss with cssnext and various plugins
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information on both server and client
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server

API dependency
* [Mongoose]()
* [Passport]()
* [Passport JWT]()
* [Socket.io]()


## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```
or with dashboard
```bash
npm run dev-dash
```

## Building and Running Production Server

```bash
npm run build
npm run start
```
