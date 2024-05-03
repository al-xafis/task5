import { Faker, en } from "@faker-js/faker";

// let errFaker = new Faker({ locale: [en] });
// errFaker.seed(0);

// export default errFaker;

export let alphabet = "abcdefghijklmnopqrstuvwxyz";

export const times = (n, fn, errFaker) => {
  if (n < 0) throw new Error("The first argument cannot be negative.");
  return (arg) => {
    for (let i = Math.floor(n); i--; ) arg = fn(arg);
    return Math.random() < n % 1 ? fn(arg) : arg;
  };
};

export function swapNearChar(str, errFaker) {
  if (str.length === 0) {
    return str;
  }

  const randomIndex = Math.floor(
    errFaker.number.int({ min: 0, max: str.length - 1 })
  );

  let offset;
  if (randomIndex == 0) {
    offset = 1;
  } else if (randomIndex == str.length) {
    offset = -1;
  } else {
    offset = -1;
  }
  const nearbyIndex = randomIndex + offset;
  const chars = str.split("");
  [chars[randomIndex], chars[nearbyIndex]] = [
    chars[nearbyIndex],
    chars[randomIndex],
  ];
  return chars.join("");
}

export function removeRandomChar(str, errFaker) {
  if (str.length === 0) {
    return str;
  }

  const randomIndex = Math.floor(
    errFaker.number.int({ min: 0, max: str.length - 1 })
  );

  const deletedStr = str.slice(0, randomIndex) + str.slice(randomIndex + 1);
  return deletedStr;
}

export function addRandomChar(str, errFaker) {
  if (str.length === 0) {
    return str;
  }

  const randomint = Math.floor(
    errFaker.number.int({ min: 0, max: alphabet.length - 1 })
  );
  const randomChar = alphabet.charAt(randomint);

  const randomIndex = Math.floor(
    errFaker.number.int({ min: 0, max: str.length - 1 })
  );

  const modifiedStr =
    str.slice(0, randomIndex) + randomChar + str.slice(randomIndex);

  return modifiedStr;
}
