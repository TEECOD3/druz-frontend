import { useRouter } from "next/router";
import axios from "utils/axios";
import { GetServerSideProps } from "next";
import UserPage from "views/user";
import Page from "components/page";
import useRouteVisibility from "hooks/useRouteVisibility";
import capitalizeString from "utils/capitalizeString";

const User: React.FC<{ user: UserData }> = ({ user }) => {
  const shouldRender = useRouteVisibility("any");
  const router = useRouter();
  const { username } = router.query;
  return (
    <Page
      image={"/images/banner.png"}
      // @ts-ignore
      title={`Take a challenge by ${capitalizeString(username)} | Druz`}
      description={`${capitalizeString(
        // @ts-ignore
        username,
      )} has a challenge for you. Get started by answering their questions!`}
    >
      {shouldRender && <UserPage user={user} />}
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
      `/api/v1/user?name=${context!.params!.username}`,
    );
    const { data } = res;
    const user: UserData = data?.data?.user;

    return {
      props: {
        user,
      },
    };
  } catch (err) {
    if (err?.response?.status == 404) {
      return {
        notFound: true,
      };
    }
  }
};

export default User;
