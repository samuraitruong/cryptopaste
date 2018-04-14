var fs = require('fs')

function CloneHtmlPlugin(options) {
    // Configure your plugin with options...
  }
  
  CloneHtmlPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin(
        'html-webpack-plugin-after-emit',
        (data, cb) => {
          //data.html += 'The Magic Footer'
          console.log('Cloning index.html to 404.html');
            
          fs.writeFileSync('./build/404.html', data.html)
  
          cb(null, data)
        }
      )
    })
  }
  module.exports = CloneHtmlPlugin