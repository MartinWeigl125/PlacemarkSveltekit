import axios from "axios";
import type { PageServerLoad } from "./$types";
import type { Session } from "$lib/types/placemark-types";
import { dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { placemarkService } from "$lib/services/placemark-service";
import { refreshPlacemarkState } from "$lib/services/placemark-utils";

export const load: PageServerLoad = async ({ url, cookies }) => {
  const token = url.searchParams.get("token");
  const firstName = url.searchParams.get("firstName");
  const lastName = url.searchParams.get("lastName");
  const id = url.searchParams.get("_id");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const session: Session = {
    firstName: firstName!,
    lastName: lastName!,
    token: token!,
    _id: id!
  };
  const userJson = JSON.stringify(session);
  cookies.set("placemark-user", userJson, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: !dev,
    maxAge: 60 * 60 * 24 * 7 // one week
  });
  const categories = await placemarkService.getCategories(session.token);
  const pois = await placemarkService.getPois(session.token);
  // get users with private pois only fetches email + name + count of private pois => no sensitive data
  const users = await placemarkService.getUsersWithPrivatePoiCount(session.token);
  const ratings = await placemarkService.getComments(session.token);
  refreshPlacemarkState(categories, pois, users, ratings);
  throw redirect(303, "/dashboard");
}
