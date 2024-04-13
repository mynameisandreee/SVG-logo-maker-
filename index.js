const questions = require("inquirer");
const fs = require("fs");
//importing the classes
const { Triangle, Square, Circle } = require("./lib/shape");

function writeFile(fileName, answers) {
  //empty string to store the file content
  let fileContent = "";
  // logo container diameter
  fileContent = `<svg version ="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
  fileContent += "<g>";
  fileContent += `${answers.shape}`;
  // if satements to check the shape and color
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    fileContent += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}" />`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    fileContent += `<rect x="73" y="40" width="170" height="170" fill="${answers.shapeColor}" />`;
  } else if (answers.shape === "Circle") {
    shapeChoice = new Circle();
    fileContent += `<circle cx="150" cy="120" r="80" fill="${answers.shapeColor}" />`;
  }
  // the following code will add the text to the logo taken from the user input
  fileContent += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.chars}</text>`;
  //closing the svg tag
  fileContent += "</g>";
  //closing svg tag
  fileContent += "</svg>";

  fs.writeFile(fileName, fileContent, (err) => {
    if (err) throw err;
    console.log("Generated logo.svg");
  });
}

function promptUser() {
  questions
    .prompt([
      {
        type: "input",
        message: "Enter up to three characters",
        name: "chars",
      },
      {
        type: "input",
        message: "Enter a color for your text (keyword or hexadecimal number)?",
        name: "textColor",
      },
      {
        type: "list",
        message: "Select a shape?",
        choices: ["Circle", "Triangle", "Square"],
        name: "shape",
      },
      {
        type: "input",
        message: "Shape background color (keyword or hexadecimal number)?",
        name: "shapeColor",
      },
    ])
   .then((answers) => {
      //error handler if user put more than 3 characters
      if (answers.chars.length > 3) {
        console.log("Only three characters are allowed or less");
        promptUser();
        return;
      } else {
        writeFile("logo.svg", answers);
      }
    });
}
//calling the prompt user function
promptUser();