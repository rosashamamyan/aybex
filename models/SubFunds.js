module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER, DATEONLY } = DataTypes;
  const SubFund = sequelize.define(
    "sub-funds",
    {
      name: STRING,
      featured: INTEGER,
      status: INTEGER,
      deleted: INTEGER,
      private_company: INTEGER,
      start_date: DATEONLY,
      icon: STRING,
      about: STRING,
      link: STRING,
      video_url: STRING,
      created_by: INTEGER,
      updated_by: INTEGER,
      strategy_name: STRING,
      wire_due_date: DATEONLY,
      visibility: INTEGER,
      legal_entity_name: STRING
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
  return SubFund;
};