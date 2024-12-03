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

const db = new pg.Client({
   user: "postgres",
   host: "localhost",
   database: "RecipeBase",
   password: "Pr1nt3xP@lms",
   port: "5432"
});

db.connect();

let idToDisplay;
let loggedInUsername = "";
let loggedInUserId = 0;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(bodyParser.json());

async function getRecipes()
   {
    const recipes = await db.query('SELECT name, description, picture AS img FROM "Recipes"');
    return recipes.rows;
   }

const recipes = [
  {
    name: "Cheese Burger",
    description:
      "A delicious cheeseburger with a juicy beef patty, melted cheese, lettuce, tomato, and pickles, served on a toasted bun.",
    id: 1,
    img: "http://localhost:5001/images/cheese-burger.png",
  },
  {
    name: "Fried Salmon",
    description:
      "Crispy fried salmon with a side of mixed vegetables and seasoned rice.",
    id: 2,
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

app.post("/api/login", async (req, res) => {

     const { userId, password } = req.body;

     console.log(`Request recieved: ${req.body}`);
     try 
       {
        const result = await db.query('SELECT * FROM "Users" WHERE username = $1', [userId]);
        if (result.rowCount == 0) 
           {
              res.json({"success": false, "error": "Username does not exist"});
           }
        else
           {
            if (result.rows[0].password == password)
               {
                loggedInUsername = userId;
                loggedInUserId = result.rows[0].userId;
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

app.post("/api/signup", async (req, res) => {

     const { username, email, birthday, password } = req.body;
     const numUsers = (await db.query('SELECT * FROM "Users"')).rowCount
     console.log("Signup request recieved");

     try 
        {
         const result = await db.query('SELECT * FROM "Users" WHERE username = $1', [username]);
         if (result.rowCount > 0) 
            {
             return res.json({"success": false, "error": "Username already exists" });
            }

         await db.query('INSERT INTO "Users" ("userId", username, password, email, birthdate) VALUES ($1, $2, $3, $4, $5)', [numUsers + 1, username, password, email, birthday]);

         res.json({"success": true});
        } 
     catch (err) 
        {
         console.error('Error during signup:', err);
         res.status(500).send('Server Error');
        }
});

app.post("/api/savedRecipes", async (req, res) => {
   try
      {
       const result = await db.query(`SELECT "Recipes"."name", "Recipes"."description" FROM "Recipes" LEFT JOIN "Users" ON "Recipes"."recipeId" = "Users"."saved_recipes" WHERE "Users"."userId" = ${loggedInUserId};`);
       if (result.rowCount > 0)
       {
         res.json({"success": true, "recipes": result.rows});
       }
       else
       {
         res.json({"success": false, "recipes": null});
       }
      }
   catch(err)
      {
       console.error('Error during load:', err);
       res.status(500).send('Server Error');
      }
});

app.post("/api/userRecipes", async (req, res) => {
   try
      {
       const result = await db.query(`SELECT "Recipes"."name", "Recipes"."description" FROM "Recipes" WHERE "Recipes"."recipeUserId" = ${loggedInUserId};`);
       if (result.rowCount > 0)
       {
         res.json({"success": true, "recipes": result.rows});
       }
       else
       {
         res.json({"success": false, "recipes": null});
       }
      }
   catch(err)
      {
       console.error('Error during load:', err);
       res.status(500).send('Server Error');
      }
});

app.post("/api/save", async (req, res) => {
   const { recipeId } = req.body;
   const result = await db.query(`UPDATE "Users" SET saved = ${recipeId} WHERE "userId" = ${loggedInUserId};`);
});

app.post("/api/addComment", async (req, res) => {
   const { commentContent, recipeId } = req.body;
   try
      {
      const result = await db.query('INSERT INTO "Ratings" ("recipeId", "userId", "comment", "ratingDate") VALUES ($1, $2, $3, $4);', [recipeId, loggedInUserId, commentContent, new Date().toISOString()]);
      res.json(result.rows);
      }
   catch(err)
      {
      console.log(err);
      }
   
});

app.post("/api/getComments", async (req, res) => {
   console.log(req.body);
   const { recipeId } = req.body;
   try
      {
       const result = await db.query('SELECT * FROM "Ratings" WHERE "recipeId" = $1', [recipeId]);
       if (result.rowCount > 0)
         {
         res.json({"success": true , "commentData": result.rows});
         }
       else
         {
          res.json({"success": false, "commentData": null});
         }
      }
   catch(err)
      {
       
      }
});

app.get("/api/recipes", async (req, res) => {
  
  res.json(await getRecipes());
});

app.post("/api/recipe-id", (req, res) => {
  setIdToDisplay(req.body.id);
});

app.get("/api/recipe-info", (req, res) => {
  const id = idToDisplay;
  const recipe = recipeInfo.find((recipe) => recipe.id == id);
  //console.log(recipe);
  res.json(recipe);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const setIdToDisplay = (id) => {
  idToDisplay = id;
};
