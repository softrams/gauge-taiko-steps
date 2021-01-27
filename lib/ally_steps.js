const { accessibility } = require('taiko');
const assert = require("assert");
const MIN_ACCESSIBILITY_SCORE = process.env.min_accessibility_score || 80;

step("Execute accessibility check", async () => {
  const audit = await accessibility.runAudit();

  gauge.message(
    `Accessibility Score: ${audit.score} Violations: ${JSON.stringify(
      audit.violations,
      null,
      5
    )}`
  );
  assert.ok(audit.score >= MIN_ACCESSIBILITY_SCORE);
});
