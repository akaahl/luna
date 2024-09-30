import { headers } from "next/headers";

export const useGetUrl = () => {
  const headersList = headers();
  const host = headersList.get("X-Forwarded-Host");
  const proto = headersList.get("X-Forwarded-Proto");
  const rootUrl = `${proto}://${host}`;

  return { rootUrl };
};
