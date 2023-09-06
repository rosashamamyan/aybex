module.exports = (sequelize, DataTypes) => {
    const {STRING, INTEGER, DECIMAL, DATEONLY} = DataTypes
    const AccountUploadBatch = sequelize.define(
      "account_upload_batch",
      {
        file_name: STRING,
        total_accounts: INTEGER,
        new_accounts: INTEGER,
        file_path: STRING,
        error_log: STRING,
        status: INTEGER,
        created_by: INTEGER,
        updated_by: INTEGER
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
    return AccountUploadBatch;
  };