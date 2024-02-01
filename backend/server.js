const express = require('express');
const cors=require("cors");
const app = express();
const fetchDataAndStore=require("./logic.js/index")
const cryptoroute=require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const port = 5000; // You can choose any available port

fetchDataAndStore();



app.use('/', cryptoroute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
