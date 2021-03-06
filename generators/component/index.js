const fs = require('fs')
const path = require('path')

const generator = {
  description: 'Generator for client component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'How should it be called?',
      default: 'Component',
      validate: value => {
        if ((/.+/).test(value)) {
          if (fs.existsSync(path.resolve(process.cwd(), `./src/components/${value}`))) {
            return 'A component with this name already exists'
          }

          return true
        }

        return 'The name is required'
      },
    },
  ],
  actions: () => ([
    {
      type: 'add',
      path: './src/components/{{properCase name}}/index.js',
      templateFile: './index.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './src/components/{{properCase name}}/{{properCase name}}.js',
      templateFile: './js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './src/components/{{properCase name}}/{{properCase name}}.sss',
      templateFile: './sss.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './src/components/{{properCase name}}/{{properCase name}}.test.js',
      templateFile: './test.js.hbs',
      abortOnFail: true,
    },
  ].map(item => {
    item.templateFile = path.resolve(__dirname, item.templateFile)
    return item
  })),
}

module.exports = generator
