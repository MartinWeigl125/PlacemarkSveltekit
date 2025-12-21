import { placemarkService } from "$lib/services/placemark-service";
import type { PoiDTO, Session } from "$lib/types/placemark-types";
import { json } from "@sveltejs/kit";

export const PUT = async ({ params, request, cookies }) => {
    const cookieStr = cookies.get("placemark-user") as string;
    if (cookieStr) {
        const session = JSON.parse(cookieStr) as Session;
        if (session) {
            const body = await request.json();
            const poi: PoiDTO = {
                _id: params.id,
                name: body.name,
                description: body.description,
                latitude: Number(body.latitude),
                longitude: Number(body.longitude),
                categoryid: body.categoryId,
                userid: session._id
            };
            const updatedPoi = await placemarkService.updatePoi(session.token, poi);
            return json(updatedPoi, { status: 200 });
        }
    }
}

export const DELETE = async ({ params, cookies }) => {
    const cookieStr = cookies.get("placemark-user") as string;
    if (cookieStr) {
        const session = JSON.parse(cookieStr) as Session;
        if (session) {
            const poiId = params.id;
            await placemarkService.deletePoi(session.token, poiId);
            return json(
                { success: true, id: poiId },
                { status: 200 }
            );
        }
    }
}