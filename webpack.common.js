require("dotenv").config();

const { ENVIRONMENT } = process.env;
console.log(ENVIRONMENT);
module.exports = {
  mode: ENVIRONMENT,
  watch: true,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devtool: "inline-source-map",
};
