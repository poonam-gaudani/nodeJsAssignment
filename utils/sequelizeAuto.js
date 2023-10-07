const { database } = require('../config');
const SequelizeAuto = require('sequelize-auto');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(database.name, database.user, database.pwd, { host: database.host, dialect: "mysql" });

const options = {
  directory: './models/',
  caseModel: 'u',
  additional    : {
    timestamps  : true,
    createdAt   : "created_at",
    updatedAt   : "updated_at"
  },
  // tables: ['table1', 'table2', 'myschema.table3'] // use all tables, if omitted
}

const auto = new SequelizeAuto(sequelize, null, null, options);

auto.run();