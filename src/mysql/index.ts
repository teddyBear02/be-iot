import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: process.env.MY_SQL_HOST_NAME,    
  user: process.env.MY_SQL_NAME,   
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE_NAME 
}) 
.then(() => {
    console.log("Connected to DB !!!")
})
.catch((error) => {
    console.log(`${error}`)
})

export default connection;