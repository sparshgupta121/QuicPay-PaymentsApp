require("dotenv").config();

const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
	res.send("hii");
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
