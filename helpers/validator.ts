export const isValid = (game: any, reqFields: string[]) => {
  let valid = true;
  reqFields.forEach((field) => {
    valid = valid && field in game;
  });
  return valid;
};
