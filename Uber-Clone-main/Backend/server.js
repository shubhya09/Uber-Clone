import dotenv from 'dotenv'

dotenv.config({
    path:'./.env'
})
// import http from 'http'
import {app} from './app.js'
import { connectDb } from './src/db/connectDB.js'
// import { initializeSocket } from './src/utils/GlobalSocket.js'


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is in use, trying another...`);
    app.listen(0); 
  } else {
    console.error(err);
  }
});


connectDb()



