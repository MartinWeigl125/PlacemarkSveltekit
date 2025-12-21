import { placemarkService } from "$lib/services/placemark-service";
import type { PoiDTO, Session } from "$lib/types/placemark-types";
import { json } from "@sveltejs/kit";

export const POST = async ({ request, cookies }) => {
    const cookieStr = cookies.get("placemark-user") as string;
    if (cookieStr) {
        const session = JSON.parse(cookieStr) as Session;
        if (session) {
            const body = await request.json();
            const poi: PoiDTO = {
                name: body.name,
                description: body.description,
                latitude: Number(body.latitude),
                longitude: Number(body.longitude),
                categoryid: body.categoryId,
                userid: session._id
            };
            const newPoi = await placemarkService.createPoi(session.token, poi);
            return json(newPoi, { status: 201 });
        }
    }
}