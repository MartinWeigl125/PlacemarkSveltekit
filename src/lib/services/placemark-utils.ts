import type { Category, Comment, DataSet, MarkerLayer, MarkerSpec, Poi } from "$lib/types/placemark-types";

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
