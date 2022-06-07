import { resolve } from 'node:path';
import { access } from 'node:fs/promises';

export const changeDirectory = async (currentPath, newPath) => {
  let resPath = resolve(currentPath, newPath);

  try {
    await access(resPath);
    console.log('Correect Path');
  } catch (err) {
    console.log('Wrong path');
    resPath = currentPath;
  }

  return resPath;
};
