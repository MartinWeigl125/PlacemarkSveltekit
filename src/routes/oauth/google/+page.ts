export const ssr = false;

export function load({ url }) {
  return {
    token: url.searchParams.get("token"),
    firstName: url.searchParams.get("firstName"),
    lastName: url.searchParams.get("lastName"),
    id: url.searchParams.get("_id")
  };
}
