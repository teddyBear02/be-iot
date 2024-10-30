import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: process.env.MY_SQL_HOST_NAME,    // Địa chỉ của MySQL online
  user: process.env.MY_SQL_NAME,    // Tên đăng nhập của bạn
  password: process.env.MY_SQL_PASSWORD,// Mật khẩu của bạn
  database: process.env.MY_SQL_DATABASE_NAME // Tên cơ sở dữ liệu của bạn
}) 
.then(() => {
    console.log("Connected to DB !!!")
})
.catch((error) => {
    console.log(`${error}`)
})

export default connection;