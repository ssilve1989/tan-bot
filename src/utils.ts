const ONE_HOUR = 1000 * 60 * 60;

export function getHours(count: number) {
  return ONE_HOUR * count;
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min); // tslint:disable-line
  max = Math.floor(max); // tslint:disable-line
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}
