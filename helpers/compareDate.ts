export const compareDate = (prev: Date | string) => {
  const time = new Date().getTime() - new Date(prev).getTime();
  console.log("Time Difference:", time);
  return time >= 1500;
};
