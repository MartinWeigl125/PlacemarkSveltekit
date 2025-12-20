import { dev } from "$app/environment";
import { placemarkService } from "$lib/services/placemark-service.js";
import type { User } from "$lib/types/placemark-types.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    signup: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = form.get("email") as string;
        const password = form.get("password") as string;
        const firstName = form.get("firstName") as string;
        const lastName = form.get("lastName") as string;
        if (email === "" || password === "" || firstName === "" || lastName === "") {
            throw redirect(307, "/signup");
        } else {
            const user: User = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
            const session = await placemarkService.signup(user);
            if (session) {
                const userJson = JSON.stringify(session);
                cookies.set("placemark-user", userJson, {
                    path: "/",
                    httpOnly: true,
                    sameSite: "strict",
                    secure: !dev,
                    maxAge: 60 * 60 * 24 * 7 // one week
                });
                throw redirect(303, "/dashboard");
            } else {
                throw redirect(307, "/signup");
            }
        }
    }
}