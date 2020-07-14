/* globals gauge*/
"use strict";
const mysql = require("mysql");
const assert = require("assert");

let dbConn;

async function initDBConnection() {
  return new Promise(async (resolve, reject) => {
    try {
      dbConn = mysql.createPool({
        connectionLimit: 5,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
      });
      resolve(true);
    } catch (err) {
      console.log("Failure in creating DB connection pool:", err);
      reject(err);
    }
  });
}

async function dbQuery(query, params) {
  return new Promise(async (resolve, reject) => {
    try {
      dbConn.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          // console.log("dbQuery Results:", results);
          resolve(results);
        }
      });
    } catch (err) {
      console.log("Failure in query: ", err);
      reject(err);
    }
  });
}

beforeSuite(async () => {
  await initDBConnection();
});

afterSuite(async () => {
  if (dbConn) {
    dbConn.end(err => {});
  }
});

step("<Table> should have at least <number> row(s)", async function(
  table,
  rows
) {
  const results = await dbQuery(
    `Select count(*) as NumberOfRows from ${table}`
  );
  assert.ok(results[0].NumberOfRows >= rows);
});

step("Value of <Column> in <Table> must have a value", async function(
  col,
  table
) {
  const results = await dbQuery(
    `Select count(*) as NumberOfRows from ${table} where ${col} IS NULL`
  );
  assert.ok(results[0].NumberOfRows > 0);
});

step(
  "Value of <Column> in <Table> must be one of <List of Values>",
  async function(col, table, values) {
    const arr = values.split(",").map(x => x.trim().toLowerCase());
    // console.log("List", arr);
    const results = await dbQuery(
      `Select distinct COALESCE(${col},'NULL') as ${col} from ${table}`
    );
    // console.log("Data", results);
    assert.ok(
      results && results.every(x => arr.includes(x[col].toLowerCase())),
      `Found ${JSON.stringify(results, 2)}`
    );
  }
);

step(
  "Value of <Column1> in <Table> is <Value> then <Column2> must be one of <List of Values>",
  async function(col, table, colvalue, col2, values) {
    const arr = values.split(",").map(x => x.trim().toLowerCase());
    // console.log("List", arr);
    const results = await dbQuery(
      `Select distinct COALESCE(${col2},'NULL') as ${col2} from ${table} WHERE ${col}=?`,
      [colvalue]
    );
    // console.log("Data", results);
    assert.ok(
      results.every(x => arr.includes(x[col2].toLowerCase())),
      `Found ${JSON.stringify(results, 2)}`
    );
  }
);
