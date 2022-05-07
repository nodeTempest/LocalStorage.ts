/**
 * Problems:
 *
 * 1. Default implementation of localStorage
 *    doesn't handle types properly
 *
 * 2. In most cases we need to use JSON.stringify
 *    and JSON.parse, typing the same logic is tedious
 *
 * 3. Default implementation of local storage doesn't
 *    bind key value to get/set methods
 *
 *
 *
 * Solution:
 *
 * 1. Create singleton LocalStorage class which stores instances
 *    in hash map
 *
 * 2. Instances must be type safe
 *
 * 3. Key value must be bound to instance methods
 **/

class LocalStorage<T> {
  private static storageInstancesMap: Record<string, LocalStorage<any>> = {};

  constructor(private key: string) {}

  public static createStorage<T>(key: string) {
    let storeInstance = LocalStorage.storageInstancesMap[key];

    if (!storeInstance) {
      storeInstance = new LocalStorage(key);
      LocalStorage.storageInstancesMap[key] = storeInstance;
    }

    return storeInstance as LocalStorage<T>;
  }

  public setItem(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public getItem(): T | null {
    return JSON.parse("" + localStorage.getItem(this.key));
  }

  public removeItem() {
    localStorage.removeItem(this.key);
  }

  public static clear() {
    localStorage.clear();
  }

  public static getLength() {
    return localStorage.length;
  }

  public static key(i: number) {
    return localStorage.key(i);
  }
}

// ~/src/constants/localStorage

const FRUITS = "fruits";

// Usage

type fruitsType = string[];

const fruits = ["apples", "oranges", "pineapples"];

const fruitsStorage = LocalStorage.createStorage<fruitsType>(FRUITS);

fruitsStorage.setItem(fruits);

const fruitsFromStorage = fruitsStorage.getItem(); // ["apples", "oranges", "pineapples"]

LocalStorage.getLength(); // 1

LocalStorage.clear();

LocalStorage.getLength(); // 0

// type check test, should be error

const falsyTypedFruits = [1, "apples", true];

fruitsStorage.setItem(falsyTypedFruits); // type error
