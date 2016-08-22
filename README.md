# Starter Kit - Lapis
---
## TODO
* Add React-router examples with named routes and others
* Write simple TODO List
* Add example with form validation
* Add test examples

## About
This starter originated from erikas [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) but i've changed and added more complex features and replaced others.
Here is the list of essential packages.  I've marked new ones relative to erikas kit with an asterisk.
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* *[Immutable.js]() for enforcing immutable redux store and functional programming
* *[Redux Immutable]() for connecting Immutable.js to Redux
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* *[Redux Saga](https://github.com/yelouafi/redux-saga) for handling async api requests
* *[Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch) for making those requests
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [ESLint](http://eslint.org) to maintain a consistent code style
* [style-loader](https://github.com/webpack/style-loader), *[postcss-loader](https://github.com/postcss/postcss-loader) to use postcss with cssnext and various plugins
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information on both server and client
* *[react-css-modules]() for better integration with css-modules
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server
* *[webpack-dashboard]() for NASA style debugging

### API dependency
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
