import express from "express";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import cors from "cors";
import { fileURLToPath } from "url";
import { get } from "http";

const app = express();
const port = 5001;

const corsOptions = {
  origin: ["http://localhost:3000"],
};

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "RecipeBase",
  password: "Pr1nt3xP@lms",
  port: "5432",
});

db.connect();

let idToDisplay;
let loggedInUsername = "admin";

const getLoggedInUserId = async () => {
  const result = await db.query(
    'SELECT "userId" FROM "Users" WHERE "username" = $1',
    [loggedInUsername]
  );
  if (result.rowCount > 0) {
    return result.rows[0].userId;
  }
};

let loggedInUserId = await getLoggedInUserId();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(bodyParser.json());

async function getRecipes() {
  const recipes = await db.query(
    'SELECT name, description, imagepath, "recipeId" FROM "Recipes"'
  );
  return recipes.rows;
}

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

app.post("/api/login", async (req, res) => {
  const { userId, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM "Users" WHERE username = $1', [
      userId,
    ]);
    if (result.rowCount == 0) {
      res.json({ success: false, error: "Username does not exist" });
    } else {
      if (result.rows[0].password == password) {
        loggedInUsername = userId;
        loggedInUserId = result.rows[0].userId;
        res.json({ success: true });
      } else {
        res.json({ success: false, error: "Password is incorrect" });
      }
    }
  } catch (err) {
    console.error("Error during signin:", err);
    res.status(500).send("Server Error");
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, email, birthday, password } = req.body;
  const numUsers = (await db.query('SELECT * FROM "Users"')).rowCount;

  try {
    const result = await db.query('SELECT * FROM "Users" WHERE username = $1', [
      username,
    ]);
    if (result.rowCount > 0) {
      return res.json({ success: false, error: "Username already exists" });
    }

    await db.query(
      'INSERT INTO "Users" ("userId", username, password, email, birthdate) VALUES ($1, $2, $3, $4, $5)',
      [numUsers + 1, username, password, email, birthday]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Server Error");
  }
});

app.post("/api/savedRecipes", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT "Recipes"."name", "Recipes"."description", "Recipes"."recipeId", "Recipes"."imagepath" FROM "Recipes" LEFT JOIN "Users" ON "Recipes"."recipeId" = "Users"."saved" WHERE "Users"."userId" = ${loggedInUserId};`
    );
    if (result.rowCount > 0) {
      res.json({ success: true, recipes: result.rows });
    } else {
      res.json({ success: false, recipes: null });
    }
  } catch (err) {
    console.error("Error during load:", err);
    res.status(500).json({ message: "Saved Recipes Server Error" });
  }
});

app.post("/api/userRecipes", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT "Recipes"."name", "Recipes"."description", "Recipes"."recipeId", "Recipes"."imagepath" FROM "Recipes" LEFT JOIN "Users" ON "Recipes"."userId" = "Users"."userId" WHERE "Users"."userId" = ${loggedInUserId};`
    );
    if (result.rowCount > 0) {
      res.json({ success: true, recipes: result.rows });
    } else {
      res.json({ success: false, recipes: null });
    }
  } catch (err) {
    console.error("Error during load:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await getRecipes();
    res.json(recipes);
  } catch (err) {
    console.error("Error during load:", err);
    res.status(500).send("Server Error");
  }
});

app.post("/api/recipe-id", (req, res) => {
  setIdToDisplay(req.body.recipeId);
});

