#!/usr/bin/env node

import inquirer from 'inquirer';
import figchalk from 'figchalk'
import { createSpinner } from 'nanospinner';
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
async function askSingle() {
    const answers = await inquirer.prompt({
        name: 'single',
        type: 'bool',
        message: 'single or multifile project?',
        default() {
            return 'n/Y';
        },
    });

    singleProject = answers.single;
}
function render(key)
{
    try {
        var filename = 'templates/' + key + '.json';
        let rawdata= fs.readFileSync(filename);
        let structure = JSON.parse(rawdata)
        var files = structure.files;
        console.log(files);
    } catch (error) {
        console.log("Dead by wrong name👻 " + "Key: " + key + " fn: " + filename)
    }
   
}

function generate() {
    console.log("Name: " + projectName);
    console.log("Typ: " + projectType);
    console.log("Single project: " + singleProject);
    console.log("Bieber: " + bib);
    //gen folder
     var dir = projectName;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

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
            if(singleProject==true){
                render("beamer_single");
            }else{
                render("beamer_multi");
            }
            break;

        default:
            console.log("error on ....switch")
            break;
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
await askSingle();
    /*await question2();
await question3();
await question4();
await question5();*/
generate();