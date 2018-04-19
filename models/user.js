/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    company: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    dept: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    access_counter: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