app.get("/api/recipe-info", async (req, res) => {
  const id = idToDisplay;
  let ingredients, cookware, steps, comments;

  try {
    const ingredientsResults = await db.query(
      `SELECT * FROM "Ingredients" WHERE "recipeId" = ${id};`
    );

    if (ingredientsResults.rowCount > 0) {
      ingredients = ingredientsResults.rows;
    } else {
      ingredients = [];
    }
  } catch (err) {
    console.error("Ingredients failed to load:", err);
    res.status(500).send("Server Error");
  }

  try {
    const cookwareResults = await db.query(
      `SELECT * FROM "Cookware" WHERE recipeid = ${id};`
    );

    if (cookwareResults.rowCount > 0) {
      cookware = cookwareResults.rows;
    } else {
      cookware = [];
    }
  } catch (err) {
    console.error("Cookware failed to load:", err);
    res.status(500).send("Server Error");
  }

  try {
    const stepsResults = await db.query(
      `SELECT * FROM "Instructions" WHERE "recipeId" = ${id};`
    );

    if (stepsResults.rowCount > 0) {
      steps = stepsResults.rows;
    } else {
      steps = [];
    }
  } catch (err) {
    console.error("Steps failed to load:", err);
    res.status(500).send("Server Error");
  }

  try {
    const commentResult = await db.query(
      `SELECT * FROM "Ratings" LEFT JOIN "Users" ON "Users".username = "Ratings".username WHERE "recipeId" = ${id}`
    );
    if (commentResult.rowCount > 0) {
      comments = commentResult.rows;
    } else {
      comments = [];
    }
  } catch (err) {
    console.error("Comments failed to load:", err);
    res.status(500).send("Server Error");
  }

  res.json({
    ingredients: ingredients,
    steps: steps,
    cookware: cookware,
    comments: comments,
    recipeId: id,
  });
});

app.post("/api/addRecipe", async (req, res) => {
  console.log(req.body);
  const { name, description, ingredients, cookware, steps } = req.body;
  const currDate = generateDate();

  try {
    const result = await db.query(
      'INSERT INTO "Recipes" ("name", "description", "userId", "dateCreated") VALUES ($1, $2, $3, $4) RETURNING "recipeId";',
      [name, description, loggedInUserId, currDate]
    );
    const recipeId = result.rows[0].recipeId;

    for (const ingredient of ingredients) {
      await db.query(
        'INSERT INTO "Ingredients" ("recipeId", "name", "quantity") VALUES ($1, $2, $3);',
        [recipeId, ingredient, ""]
      );
    }

    for (const item of cookware) {
      await db.query(
        'INSERT INTO "Cookware" ("recipeid", "name") VALUES ($1, $2);',
        [recipeId, item]
      );
    }

    for (const step of steps) {
      await db.query(
        'INSERT INTO "Instructions" ("recipeId", "description", "stepNumber") VALUES ($1, $2, $3);',
        [recipeId, step, 0]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error during recipe submission:", err);
    res.status(500).send("Server Error");
  }
});

app.post("/api/save", async (req, res) => {
  const { recipeId } = req.body;
  const result = await db.query(
    `UPDATE "Users" SET saved = ${recipeId} WHERE "userId" = ${loggedInUserId};`
  );
});

app.post("/api/addComment", async (req, res) => {
  const { commentContent, recipeId } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO "Ratings" ("recipeId", "userId", "comment", "ratingDate", "username") VALUES ($1, $2, $3, $4, $5);',
      [recipeId, loggedInUserId, commentContent, new Date().toISOString(), loggedInUsername]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/getComments", async (req, res) => {
  const { recipeId } = req.body;
  try {
    const result = await db.query(
      'SELECT * FROM "Ratings" WHERE "recipeId" = $1',
      [recipeId]
    );
    if (result.rowCount > 0) {
      res.json({ success: true, commentData: result.rows });
    } else {
      res.json({ success: false, commentData: null });
    }
  } catch (err) {}
});

app.post("/api/deleteComment", async (req, res) => {
   const { commentId } = req.body

   try {
      const result = await db.query('SELECT "ratingId", "userId" FROM "Ratings" WHERE "ratingId" = $1;', [commentId]);
      console.log(result.rows);
      if (result.rows[0].userId === loggedInUserId) {
         await db.query('DELETE FROM "Ratings" WHERE "ratingId" = $1', [commentId]);
         res.json({"success": true});
      }
      else {
         res.json({"success": false});
      }
   } catch(err) {
      res.json({"success": false});
   }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const setIdToDisplay = (id) => {
  idToDisplay = id;
};

const generateDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // getMonth() returns 0-11
};
