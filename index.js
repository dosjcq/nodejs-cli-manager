import { homedir } from 'os';

import { getUser } from './utils/getUser.js';
import { closeCLI } from './utils/closeCli.js';
import { osModuleHandler } from './utils/osModuleHandler.js';

import { changeDirectory } from './src/changeDirectory.js';
import { listFiles } from './src/listFiles.js';
import { crdFile } from './src/crdFile.js';
import { renameFile } from './src/renameFile.js';
import { copyFile } from './src/copyFile.js';
import { moveFile } from './src/moveFile.js';

const startManager = async () => {
  const readble = process.stdin;
  const writable = process.stdout;
  const userName = getUser();
  let currentDir = homedir();

  writable.write(
    `Welcome to the File Manager, ${userName}\nYou are currently in ${currentDir}\n`,
  );

  process.on('SIGINT', () => {
    closeCLI(userName);
  });

  readble.on('data', async (data) => {
    const msg = data.toString().trim();

    switch (msg.split(' ')[0]) {
      case 'up':
        const upDir = await changeDirectory(currentDir, '..');
        currentDir = upDir;
        break;
      case 'cd':
        const changeDir = await changeDirectory(currentDir, msg.split(' ')[1]);
        currentDir = changeDir;
        break;
      case 'ls':
        await listFiles(currentDir);
        break;
      case 'cat':
        await crdFile(currentDir, msg.split(' ')[1], msg.split(' ')[0]);
        break;
      case 'add':
        await crdFile(currentDir, msg.split(' ')[1], msg.split(' ')[0]);
        break;
      case 'rm':
        await crdFile(currentDir, msg.split(' ')[1], msg.split(' ')[0]);
        break;
      case 'rn':
        await renameFile(msg.split(' ')[1], msg.split(' ')[2]);
        break;
      case 'cp':
        await copyFile(msg.split(' ')[1], msg.split(' ')[2]);
        break;
      case 'mv':
        await moveFile(msg.split(' ')[1], msg.split(' ')[2]);
        break;
      case 'os':
        osModuleHandler(msg.split(' ')[1]);
        break;
      case '.exit':
        closeCLI(userName);
        break;
    }
    writable.write(`You are currently in ${currentDir}\n`);
  });
};

startManager();
