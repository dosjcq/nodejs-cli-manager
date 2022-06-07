import { homedir } from 'os';
import { getUser } from './utils/getUser.js';
import { closeCLI } from './utils/closeCli.js';

import { changeDirectory } from './src/changeDirectory.js';
import { listFiles } from './src/listFiles.js';

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
      case '.exit':
        closeCLI(userName);
        break;
    }
    writable.write(`You are currently in ${currentDir}\n`);
  });
};

startManager();
