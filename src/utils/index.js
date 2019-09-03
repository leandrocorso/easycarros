// E-mail validation
export const validEmail = string => {
  const pattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return pattern.test(string);
};

// Vehicle plate validation
export const validPlate = string => {
  const pattern = /^([A-Z]){3}-([0-9]){4}$/;
  return pattern.test(string);
};
