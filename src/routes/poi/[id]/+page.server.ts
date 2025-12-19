import { placemarkService } from "$lib/services/placemark-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, params }) => {
  const { session } = await parent();
  if (session) {
    const poi = await placemarkService.getPoiById(session.token, encodeURI(params.id));
    return {
      poi
    };
  }
};