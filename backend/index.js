import express from "express";
import cors from "cors";
import { getPharmacies } from "./scrap.js";

const app = express();

// CORS middleware
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json(await getPharmacies());
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
