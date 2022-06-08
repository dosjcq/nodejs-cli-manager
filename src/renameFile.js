import { rename } from 'node:fs/promises';
import { dirname } from 'node:path';

export const renameFile = async (pathToFile, newFileName) => {
  try {
    const fileDir = dirname(pathToFile);
    await rename(pathToFile, `${fileDir}/${newFileName}`);
  } catch (err) {
    console.log(err);
  }
};
