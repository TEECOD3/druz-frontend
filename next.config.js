const environment = process.env.NODE_ENV;
const rootEndPoint =
  environment == "production"
    ? "http://104.248.173.191:4000/"
    : "http://localhost:4000/";

module.exports = {
  env: {
    BASE_URL: rootEndPoint,
    DOMAIN: "https://druz.vercel.app",
  },
};
