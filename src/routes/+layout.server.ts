import { placemarkService } from "$lib/services/placemark-service";
import type { Session } from "$lib/types/placemark-types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  const cookieStr = cookies.get("placemark-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    const categories = await placemarkService.getCategories(session.token);
    const pois = await placemarkService.getPois(session.token);
    // get users with private pois only fetches email + name + count of private pois => no sensitive data
    const users = await placemarkService.getUsersWithPrivatePoiCount(session.token);
    const ratings = await placemarkService.getComments(session.token);
    return {
      session: session,
      categories: categories,
      pois: pois,
      users: users,
      ratings: ratings
    };
  }
};