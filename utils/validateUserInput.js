export const validateUserInput = (msg, numberOfArguments, newFileName = '') => {
  if (msg.split(' ').length !== numberOfArguments) {
    throw 'Invalid Input';
  }
};
