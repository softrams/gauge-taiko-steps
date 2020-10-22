/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");
const assert = require("assert");
const selectors = require("./_selectors");

const MIN_ACCESSIBILITY_SCORE = process.env.MIN_ACCESSIBILITY_SCORE || 90;

// Complete list of devices: https://github.com/getgauge/taiko/blob/master/lib/data/devices.js
// Example: iPad Pro landscape, iPhone X
step("Emulate device <deviceType>", async deviceType => {
  await taiko.emulateDevice(deviceType);
});

// Emulate Network: GPRS, Regular2G, Good2G, Regular3G, Good3G, Regular4G, DSL, WiFi, Offline
step("Emulate network <networkType>", async networkType => {
  await taiko.emulateNetwork(networkType);
});

// Emulate Timezone: Ex: America/Chicago, America/New_York, America/Los_Angeles
step("Emulate timezone <timezone>", async timezone => {
  await taiko.emulateTimezone(timezone);
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

  assert.ok(audit.score >= MIN_ACCESSIBILITY_SCORE);
});
