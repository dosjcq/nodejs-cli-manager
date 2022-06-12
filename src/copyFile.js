import { copyFile as copyFileFunc } from 'node:fs/promises';

export const copyFile = async (pathToFile, pathToNewDirectory) => {
  try {
    await copyFileFunc(pathToFile, pathToNewDirectory);
  } catch (err) {
    throw 'Operation failed';
  }
};
