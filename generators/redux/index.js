const path = require('path')

const generator = {
  description: 'Generator for redux folder sctructure',
  prompts: [],
  actions: () => ([
    {
      type: 'add',
      path: './src/redux/modules/reducer.js',
      templateFile: './reducer.js.hbs',
      abortOnFail: true,
    },
  ].map(item => {
    item.templateFile = path.resolve(__dirname, item.templateFile)
    return item
  })),
}

module.exports = generator
