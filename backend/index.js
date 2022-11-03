import express from "express";
import cors from "cors";
import { getPharmacies } from "./scrap.js";

const app = express();


// CORS middleware
app.use(cors({origin: true}));

app.get("/", async (req, res) => {
  res.status(200).json(await getPharmacies());
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
