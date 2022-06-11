import { homedir } from 'os';

import { getUser } from './utils/getUser.js';
import { closeCLI } from './utils/closeCli.js';
import { osModuleHandler } from './utils/osModuleHandler.js';
import { validateUserInput } from './utils/validateUserInput.js';

import { changeDirectory } from './src/changeDirectory.js';
import { listFiles } from './src/listFiles.js';
import { crdFile } from './src/crdFile.js';
import { renameFile } from './src/renameFile.js';
import { copyFile } from './src/copyFile.js';
import { moveFile } from './src/moveFile.js';
import { calculateHash } from './src/calculateHash.js';
import { compressFile } from './src/compressFile.js';

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

    const transformedMsg = msg.replace(/\s+/g, ' ').trim();

    const command = transformedMsg.split(' ')[0];
    try {
      switch (command) {
        case 'up':
          await validateUserInput(transformedMsg, 1);
          const upDir = await changeDirectory(currentDir, '..');
          currentDir = upDir;
          break;
        case 'cd':
          await validateUserInput(transformedMsg, 2);
          const changeDir = await changeDirectory(
            currentDir,
            transformedMsg.split(' ')[1],
          );
          currentDir = changeDir;
          break;
        case 'ls':
          await validateUserInput(transformedMsg, 1);
          await listFiles(currentDir);
          break;
        case 'cat':
          validateUserInput(transformedMsg, 2);
          await crdFile(currentDir, transformedMsg.split(' ')[1], command);
          break;
        case 'add':
          await validateUserInput(transformedMsg, 2);
          await crdFile(currentDir, transformedMsg.split(' ')[1], command);
          break;
        case 'rm':
          await validateUserInput(transformedMsg, 2);
          await crdFile(currentDir, transformedMsg.split(' ')[1], command);
          break;
        case 'rn':
          await validateUserInput(transformedMsg, 3);
          await renameFile(
            transformedMsg.split(' ')[1],
            transformedMsg.split(' ')[2],
          );
          break;
        case 'cp':
          await validateUserInput(transformedMsg, 3);
          await copyFile(
            transformedMsg.split(' ')[1],
            transformedMsg.split(' ')[2],
          );
          break;
        case 'mv':
          await validateUserInput(transformedMsg, 3);
          await moveFile(
            transformedMsg.split(' ')[1],
            transformedMsg.split(' ')[2],
          );
          break;
        case 'os':
          await validateUserInput(transformedMsg, 2);
          osModuleHandler(transformedMsg.split(' ')[1]);
          break;
        case 'hash':
          await validateUserInput(transformedMsg, 2);
          await calculateHash(transformedMsg.split(' ')[1]);
          break;
        case 'compress':
          await validateUserInput(transformedMsg, 3);
          await compressFile(
            transformedMsg.split(' ')[1],
            transformedMsg.split(' ')[2],
            transformedMsg.split(' ')[0],
          );
          break;
        case '.exit':
          closeCLI(userName);
          break;
      }
    } catch (err) {
      console.log(err);
    }

    writable.write(`You are currently in ${currentDir}\n`);
  });
};

startManager();
