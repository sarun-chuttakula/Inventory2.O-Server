import * as fs from "fs";
import * as mysql from "mysql2/promise";
import * as path from "path";
import logger from "./logger.util";

// MySQL database connection parameters
const connectionParams: mysql.PoolOptions = {
  host: "localhost",
  user: "sqluser",
  password: "zxcvbnm",
  database: "Inventory",
};

// Function to generate CREATE TABLE statements
export async function generateCreateTableScript() {
  const pool = mysql.createPool(connectionParams);

  try {
    // Retrieve table names
    const [rows] = await pool.execute("SHOW TABLES");
    const tables = rows as { Tables_in_inventory: string }[];

    // Generate SQL script
    let sqlScript = "";

    for (const table of tables) {
      const tableName = table.Tables_in_inventory;

      if (tableName) {
        const [createTableRows] = await pool.execute<mysql.RowDataPacket[]>(
          `SHOW CREATE TABLE \`${tableName}\``
        );

        if (createTableRows && createTableRows.length > 0) {
          const createTableStatement = createTableRows[0]["Create Table"];
          logger.info(
            `CREATE TABLE statement for ${tableName}:`
            // createTableStatement
          );
          sqlScript += `\n\n${createTableStatement};`;
        } else {
          logger.error(
            `Error: Unable to retrieve CREATE TABLE statement for table ${tableName}`
          );
        }
      }
    }
    const outputDirectory = path.join(__dirname, "../../SQL");
    const filePath = path.join(outputDirectory, "create_tables_script.sql");

    // Write the SQL script to a file
    fs.writeFileSync(filePath, sqlScript);

    logger.info("SQL script generated successfully.");
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    // Close the connection pool
    if (pool) {
      await pool.end();
    }
  }
}

// Run the script
