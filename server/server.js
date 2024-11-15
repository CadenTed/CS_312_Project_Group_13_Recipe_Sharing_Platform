import express from "express";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const port = 5001;

const corsOptions = {
   origin: ["http://localhost:3000"]
}

let idToDisplay;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
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

const recipeInfo = [
  {
    id: 0,
    ingredients: [
      "1/2 lb Ground Beef",
      "1 Hamburger Bun",
      "1 slice of Cheese",
      "Lettuce",
      "Tomato",
      "Pickles",
    ],
    steps: [
      "Form the beef into a patty",
      "Season the patty with salt and pepper",
      "Cook the patty on a grill or stovetop",
      "Assemble the burger with your desired toppings",
    ],
    cookware: ["Grill", "Spatula"],
  },
  {
    id: 1,
    ingredients: [
      "1 Salmon Fillet",
      "1 cup of Mixed Vegetables",
      "1 cup of Rice",
      "Salt",
      "Pepper",
    ],
    steps: [
      "Season the salmon fillet with salt and pepper",
      "Fry the salmon in a pan until crispy",
      "Steam the mixed vegetables",
      "Cook the rice",
    ],
    cookware: ["Pan", "Pot", "Steamer"],
  },
];

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.post("/api/login", (req, res) => {
   res.json({"success": true});
});

app.get("/api/signup", (req, res) => {

});

app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

app.post("/api/recipe-id", (req, res) => {
  setIdToDisplay(req.body.id);
});

app.get("/api/recipe-info", (req, res) => {
  const id = idToDisplay;
  const recipe = recipeInfo.find((recipe) => recipe.id == id);
  console.log(recipe);
  res.json(recipe);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const setIdToDisplay = (id) => {
  idToDisplay = id;
};
