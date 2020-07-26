module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.svg$": "<rootDir>/tests/unit/transforms/svgTransform.js"
  }
};
