#!/usr/bin/env node

import inquirer from 'inquirer';
import figchalk from 'figchalk'
import fs from 'fs'





let projectName;
let projectType;
let bib;
let singleProject;

const sleep = (ms = 200) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    console.log(figchalk.mix("texify", "yellowBright"));

}



async function askName() {
    const answers = await inquirer.prompt({
        name: 'project_name',
        type: 'input',
        message: 'Projectname?',
        default() {
            return 'project';
        },
    });
    projectName = answers.project_name;
}
async function askBib() {
    const answers = await inquirer.prompt({
        name: 'bibl',
        type: 'bool',
        message: 'bib?',
        default() {
            return 'N/y';
        },
    });

    bib = answers.bibl;
}

async function askSingleFile() {
    const answers = await inquirer.prompt({
        name: 'sProj',
        type: 'list',
        message: 'Single Latex file?\n',
        choices: [
            'yes',
            'no'

        ],
    });

    singleProject = answers.sProj;
}



function render(key) {
    try {
        var filename = 'templates/' + key + '.json';
        let rawdata = fs.readFileSync(filename);
        let structure = JSON.parse(rawdata)
        var files = structure.files;
        console.log(files);
    } catch (error) {
        console.log("Dead by wrong name👻 " + "Key: " + key + " fn: " + filename)
    }

}

function createAndChangeDirectory(projectName) {
    try {
        fs.mkdirSync(projectName);
        process.chdir(projectName);
        //console.log(`Created and changed directory to ${directoryName}`);
    } catch (error) {
        console.error(`Error creating or changing directory ☠️: ${error}`);
    }
}


function createProject() {
    /* console.log("Name: " + projectName);
     console.log("Typ: " + projectType);
     console.log("Single project: " + singleProject);
     console.log("Bieber: " + bib);*/

    //create dir and cd into
    createAndChangeDirectory(projectName);
    /* 
    switch (projectType) {
        case "letter":
            break;
        case "article":
            break;
        case "report":
            break;
        case "book":
            break;
        case "beamer":

            break;

        default:
            console.log("error on ....switch")
            break;
    }*/


    // write tex file
    const texFile = `
    \\documentclass{article}
    \\begin{document}
    Hello, world!
    \\end{document}
  `;
    fs.writeFileSync(`${projectName}.tex`, texFile);

    
    //create folder structure
    try {
        fs.mkdirSync("Images");
    } catch (error) {
        console.error(`Error creating or directory ☠️: ${error}`);
    }
    //write build script
    const buildScript = `
    pdflatex ${projectName}.tex\n
    bibtex ${projectName}.aux\n
    pdflatex ${projectName}.tex\n
    pdflatex ${projectName}.tex\n
    `;

    fs.writeFileSync(`${projectName}-build.sh`, buildScript);

    //if splitted?
    if (singleProject == "no" && projectType == "book") {
        try {
            fs.mkdirSync(projectName);
            process.chdir(projectName);
            //console.log(`Created and changed directory to ${directoryName}`);
        } catch (error) {
            console.error(`Error creating or changing directory ☠️: ${error}`);
        }
    }

}

async function askType() {
    const answers = await inquirer.prompt({
        name: 'askType',
        type: 'list',
        message: 'Select type\n',
        choices: [
            'letter',
            'article',
            'report',
            'book',
            'beamer'

        ],
    });

    projectType = answers.askType;
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await askType();
await askBib();
await askSingleFile();

createProject();