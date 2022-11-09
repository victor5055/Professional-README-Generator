//Variables to connect modules to application//

const fileGenerator = require("./fileGenerator");
const fs = require("fs");
const inquirer = require('inquirer');

// Array of questions for user //
const questions = [
    {
        type: "input",
        mesage: "What is the title of your project?",
        name: "title",
    },{
        type:"input",
        message:"What is your Github user name?",
        name: "userName"
    },{
        type:"input",
        message:"Give your Github profile link?",
        name: "GitHub"
    },{   
        type: "input",
        message: "What is your email?",
        name: "email"
    },{
        type: "input",
        message: "Please state any test(s)",
        name: "test"

    },{
        type:"input",
        message:"Provide a breif description of the project?",
        name: "description"

    },{
        type:"input",
        message:"How do you install this project?",
        name: "installation"
    },{
        type:"input",
        message:"What is the Deployment link?",
        name: "deploymentLink"
    },{
        type:"input",
        message:"List your collaborators and any attributions that need to be made?",
        name: "contribute"
    },{
        type: "input",
        message: "What is your accomplishments?",
        name: "accomplish"
    
    },{
        type:"list",
        message:"How do you want to license this project?",
        name: "license",
        choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Mozilla",
            "MIT",
            "Apache",
            "Boost",
        ],
    },{
        type: "input",
        message: "Provide a screenshot (Readme).",
        name: "ReadMe"
    },{
        type: "input",
        message: "Please provide a screenshot (scriptjs).",
        name: "scriptjs"
    },{
        type: "input",
        message: "Please provide a screenshot (fileGenerator).",
        name: "fileGenerator"
    },{
        type: "input",
        message: "What is your end-goal.",
        name: "endgoal"
    
    }];
// Function call for Readme file //
inquirer.prompt(questions).then(function(response) {
    console.log(response);
    
     const content = fileGenerator(response);
     console.log(content);
      fs.writeFile("./ReadMe.md", content, function(err){
          if (err) throw err
          console.log("success");
      });
 } ); 