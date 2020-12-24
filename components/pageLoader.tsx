import * as React from "react";
import Head from "next/head";

interface PageLoaderProps {
  loaded: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ loaded }) => {
  <Head>
    <title>Find out what people think about you | Druz</title>
    <meta charSet="utf-8" />
    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta
      content="Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      name="description"
    />
    <meta content="follow, index" name="robots" />
    <meta content="#ffffff" name="theme-color" />
    <meta content="#ffffff" name="msapplication-TileColor" />
    <meta content="/favicons/browserconfig.xml" name="msapplication-config" />
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
      href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500&display=swap"
      rel="stylesheet"
    />

    <link href="/favicons/favicon.ico" rel="shortcut icon" />
    <meta content="en_US" property="og:locale" />
    <meta
      content="Find out what people think about you | Druz"
      property="og:title"
    />
    <meta
      content="Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      property="og:description"
    />
    <meta
      content="Druz is an interactive, fun, secure and safe app. Create an account, set your questions, share your profile link and see what your friends think about you. All for free!"
      property="og:image:alt"
    />

    <meta content="summary_large_image" name="twitter:card" />
    <meta content="@druz_app" name="twitter:site" />
    <meta content="@druz_app" name="twitter:creator" />
  </Head>;
  return (
    <div style={{ display: !loaded ? "block" : "none" }}>
      <div className="loader-wrapper">
        <div className="loader"></div>
        <div className="loader-section"></div>
        <div className="loader-section"></div>{" "}
        <img
          src="images/page_loader.png"
          alt="Loader"
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            marginTop: ".2rem",
          }}
          className="loader-image"
        />
      </div>
      <style jsx>
        {`
          .loader-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999999;
            overflow: hidden;
          }
          .loader {
            display: block;
            position: relative;
            left: 50%;
            top: 50%;
            width: 150px;
            height: 150px;
            margin: -75px 0 0 -75px;
            border-radius: 50%;
            border: 3px solid transparent;
            -webkit-animation: spin 1.8s linear infinite;
            animation: spin 1.8s linear infinite;
            z-index: 11;
          }
          .loader:before {
            content: "";
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            border-radius: 50%;
            border: 1px solid #f5fffb80;
            border-top: 2px solid #3b9795;
            border-left: 2px solid #3b9795;
            -webkit-animation: spin 3s linear infinite;
            animation: spin 3s linear infinite;
          }
          .loader-image {
            position: absolute;
            z-index: 85;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: 50%;
            transform: translateY(-58%);
          }
          @-webkit-keyframes spin {
            0% {
              -webkit-transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
            }
          }
          @keyframes spin {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          .loader-wrapper .loader-section {
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10;
          }
        `}
      </style>
    </div>
  );
};

export default PageLoader;
