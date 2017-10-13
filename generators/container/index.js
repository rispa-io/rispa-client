import fs from 'fs'
import path from 'path'

const generator = {
  description: 'Generator for client container',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'How should it be called?',
      default: 'Container',
      validate: value => {
        if ((/.+/).test(value)) {
          if (fs.existsSync(path.resolve(process.cwd(), `./src/containers/${value}`))) {
            return 'A container with this name already exists'
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
      path: './src/containers/{{properCase name}}/index.js',
      templateFile: './index.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './src/containers/{{properCase name}}/{{properCase name}}.js',
      templateFile: './js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './src/containers/{{properCase name}}/{{properCase name}}.test.js',
      templateFile: './test.js.hbs',
      abortOnFail: true,
    },
  ].map(item => {
    item.templateFile = path.resolve(__dirname, item.templateFile)
    return item
  })),
}

export default generator
