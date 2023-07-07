module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended",
    "stylelint-config-prettier",
    "stylelint-config-rational-order",
    "postcss-less",
  ],
  customSyntax: "postcss-less",
  plugins: ["stylelint-order"],
}
