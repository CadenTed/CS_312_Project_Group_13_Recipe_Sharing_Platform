import express from "express";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";

const app = express();
const port = 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(bodyParser.json());

const recipes = [
  {
    name: "Cheese Burger",
    description:
      "A delicious cheeseburger with a juicy beef patty, melted cheese, lettuce, tomato, and pickles, served on a toasted bun.",
    id: 0,
    img: "http://localhost:5001/images/cheese-burger.png",
  },
  {
    name: "Fried Salmon",
    description:
      "Crispy fried salmon with a side of mixed vegetables and seasoned rice.",
    id: 1,
    img: "http://localhost:5001/images/fried-salmon.png",
  },
];

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
