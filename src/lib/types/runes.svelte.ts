import type { Category, DataSet, ScatterDataSet } from "./placemark-types";

export const rune = <T>(initialValue: T) => {
  let _rune = $state(initialValue);
  return {
    get value() {
      return _rune;
    },
    set value(v: T) {
      _rune = v;
    }
  };
};

export const loggedInUser = $state({
  email: "",
  firstName: "",
  lastName: "",
  token: "",
  _id: ""
});

export const currentCategories = $state({ categories: [] as Category[] });  

export const currentDataSets = $state({
  poisPerCategory: {} as DataSet,
  usersWithMostPrivatePois: {} as DataSet,
  bestCategories: {} as DataSet,
  bestPois: {} as ScatterDataSet
});