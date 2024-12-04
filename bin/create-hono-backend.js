#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if project name is provided
if (process.argv.length < 3) {
    console.error('Please specify the project name:');
    console.error('  npx create-hono-backend my-project');
    process.exit(1);
}

const projectName = process.argv[2];
const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);

// Validate project name
if (projectName.match(/[<>:"/\\|?*\x00-\x1F]/)) {
    console.error('Project name contains invalid characters');
    process.exit(1);
}

// Check if directory already exists
if (fs.existsSync(projectDir)) {
    console.error(`Error: Directory ${projectName} already exists. Please choose a different name or delete the existing directory.`);
    process.exit(1);
}

// Create project directory
try {
    fs.mkdirSync(projectDir);
} catch (err) {
    console.error(`Error creating directory ${projectName}:`, err);
    process.exit(1);
}

// Function to execute commands with error handling
function executeCommand(command, cwd) {
    try {
        execSync(command, { cwd, stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`Failed to execute command: ${command}`);
        return false;
    }
}

// Main installation process
console.log(`\n📦 Creating new Hono backend project in ${projectName}...\n`);

try {
    // Clone the repository
    console.log('🚀 Initializing project...');
    if (!executeCommand(`git clone --depth 1 https://github.com/michaelshimeles/hono-starter-kit ${projectDir}`, currentDir)) {
        throw new Error('Failed to clone repository');
    }

    // Remove .git folder
    const gitFolder = path.join(projectDir, '.git');
    if (fs.existsSync(gitFolder)) {
        fs.rmSync(gitFolder, { recursive: true, force: true });
    }

    // Initialize new git repository
    console.log('🔧 Setting up Git repository...');
    if (!executeCommand('git init', projectDir)) {
        throw new Error('Failed to initialize git repository');
    }

    // Install dependencies
    console.log('📚 Installing dependencies...');
    if (!executeCommand('npm install', projectDir)) {
        throw new Error('Failed to install dependencies');
    }

    console.log(`
✨ Project created successfully!

To get started:
  cd ${projectName}
  npm run dev

Happy coding! 🚀
    `);
} catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nCleaning up...');
    if (fs.existsSync(projectDir)) {
        fs.rmSync(projectDir, { recursive: true, force: true });
    }
    process.exit(1);
}
