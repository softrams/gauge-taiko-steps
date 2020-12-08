/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");

const headless = process.env.headless_chrome || 'true';

beforeSuite(async () => {
  // await taiko.openBrowser({ headless: headless === 'true', args: ["--start-fullscreen"]});
  await taiko.openBrowser({ headless: headless === 'true'});
  await taiko.intercept('https://velocity-api.4innovation.io/public/graphql', (request) => {
    request.respond({
      body:
      `
      {
        "data":{
           "getConfigFiltered":{
              "features":{
                 "DATAHUB_BULK_UPLOAD":{
                    "enabled":true,
                    "updatedAt":"2020-12-06T18:01:38.482Z",
                    "condition":null,
                    "createdAt":"2020-10-26T16:49:38.239Z",
                    "name":"DATAHUB_BULK_UPLOAD"
                 },
                 "DataRequestFormFeatureFlag":{
                    "enabled":true,
                    "updatedAt":"2020-12-06T18:01:55.303Z",
                    "condition":{
                       "start":null,
                       "options":{
                          "subModelTypes":{
                             "ckcc":true,
                             "dc":true,
                             "kcf":true
                          }
                       },
                       "end":null,
                       "compare":null,
                       "type":"CustomCondition",
                       "value":null
                    },
                    "name":"DataRequestFormFeatureFlag"
                 },
                 "BenefitEnhancement":{
                    "enabled":true,
                    "updatedAt":"2020-12-06T18:00:56.819Z",
                    "condition":{
                       "start":null,
                       "options":{
                          "subModelTypes":{
                             "ckcc":true,
                             "dc":true,
                             "kcf":true
                          }
                       },
                       "end":null,
                       "compare":null,
                       "type":"CustomCondition",
                       "value":null
                    },
                    "createdAt":"2020-09-22T13:39:34.798Z",
                    "name":"BenefitEnhancement"
                 },
                 "KnowledgeLibrarySideNav":{
                    "enabled":true,
                    "updatedAt":"2020-11-11T18:31:04.160Z",
                    "condition":null,
                    "name":"KnowledgeLibrarySideNav"
                 },
                 "DATAHUB_FILE_EXCHANGE":{
                    "enabled":true,
                    "updatedAt":"2020-12-06T18:01:46.262Z",
                    "condition":null,
                    "createdAt":"2020-10-26T16:49:16.212Z",
                    "name":"DATAHUB_FILE_EXCHANGE"
                 },
                 "ApiKeyManagementAccess":{
                    "enabled":true,
                    "updatedAt":"2020-11-11T18:35:55.523Z",
                    "condition":null,
                    "createdAt":"2020-10-22T13:55:39.383Z",
                    "name":"ApiKeyManagementAccess"
                 },
                 "knowledgeLibraryAccess":{
                    "enabled":true,
                    "updatedAt":"2020-11-11T18:31:11.659Z",
                    "condition":null,
                    "createdAt":"2020-10-03T02:34:14.914Z",
                    "name":"knowledgeLibraryAccess"
                 },
                 "OmFeatureFlag":{
                    "enabled":true,
                    "name":"OmFeatureFlag"
                 },
                 "KL_LIBRARY_PATH":{
                    "enabled":true,
                    "updatedAt":"2020-12-06T18:02:08.680Z",
                    "condition":null,
                    "createdAt":"2020-09-30T18:08:14.113Z",
                    "name":"KL_LIBRARY_PATH"
                 }
              },
              "enabled":true
           }
        }
     }
      `
    });
  });
});


afterSuite(async () => {
  await taiko.closeBrowser();
});

afterStep(async () => {
  if (process.env.screenshot_on_everystep === "true") {
    const currentURL = await taiko.currentURL();
    if (!currentURL || currentURL !== "about:blank") {
      gauge.message(`URL:${currentURL}`);
      await gauge.screenshot();
    }
  }
});

gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(
    process.env["gauge_screenshots_dir"],
    `screenshot-${process.hrtime.bigint()}.png`
  );
  await taiko.screenshot({ path: screenshotFilePath, fullPage: false });
  return path.basename(screenshotFilePath);
};
