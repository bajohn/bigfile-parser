export const splitOnLineBreak = (str: string) =>
  str.indexOf("\r") > -1 ? str.split("\r\n") : str.split("\n");
