import type { Comment, DataSet } from "$lib/types/placemark-types";

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
