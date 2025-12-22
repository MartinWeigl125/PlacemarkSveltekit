import type { Category, Comment, DataSet, MarkerSpec, Poi, ScatterDataSet, UserPoi } from "./placemark-types";

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

export const sharedMarker = rune<MarkerSpec | null>(null);
export const sharedPoi = rune<Poi | null>(null);

export const loggedInUser = $state({
  email: "",
  firstName: "",
  lastName: "",
  token: "",
  _id: ""
});

export const currentCategories = $state({ categories: [] as Category[] });
  
export const currentComments = $state({ comments: [] as Comment[] });

export const currentPois = $state({ pois: [] as Poi[] });

export const currentUsers = $state({ users: [] as UserPoi[] });

export const currentDataSets = $state({
  poisPerCategory: {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  } as DataSet,
  usersWithMostPrivatePois: {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  } as DataSet,
  bestCategories: {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  } as DataSet,
  bestPois: {
    datasets: [
      {
        values: []
      }
    ]
  } as ScatterDataSet
});