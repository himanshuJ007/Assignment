const Sequelize = require("sequelize");
const db = require("../db/config");

module.exports = db.sequelize.define(
  "Sales",
  {
    Region: { type: Sequelize.STRING },
    Country: { type: Sequelize.STRING },
    "Item Type": { type: Sequelize.STRING },
    "Sales Channel": { type: Sequelize.STRING },
    "Order Priority": { type: Sequelize.STRING },
    "Order Date": { type: Sequelize.DATE },
    "Order ID": { type: Sequelize.INTEGER, primaryKey: true },
    "Ship Date": { type: Sequelize.DATE },
    "Units Sold": { type: Sequelize.FLOAT },
    "Unit Price": { type: Sequelize.FLOAT },
    "Unit Cost": { type: Sequelize.FLOAT },
    "Total Revenue": { type: Sequelize.FLOAT },
    "Total Cost": { type: Sequelize.FLOAT },
    "Total Profit": { type: Sequelize.FLOAT },
  },
  { freezeTableName: "Sales", timestamps: false }
);

(async () => {
  await db.sequelize
    .sync({
      logging: console.log,
      force: false,
    })
    .then(() => {
      console.log("connection of database Successfully");
    })
    .catch((err) => {
      console.log("Unable to connect to dtabase", err);
    });
})();