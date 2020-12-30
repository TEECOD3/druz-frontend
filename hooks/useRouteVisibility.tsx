import * as React from "react";
import { useRouter } from "next/router";
import UserService from "utils/UserService";

const useRouteVisibility = (
  routeVisibility: "public" | "private" | "any",
): boolean => {
  const router = useRouter();
  const [shouldRender, setShouldRender] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (routeVisibility == "any") {
      setShouldRender(true);
    } else if (routeVisibility == "private") {
      if (UserService.getToken()) {
        setShouldRender(true);
      } else {
        setShouldRender(false);
        UserService.clearCredentials();
        router.replace("/login");
      }
    } else if (routeVisibility == "public") {
      if (!UserService.getToken()) {
        setShouldRender(true);
      } else {
        setShouldRender(false);
        router.replace("/home");
      }
    }
  }, [router, routeVisibility]);

  return shouldRender;
};

export default useRouteVisibility;
