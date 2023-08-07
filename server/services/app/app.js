if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));
app.use(require("./middlewares/errorHandler"));

app.listen(PORT, () => {
  console.log("Minta uang parkirnya " + PORT);
});
