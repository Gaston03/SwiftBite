const toSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const toCamelCase = (str: string) =>
  str.replace(/(_\w)/g, (m) => m[1].toUpperCase());

export const keysToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToSnakeCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [toSnakeCase(key)]: keysToSnakeCase(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

export const keysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [toCamelCase(key)]: keysToCamelCase(obj[key]),
      }),
      {}
    );
  }
  return obj;
};
