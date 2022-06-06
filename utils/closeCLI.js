export const closeCLI = (userName) => {
  const writable = process.stdout;
  writable.write(`Thank you for using File Manager, ${userName}!\n`);
  process.exit();
};
