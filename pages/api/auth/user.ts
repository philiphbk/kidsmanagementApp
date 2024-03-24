import { Sequelize, Model, DataTypes } from "sequelize";

// Assuming you have a Sequelize instance initialized
// Replace with your actual Sequelize database connection
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql", // Change to 'mysql', 'sqlite', 'mariadb', or 'mssql' depending on your DB
});

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default User;
