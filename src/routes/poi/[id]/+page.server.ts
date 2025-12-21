import { placemarkService } from "$lib/services/placemark-service";
import type { Session, WriteComment } from "$lib/types/placemark-types.js";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, params }) => {
  const { session } = await parent();
  if (session) {
    const poi = await placemarkService.getPoiById(session.token, encodeURI(params.id));
    return {
      poi,
      categories: await placemarkService.getCategories(session.token),
      pois: await placemarkService.getPois(session.token),
      users: await placemarkService.getUsersWithPrivatePoiCount(session.token),
      ratings: await placemarkService.getComments(session.token)
    };
  }
};

export const actions = {
  comment: async ({ request, cookies }) => {
    const cookieStr = cookies.get("placemark-user") as string;
    if (cookieStr) {
      const session = JSON.parse(cookieStr) as Session;
      if (session) {
        const form = await request.formData();
        const poiId = form.get("poiId") as string;
        const comment = form.get("comment") as string;
        const rating = form.get("rating") as unknown as number;
        if (!comment || rating < 1 || rating > 5) {
          return fail(400, {
            message: "Rating from 1 to 5 and comment is required"
          });
        }
        const writeComment: WriteComment = {
          poiid: poiId,
          comment: comment,
          rating: rating,
          userid: session._id
        };
        const newComment = await placemarkService.writeComment(session.token, writeComment);
        return newComment;
      }
    }
  }
}