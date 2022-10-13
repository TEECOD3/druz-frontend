import * as React from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import axios from "utils/axios";
import { GetServerSideProps } from "next";
import { UserMessages } from "views/userMessages";
import Page from "components/page";
import capitalizeString from "utils/capitalizeString";
import UserService from "utils/UserService";

interface Props {
  user: UserData;
  error: boolean | undefined;
  noResponse: boolean | undefined;
  noUser: boolean | undefined;
}

const User: React.FC<Props> = ({ user, error, noResponse, noUser }) => {
  const router = useRouter();
  const { username } = router.query;

  React.useEffect(() => {
    if (UserService.getToken()) {
      const getDashboard = async () => {
        try {
          const res = await axios.get("/api/v1/profile/dashboard");
          const { data } = res;
          if (data?.data?.user?.name == user?.name) {
            router.replace("/home");
          }
        } catch (err) {
          // error boundary or something
        }
      };
      getDashboard();
    }
  }, [router, user?.name]);
  return (
    <Page
      image={"/images/banner.png"}
      title={
        error || noResponse
          ? "Druz"
          : noUser
          ? "User not found | Druz"
          : // @ts-ignore
            `Take a challenge by ${capitalizeString(username)} | Druz`
      }
      description={
        user
          ? `${capitalizeString(
              // @ts-ignore
              username,
            )} has a challenge for you on Druz. Get started by leaving them a message and let them know what you think about them!`
          : "Druz helps you find out what people think about you by getting them to answer some questions."
      }
    >
      <UserMessages
        error={error}
        noResponse={noResponse}
        noUser={noUser}
        user={user}
      />
    </Page>
  );
};

type UserData = {
  name: string;
  questions: {
    _id: string;
    content: string;
    data: string;
  }[];
  _id: string;
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await axios.get(
      `/api/v1/user?name=${context?.params?.username}`,
    );
    const { data } = res;
    const user: UserData = data?.data?.user;

    return {
      props: {
        user,
      },
    };
  } catch (err) {
    if ((err as AxiosError)?.response?.status == 404) {
      return {
        props: {
          noUser: true,
          user: { name: context?.params?.username },
        },
      };
    } else if (/^5/.test(String((err as AxiosError)?.response?.status))) {
      return {
        props: {
          error: true,
        },
      };
    }
    return {
      props: {
        noResponse: true,
      },
    };
  }
};

export default User;
