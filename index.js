const questions = require('inquirer');

questions
  .prompt([
    {
      type: 'input',
      message: 'Enter up to three characters',
      name: 'chars',
    },
    {
      type: 'input',
      message: 'Enter a color (keyword or hexadecimal number)?',
      name: 'color',
    },
    {
      type: 'list',
      message: 'Select a shape?',
      name: 'shape',
      choices: [
        'circle',
        'triangle',
        'square'
      ]
    },
    {
        type: 'input',
        message: 'Shape color keyword or hexadecimal number)?',
        name: 'shapeColor',
      },
  ]).then(answers => {
    var file = JSON.stringify(answers, null, '  ')
    const fs = require('fs');
    //TODO: create file named logo.svg and then print 'Generated logo.svg'
    fs.writeFile('logo.svg', file, (err) => {
        if (err) throw err;
        console.log('Generated logo.svg');
    }
  );
});