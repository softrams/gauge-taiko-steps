/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");
const assert = require("assert");
const selectors = require("./_selectors");

step("emulate device <deviceType>", async (deviceType) => {
  await taiko.emulateDevice(deviceType);
});

step("save screenshot", async () => {
  const screenshotFilePath = path.join(
    process.env["gauge_screenshots_dir"],
    `screenshot-${process.hrtime.bigint()}.png`
  );
  await taiko.screenshot({ path: screenshotFilePath, fullPage: false });
});

step(
  "set screen size as width <width> height <height>",
  async (width, height) => {
    await taiko.setViewPort({
      width: parseInt(width),
      height: parseInt(height),
    });
  }
);

step("audit page for accessibility", async () => {
  const audit = await taiko.accessibility.runAudit();

  gauge.message(
    `Accessibility Score: ${audit.score} Violations: ${JSON.stringify(
      audit.violations,
      null,
      5
    )}`
  );

  assert.ok(audit.score >= (process.env.MIN_ACCESSIBILITY_SCORE || 90));
});
