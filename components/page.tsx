import * as React from "react";
import Head from "next/head";
import { withRouter, Router } from "next/router";
import { ArticleJsonLd } from "next-seo";
import { dateTime } from "../utils/dateFormat";
import Wrapper from "./wrapper";

const Page: React.FC<{
  children: React.ReactNode;
  date?: number | Date;
  description: string;
  image?: string;
  title: string;
  keywords?: string;
  router: Router;
  excludeWrapper?: boolean;
}> = ({
  children,
  date,
  description,
  image,
  title = "Druz",
  router,
  excludeWrapper,
}) => {
  const domain = process.env.DOMAIN || "https://www.druz.xyz";
  const url = router && router.asPath ? router.asPath : undefined;
  const canonical = url && url === "/" ? domain : domain + url;
  const featuredImage = domain + image;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {description && <meta content={description} name="description" />}
        <meta
          content={
            "Druz, Anonymous, answer, questions, find out what others think about you, answer questions, anonymous messaging"
          }
          name="keywords"
        />
        <meta content="follow, index" name="robots" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta
          content="/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        <link
          href="/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/favicons/site.webmanifest" rel="manifest" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500&display=swap"
          rel="stylesheet"
        />

        <link href="/favicons/favicon.ico" rel="shortcut icon" />
        {url && <link href={canonical} rel="canonical" />}
        <meta content="en_US" property="og:locale" />
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={canonical} property="og:url" />
        <meta
          content="Hpp9X9jyEMHAX90NVA1ZCbOD15F860gBbixu8oXZkMY"
          name="google-site-verification"
        />
        {featuredImage ? (
          <>
            <meta content={featuredImage} property="og:image" />
            <meta
              content={
                description ||
                "Druz helps you find out what people think about you by getting them to answer some questions."
              }
              property="og:image:alt"
            />
            <meta name="twitter:image" content={featuredImage} />
          </>
        ) : (
          <>
            <meta
              content="https://res.cloudinary.com/djksghat4/image/upload/v1590483641/Druz/android-chrome-512x512.png"
              property="og:image"
            />
            <meta
              name="twitter:image"
              content="https://res.cloudinary.com/djksghat4/image/upload/v1590483641/Druz/android-chrome-512x512.png"
            />
            <meta
              content={
                description ||
                "Druz helps you find out what people think about you by getting them to answer some questions."
              }
              property="og:image:alt"
            />
          </>
        )}
        {date && (
          <>
            <meta content="article" property="og:type" />
            <meta content={dateTime(date)} property="article:published_time" />
          </>
        )}
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@druz_app" name="twitter:site" />
        <meta content="@druz_app" name="twitter:creator" />
      </Head>
      {excludeWrapper ? <>{children}</> : <Wrapper>{children}</Wrapper>}
      {date && (
        <ArticleJsonLd
          authorName="Aigbiluese Eronmonsele"
          dateModified={dateTime(date)}
          datePublished={dateTime(date)}
          description={description}
          images={[featuredImage]}
          publisherLogo={`${domain}/logo192.png`}
          publisherName="Druz"
          title={title}
          url={canonical}
        />
      )}
    </>
  );
};

export default withRouter(Page);
