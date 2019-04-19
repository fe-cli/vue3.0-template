/**
 * @Author: kevin
 * Date: 2019/3/20
 * Time: 12:09
 *
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"]
  }
}
