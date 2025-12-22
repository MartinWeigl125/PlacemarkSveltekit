import { placemarkService } from "$lib/services/placemark-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { session } = await parent();
    if (session) {
        const pois = await placemarkService.getPois(session.token);
        // get users with private pois only fetches email + name + count of private pois => no sensitive data
        const users = await placemarkService.getUsersWithPrivatePoiCount(session.token);
        const ratings = await placemarkService.getComments(session.token);
        const categories = await placemarkService.getCategories(session.token);
        return {
            pois,
            users,
            ratings,
            categories
        }
    }
}