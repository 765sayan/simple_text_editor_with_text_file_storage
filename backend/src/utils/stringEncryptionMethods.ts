import bcrypt from "bcrypt";

export const encryptString = async (str: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(str, salt);
  return hash;
};

export const compareString = async (str: string, hash: string) => {
  const booleanComparisonResult = await bcrypt.compare(str, hash);
  return booleanComparisonResult;
};
