import { copyFile as copyFileFunc } from 'node:fs/promises';
import { constants } from 'node:fs';

export const copyFile = async (pathToFile, pathToNewDirectory) => {
  try {
    await copyFileFunc(pathToFile, pathToNewDirectory);
    console.log('source.txt was copied to destination.txt');
  } catch (err) {
    console.log(err);
  }
};
