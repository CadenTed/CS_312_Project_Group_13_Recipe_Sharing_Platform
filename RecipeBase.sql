-- Database: RecipeBase

-- DROP DATABASE IF EXISTS "RecipeBase";

CREATE DATABASE "RecipeBase"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    "userId" integer NOT NULL DEFAULT nextval('"Users_userId_seq"'::regclass),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    "firstName" text COLLATE pg_catalog."default" NOT NULL,
    "lastName" text COLLATE pg_catalog."default",
    "profilePicPath" text COLLATE pg_catalog."default",
    birthdate date NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;

-- Table: public.Recipes

-- DROP TABLE IF EXISTS public."Recipes";

CREATE TABLE IF NOT EXISTS public."Recipes"
(
    "recipeId" integer NOT NULL DEFAULT nextval('"Recipes_recipeId_seq"'::regclass),
    "recipeUserId" integer NOT NULL DEFAULT nextval('"Recipes_recipeUserId_seq"'::regclass),
    "dateCreated" date NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    "prepTime" integer,
    "cookTime" integer,
    servings double precision,
    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("recipeId"),
    CONSTRAINT "Recipes_recipeUserId_fkey" FOREIGN KEY ("recipeUserId")
        REFERENCES public."Users" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Recipes"
    OWNER to postgres;

-- Table: public.Ingredients

-- DROP TABLE IF EXISTS public."Ingredients";

CREATE TABLE IF NOT EXISTS public."Ingredients"
(
    "ingredientId" integer NOT NULL DEFAULT nextval('"Ingredients_ingredientId_seq"'::regclass),
    "recipeId" integer NOT NULL DEFAULT nextval('"Ingredients_recipeId_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    quantity character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("ingredientId"),
    CONSTRAINT "Ingredients_recipeId_fkey" FOREIGN KEY ("recipeId")
        REFERENCES public."Recipes" ("recipeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Ingredients"
    OWNER to postgres;

-- Table: public.Instructions

-- DROP TABLE IF EXISTS public."Instructions";

CREATE TABLE IF NOT EXISTS public."Instructions"
(
    "instructionId" integer NOT NULL DEFAULT nextval('"Instructions_instructionId_seq"'::regclass),
    "recipeId" integer NOT NULL DEFAULT nextval('"Instructions_recipeId_seq"'::regclass),
    "stepNumber" integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("instructionId"),
    CONSTRAINT "Instructions_recipeId_fkey" FOREIGN KEY ("recipeId")
        REFERENCES public."Recipes" ("recipeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Instructions"
    OWNER to postgres;

-- Table: public.Ratings

-- DROP TABLE IF EXISTS public."Ratings";

CREATE TABLE IF NOT EXISTS public."Ratings"
(
    "ratingId" integer NOT NULL DEFAULT nextval('"Ratings_ratingId_seq"'::regclass),
    "recipeId" integer NOT NULL DEFAULT nextval('"Ratings_recipeId_seq"'::regclass),
    "userId" integer NOT NULL DEFAULT nextval('"Ratings_userId_seq"'::regclass),
    rating integer NOT NULL,
    comment text COLLATE pg_catalog."default",
    "ratingDate" date NOT NULL,
    CONSTRAINT "Ratings_pkey" PRIMARY KEY ("ratingId"),
    CONSTRAINT "Ratings_recipeId_fkey" FOREIGN KEY ("recipeId")
        REFERENCES public."Recipes" ("recipeId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Ratings_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."Users" ("userId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Ratings"
    OWNER to postgres;