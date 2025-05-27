/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    "stylelint-config-standard-scss", 
    "stylelint-config-prettier-scss",
  ],
  rules: {
    "selector-class-pattern": null,
    "indentation": 2,
    "color-hex-case": "lower",
    "property-no-vendor-prefix": null,
    "selector-no-vendor-prefix": null,
    "media-feature-name-no-vendor-prefix": null,
    "at-rule-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "declaration-empty-line-before": "never",
    "at-rule-empty-line-before": [ "always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"],
    }],
  },
}
