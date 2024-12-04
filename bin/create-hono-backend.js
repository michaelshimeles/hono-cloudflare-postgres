#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2] || 'hono-backend';

// Create project directory
const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);

// Check if directory already exists
if (fs.existsSync(projectDir)) {
    console.error(`Directory ${projectName} already exists. Please choose a different name or delete the existing directory.`);
    process.exit(1);
}

// Create project directory
fs.mkdirSync(projectDir);

// Clone the repository
try {
    console.log('Creating your Hono backend project...');
    execSync(`git clone --depth 1 https://github.com/michaelshimeles/hono-starter-kit ${projectDir}`);

    // Remove .git folder
    fs.rmSync(path.join(projectDir, '.git'), { recursive: true, force: true });

    // Initialize new git repository
    execSync('git init', { cwd: projectDir });

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install', { cwd: projectDir });

    console.log(`
✨ Project created successfully!

To get started:
  cd ${projectName}
  npm run dev

Happy coding! 🚀
    `);
} catch (error) {
    console.error('Error occurred:', error);
    fs.rmSync(projectDir, { recursive: true, force: true });
    process.exit(1);
}
