const nextTranslate = require("next-translate-plugin");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  withImages({
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "api.siriusai.kz",
          port: "",
          pathname: "/media/profile_pictures/**",
        },
        {
          protocol: "https",
          hostname: "api.nearby.kz",
          port: "",
          pathname: "/media/profile_pictures/**",
        },
        {
          protocol: "https",
          hostname: "api.siriusai.kz",
          port: "",
          pathname: "/media/course_pictures/**",
        },
        {
          protocol: "https",
          hostname: "api.nearby.kz",
          port: "",
          pathname: "/media/course_pictures/**",
        },
        {
          protocol: "https",
          hostname: "api.siriusai.kz",
          port: "",
          pathname: "/media/**",
        },
        {
          protocol: "https",
          hostname: "api.nearby.kz",
          port: "",
          pathname: "/media/**",
        },
      ],
    },
  }),
  nextTranslate({
    webpack: (config, { isServer, webpack }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          module: false,
        };
      }

      return config;
    },
  }),
]);
