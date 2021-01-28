const { accessibility } = require('taiko');
const assert = require("assert");
const MIN_ACCESSIBILITY_SCORE = process.env.min_accessibility_score || 80;
const STOP_ON_ACCESSIBILITY_FAIL = process.env.stop_on_accessibility_fail || "false";

step(["Audit page for accessibility","Check accessibility for the page"], async () => {
  const audit = await accessibility.runAudit();

  gauge.message(
    `Accessibility Score: ${audit.score} Violations: ${JSON.stringify(
      audit.violations,
      null,
      5
    )}`
  );
  if (STOP_ON_ACCESSIBILITY_FAIL === "true") {
    assert.ok(audit.score >= MIN_ACCESSIBILITY_SCORE);
  }
});
