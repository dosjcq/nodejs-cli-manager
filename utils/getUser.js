export const getUser = () => {
  const userArgs = process.argv.slice(2);
  const user = userArgs.find((item) => item.startsWith('--username'));

  if (user) {
    return user.split('=')[1];
  } else {
    throw new Error('You should introduce yourself');
  }
};
