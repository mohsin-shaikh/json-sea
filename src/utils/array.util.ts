export type Entities<T> = {
  [id: string]: T;
};

export const arrayToEntities = <T>(array: T[], id: string): Entities<T> => {
  return array.reduce((acc: Entities<T>, item: T) => {
    return (item as any)[id] === undefined
      ? acc
      : {
          ...acc,
          [(item as any)[id]]: item,
        };
  }, {});
};