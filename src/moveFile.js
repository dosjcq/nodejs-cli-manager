import { rename } from 'node:fs/promises';
import { basename } from 'node:path';

export const moveFile = async (pathToFile, pathToFolder) => {
  try {
    const fileName = basename(pathToFile);
    await rename(pathToFile, `${pathToFolder}/${fileName}`);
  } catch (err) {
    console.log('Operation failed');
  }
};
