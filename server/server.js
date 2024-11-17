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

app.post("/api/login", async (req, res) => {

     const { userId, password } = req.body;
     try 
       {
        const result = await db.query('SELECT * FROM users WHERE name = $1', [userId]);
        if (result.rowCount == 0) 
           {
              res.json({"success": false, "error": "Username does not exist"});
           }
        else
           {
            if (result.rows[0].password == password)
               {
                loggedInUsername = userId;
                loggedInUserId = result.rows[0].user_id;
                res.json({"success": true})
               }
            else
               {
                 res.json({"success": false, "error": "Password is incorrect"});
               }
           }
       } 
     catch (err) 
       {
        console.error('Error during signin:', err);
        res.status(500).send('Server Error');
       }
});

app.get("/api/signup", async (req, res) => {

     const { username, email, birthday, password } = req.body;
     const numUsers = (await db.query("SELECT * FROM users")).rowCount

     try 
        {
         const result = await db.query('SELECT * FROM users WHERE name = $1', [username]);
         if (result.rowCount > 0) 
            {
             return res.json({"success": false, "error": "Username already exists" });
            }

         await db.query('INSERT INTO users (user_id, username, password, email, birthdate) VALUES ($1, $2, $3, $4, 5$)', [numUsers + 1, username, password, email, birthday]);

         res.json({"success": true});
        } 
     catch (err) 
        {
         console.error('Error during signup:', err);
         res.status(500).send('Server Error');
        }
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
