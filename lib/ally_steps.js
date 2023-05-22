const { accessibility } = require('taiko');
const assert = require("assert");
const MIN_ACCESSIBILITY_SCORE = process.env.min_accessibility_score || 80;
const CONTINUE_ON_ACCESSIBILITY_FAIL = process.env.continue_on_accessibility_fail || "false";

step(["Audit page for accessibility", "Check accessibility for the page"], async () => {
  const audit = await accessibility.runAudit();

  gauge.message(
    `<pre>Accessibility Score: ${audit.score} Violations: ${JSON.stringify(
      audit.violations,
      null,
      2
    )}</pre>`
  );
  if (!(CONTINUE_ON_ACCESSIBILITY_FAIL === "true")) {
    assert.ok(audit.score >= MIN_ACCESSIBILITY_SCORE);
  }
});
