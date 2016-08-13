const pg = require('pg');

const dbConnStr = 'postgres://localhost/permits';
const client = new pg.Client(dbConnStr);
const series = require('async.series');

const log = (str) => console.log(str);
client.connect(function (err) {
  if (err) throw err;

  log('connected to db');

  const zones = {
    airport_zones: 'airport_zoning_overlay.geo.json',
    floodplain_zones: 'greater_austin_FEMA_floodplain.geo.json',
    historic_zones: 'nat_reg_historic_dist_overlay.geo.json'
  };

  // Rewrite in plain sql
  // const createTables = Object.keys(zones).map(function(zone) {
  //   return function(next) {
  //     log(`Creating ${zone} table`);
  //     client.query(`CREATE TABLE ${zone} (
  //       id serial PRIMARY KEY,
  //       dateCreated timestamp DEFAULT current_timestamp,
  //       geom geometry
  //     )`, next);
  //   };
  // });
  //
  // series(createTables, function(err, results) {
  //   if (err) throw err;
  //   log('finished creating tables');
  //   process.exit();
  // });

  const insertData = Object.keys(zones).map((zone) => {
    return (next) => {
      log(`Inserting data for ${zone}`);
      const data = require('../map-data/' + zones[zone]);
      const query = `insert into ${zone} (geom) values (ST_GeomFromGeoJSON($1))`;
      client.query(query, [data], next);
    };
  });

  series(insertData, (err, results) => {
    if (err) throw err;
    log('finished inserting data');
    process.exit();
  });
});
