module.exports = ({ file, options, env }) => {
  return {
    plugins: [
      require("autoprefixer"),
      options.mode === "production"
        ? require("cssnano")({
            preset: "default",
          })
        : null,
    ],
  };
};
