/**
 * Problems:
 *
 * 1. Default implementation of localStorage
 *    doesn't handle types properly
 *
 * 2. In most cases we need to use JSON.stringify
 *    and JSON.parse, typing the same logic is tedious
 *
 *
 *
 * Solution:
 *
 * 1. Modify get/set methods to use JSON.parse/stringify
 *
 * 2. Methods must be type safe
 **/

const createLocalStorage = <T extends Record<string, any>>() => ({
  setItem<K extends keyof T>(key: K, value: T[K]) {
    localStorage.setItem(key as string, JSON.stringify(value));
  },

  getItem<K extends keyof T>(key: K): T[K] | null {
    return JSON.parse("" + localStorage.getItem(key as string));
  },

  removeItem(key: keyof T) {
    localStorage.removeItem(key as string);
  },

  clear() {
    localStorage.clear();
  },

  get length() {
    return localStorage.length;
  },

  key(i: number) {
    return localStorage.key(i);
  },
});

// Usage

interface ILocalStorageMap {
  fruits: string[];
  favouriteNumbers: number[];
}

const LocalStorage = createLocalStorage<ILocalStorageMap>();

const fruits = ["apples", "oranges", "bananas"];

LocalStorage.setItem("fruits", fruits);

// typescript is aware of LocalStorage.getItem("fruits") returning string[]

const fruitsFromStorage = LocalStorage.getItem("fruits");

// type check test, should be errors

LocalStorage.getItem("unknown_key"); // error, key not specified in ILocalStorageMap

LocalStorage.setItem("fruits", [1, 2, 3]); // error, Type 'number' is not assignable to type 'string'
