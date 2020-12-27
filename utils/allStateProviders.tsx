import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import axios from "axios";
import AuthProvider from "context/authContext/AuthProvider";

const rootEndpoint = process.env.BASE_URL;

const AllStateProviders: React.FC<React.ReactNode> = (props) => {
  const router = useRouter();
  const { addToast } = useToasts();

  React.useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = rootEndpoint;
    axios.defaults.headers = {
      authorization: `Bearer ${localStorage.getItem("druz_token")}`,
      "content-type": "application/json",
    };
    axios.interceptors.response.use(
      (res) => Promise.resolve(res),
      (err) => {
        if (!err.response) {
          addToast("Check your network connection", {
            appearance: "warning",
          });
        }

        if (err.response.status === 401 && router.pathname !== "/login") {
          setTimeout(() => {
            router.replace("/login");
            typeof window != "undefined" && localStorage.clear();
          }, 0);
        }
        return Promise.reject(err);
      },
    );
  }, [addToast, router]);
  return <AuthProvider>{props.children}</AuthProvider>;
};

export default AllStateProviders;
