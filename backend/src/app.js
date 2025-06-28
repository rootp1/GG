import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "./utils/passport.js";

import authRoute from "./routes/auth.routes.js";
import treeRoute from "./routes/trees.routes.js";
import imageRoute from "./routes/image.routes.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://greengain.onrender.com/",
  credentials: true
}));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/tree", treeRoute);
app.use("/upload", imageRoute);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
