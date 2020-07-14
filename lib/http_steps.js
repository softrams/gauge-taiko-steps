/* globals gauge*/
"use strict";
const axios = require("axios");
const assert = require("assert");

beforeSuite(async () => {});

afterSuite(async () => {});

step("Healthcheck for <service> service must return OK", async function (
  service
) {
  let healthCheckUrl = "";
  if (service === "idm") {
    healthCheckUrl = `idm/auth/healthcheck`;
  } else {
    healthCheckUrl = `${service}/model/healthcheck`;
  }

  const result = await axios.get(
    `${process.env.API_ROOT_URL}/${healthCheckUrl}`,
    {
      headers: { Authorization: "allow" },
    }
  );
  assert.ok(result.status === 200);
});

step(
  "Healthcheck for <service> service must return version number to be at least <version>",
  async function (service, version) {
    let healthCheckUrl = "";
    if (service === "idm") {
      healthCheckUrl = `idm/auth/healthcheck`;
    } else {
      healthCheckUrl = `${service}/model/healthcheck`;
    }

    const result = await axios.get(
      `${process.env.API_ROOT_URL}/${healthCheckUrl}`,
      {
        headers: { Authorization: "allow" },
      }
    );
    assert.ok(result.data.version > version);
  }
);

step("Healthcheck for <app> UI application must return OK", async function (
  app
) {
  let healthCheckUrl = "";
  if (app === "4i-ui") {
    app = "assets/version.json";
  } else {
    app = `${app}/assets/version.json`;
  }
  const result = await axios.get(
    `${process.env.APP_ROOT_URL}/${healthCheckUrl}`,
    {
      headers: { Authorization: "allow" },
    }
  );
  assert.ok(result.status === 200);
});
