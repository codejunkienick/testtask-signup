require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Starter Lapis',
    description: '',
    head: {
      titleTemplate: 'Starter Lapis - %s',
      meta: [
        { name: 'description', content: '' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Starter Lapis' },
        { property: 'og:image', content: 'http://katakana.xyz/logo.png' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: 'Starter Lapis' },
        { property: 'og:description', content: '' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@codejunkienick' },
        { property: 'og:creator', content: '@codejunkienick' },
        { property: 'og:image:width', content: '500' },
        { property: 'og:image:height', content: '500' }
      ]
    }
  },

}, environment);
