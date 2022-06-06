import { normalize } from 'node:path';

export const changeDirectory = (currentPath, newPath) => {
  const updatedPath = normalize(`${currentPath}/${newPath}`);
  return updatedPath;
};
