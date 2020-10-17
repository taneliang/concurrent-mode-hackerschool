module.exports = (api) => {
  api.cache(true);
  const plugins = [];
  if (process.env.NODE_ENV !== "production") {
    plugins.push(["@babel/plugin-transform-react-jsx-source"]);
  }
  return {
    plugins,
    presets: [
      ["@babel/preset-env", { targets: { chrome: 49 } }],
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
  };
};
