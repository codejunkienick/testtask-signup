export default function postcss(webpack) {
  return function() {
    return {
      plugins: [
        require("postcss-import")({ 
          addDependencyTo: webpack,
            path: ['src/theme'],
        }),
        require("postcss-cssnext")(),
        require("postcss-nested")(),
        // add your "plugins" here
        // and if you want to compress,
        // just use css-loader option that already use cssnano under the hood
        require("postcss-browser-reporter")(),
        require("postcss-reporter")(),
      ],
    };
  }
}
