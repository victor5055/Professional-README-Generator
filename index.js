//Variables to connect modules to application//
const fileGenerator = require("./utils/fileGenerator");
const licenseBadge = require("./utils/licenseBadge").licenseBadge;
const questions = require("./utils/questions").questions;
// Variables containing required packages
const fs = require("fs");
const inquirer = require('inquirer');
const util = require("util");
//Allows for use of async await
const writeFileAsync = util.promisify(fs.writeFile);


// Function call for Readme file //
async function init() {
    try {
      const answers = await inquirer.prompt(questions);
      answers.licenseBadge = licenseBadge(answers.license);
      let readMeData = fileGenerator(answers);
      await writeFileAsync("./ReadMe.md", readMeData);
    } catch (err) {
      throw err;
    }
  }
  
  // function call to initialize program
  init();
  


 
