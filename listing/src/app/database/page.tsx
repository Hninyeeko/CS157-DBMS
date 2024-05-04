import mysql from 'mysql2/promise';
import fs from 'fs/promises';
export let connection;



export async function connect() {
  let connection;
  try {
      connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          port: 3307,
          database: 'users'
      });
      console.log('Connected to the MySQL server.');
  } catch (error) {
      console.error(`Error connecting to the MySQL server`);
      throw error; // Throw the error to stop execution
  }
  return connection;
}

// This was just a test for me to make sure the connection was working lowkey 
export async function selectAllStudents() {
  try {
    // Ensure connection is established
    if (!connection) {
      connection = await connect();
    }
    const [rows, fields] = await connection.query('SELECT * FROM students');
    console.log(rows);
    console.log('Query executed successfully.');
    return rows;
  } catch (error) {
    console.error(`Error executing query: `, error);
  }
 
}
// ignore this i was just testing the connection




// this is still a work in progress
async function executeSqlFile(filePath) {
  // Create a connection to the database
  const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3307,
  });

  try {
      // Read the SQL file
      const sql = await fs.readFile(filePath, 'utf-8');

      // Split the SQL string into individual commands
      const commands = sql.split(';');

      // Execute each command
      for (const command of commands) {
          if (command.trim() === '') continue; // Skip empty commands
          await connection.query(command);
      }

      console.log('SQL file executed successfully.');
  } catch (error) {
      console.error(`Error executing SQL file: `, error);
  } finally {
      // Close database connection
      await connection.end();
  }
}


// Call the function with the path to your SQL file
executeSqlFile('.\\src\\dbsetup.sql');
  
 
 

