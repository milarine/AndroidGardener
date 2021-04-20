export const uid = (length: number = 15): string => {
  let str = '';
  for (let i = 1; i < length + 1; i = i + 8) {
    str += Math.random().toString(36).substr(2, 10);
  }
  return ('_' + str).substr(0, length);
};
