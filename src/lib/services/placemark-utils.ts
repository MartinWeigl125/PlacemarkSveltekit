import type { Category, Comment, DataSet, MarkerLayer, MarkerSpec, Poi, ScatterDataSet, UserPoi } from "$lib/types/placemark-types";
import { currentCategories, currentComments, currentDataSets, currentPois, currentUsers, loggedInUser } from "$lib/types/runes.svelte";


export function clearPlacemarkState() {
  loggedInUser.email = "";
  loggedInUser.firstName = "";
  loggedInUser.lastName = "";
  loggedInUser.token = "";
  loggedInUser._id = "";

  currentCategories.categories = [];
  currentPois.pois = [];
  currentUsers.users = [];
  currentComments.comments = [];
  currentDataSets.poisPerCategory = {} as DataSet;
  currentDataSets.usersWithMostPrivatePois = {} as DataSet;
  currentDataSets.bestCategories = {} as DataSet;
  currentDataSets.bestPois = {} as ScatterDataSet;
}

export function refreshPlacemarkState(categories: Category[], pois: Poi[], users: UserPoi[], ratings: Comment[]) {
  currentCategories.categories = categories || [];
  currentPois.pois = pois || [];
  currentUsers.users = users || [];
  currentComments.comments = ratings || [];

  if ((categories || []).length > 0) {
    generatePoisPerCategory(categories || []);
  }
  if ((users || []).length > 0) {
    generatePrivatePoisPerUser(users || []);
  }
  if ((ratings || []).length > 0) {
    generateAvgRatingPerCategory(ratings || []);
    if ((pois || []).length > 0) {
      generateRatingCountAndAvgForPois(pois || [], ratings || []);
    }
  }
}

// chart helper functions
export function generatePerRating(commentList: Comment[]): DataSet {
  const totalByRating: DataSet = {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        values: [0, 0, 0, 0, 0]
      }
    ]
  };

  commentList.forEach((comment) => {
    totalByRating.datasets[0].values[comment.rating - 1] += 1;
  });

  return totalByRating;
}

export function generatePoisPerCategory(categories: Category[]) {
  const cats = categories || [];
  const allCategories = cats.filter(cat => cat.name.toLowerCase() !== "private points of interest");
  const names = allCategories.map(cat => cat.name);
  const values = new Array<number>(names.length).fill(0);
  allCategories.forEach((cat, i) => {
    values[i] = cat.pois.length;
  });

  // order by values descending
  const combined = names.map((label, i) => ({ label, value: values[i] }));
  combined.sort((a, b) => b.value - a.value);

  const poisPerCategory: DataSet = {
    labels: combined.map(e => e.label),
    datasets: [
      { values: combined.map(e => e.value) }
    ]
  };

  currentDataSets.poisPerCategory = poisPerCategory;
}

export function generatePrivatePoisPerUser(users: UserPoi[]) {
  const names = users.map(u => `${u.firstName} ${u.lastName}`);
  const pois = new Array<number>(names.length).fill(0);
  users.forEach((user, i) => {
    pois[i] = user.poiCount
  });

  const privatePoisPerUser: DataSet = {
    labels: names,
    datasets: [
      { values: pois }
    ]
  };

  currentDataSets.usersWithMostPrivatePois = privatePoisPerUser;
}

export function generateAvgRatingPerCategory(ratings: Comment[]) {
  const allCategories = (currentCategories.categories || []).filter(cat => cat.name.toLowerCase() !== "private points of interest");
  const names = allCategories.map(cat => cat.name);
  const values = new Array<number>(names.length).fill(0); 
  allCategories.forEach((cat, i) => {
    const commentsForCategory = ratings.filter(r => cat.pois.map(p => p._id).includes(r.poiid));
    if (commentsForCategory.length > 0) {
      const avg = commentsForCategory.reduce((sum, r) => sum + r.rating, 0) / commentsForCategory.length;
      values[i] = avg;
    } else {
      values[i] = 0;
    }
  });

  // order by values descending
  const combined = names.map((label, i) => ({ label, value: values[i] }));
  combined.sort((a, b) => b.value - a.value);

  const avgRatingPerCategory: DataSet = {
    labels: combined.map(e => e.label),
    datasets: [
      { values: combined.map(e => e.value) }
    ]
  };

  currentDataSets.bestCategories = avgRatingPerCategory;
}

export function generateRatingCountAndAvgForPois(pois: Poi[], ratings: Comment[]) {
  const ps = pois || [];
  const values = ps.filter(p => p.userid == null).map(poi => {
    const commentsForPoi = ratings.filter(r => r.poiid === poi._id);
    const count = commentsForPoi.length;
    let avg = 0;
    if (count > 0) {
      avg = commentsForPoi.reduce((sum, r) => sum + r.rating, 0) / count;
    }

    return { x: count, y: avg, label: poi.name };
  });

  const ratingCountAndAvgForPois: ScatterDataSet = {
    datasets: [
      { values }
    ]
  };

  currentDataSets.bestPois = ratingCountAndAvgForPois;
}


// map helper functions
export function generateMarkerSpec(poi: Poi): MarkerSpec {
  return <MarkerSpec>{
    id: poi._id,
    title: poi.name,
    location: {
      lat: poi.latitude,
      lng: poi.longitude
    }
  };
}

export function generateMarkerSpecs(pois: Array<Poi>): MarkerSpec[] {
  const markerSpecs = Array<MarkerSpec>();
  pois.forEach((poi) => {
    markerSpecs.push(poi.markerSpec);
  });
  return markerSpecs;
}

export function generateMarkerLayer(category: Category): MarkerLayer {
  return {
    title: category.name,
    markerSpecs: generateMarkerSpecs(category.pois)
  };
}
