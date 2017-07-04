import path from 'path'
// import spawn from 'cross-spawn'

const generator = {
  description: 'Generator for feature plugin',
  prompts: [
    {
      type: 'input',
      name: 'route',
      message: 'Enter plugin router path:',
      default: '/path',
    },
  ],
  actions: () => ([
    {
      type: 'add',
      path: './package.json',
      templateFile: './package.json.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './src/index.js',
      templateFile: './index.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: './src/register.js',
      templateFile: './register.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'modify',
      path: '../rispa-routes/index.js',
      pattern: /(\/\/ ~~ ADD HERE ~~ Do not remove)/gi,
      template: 'require(\'{{featureName}}\').default,\n    // ~~ ADD HERE ~~ Do not remove',
    },
    {
      type: 'modify',
      path: '../rispa-routes/package.json',
      pattern: /("dependencies"\:\s\{)/gi,
      template: '"dependencies": {\n    "{{featureName}}": "0.1.0",',
    },
    {
      type: 'bootstrap',
    },
  ].map(item => {
    if (item.templateFile) {
      item.templateFile = path.resolve(__dirname, item.templateFile)
    }
    return item
  })),
}

export default generator
