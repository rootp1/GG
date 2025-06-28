import bcrypt from "bcrypt";
import supabase from "../models/user.model.js";
import passport from "passport";

export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const checkResult = await supabase
      .from("users")
      .select()
      .eq("username", username);

    if (checkResult.error) {
      return res.status(500).json({ message: "Database error while checking user" });
    }

    if (checkResult.data && checkResult.data.length > 0) {
      return res.status(409).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertResult = await supabase
      .from("users")
      .insert({ email, username, password: hashedPassword });

    if (insertResult.error) {
      return res.status(500).json({ message: "Error inserting user" });
    }

    const userFetch = await supabase
      .from("users")
      .select()
      .eq("username", username);

    if (userFetch.error || !userFetch.data || userFetch.data.length === 0) {
      return res.status(500).json({ message: "Failed to retrieve user after registration" });
    }

    const user = userFetch.data[0];

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging in after registration" });
      }
      return res.status(200).json({ message: "User logged in and registered", user: req.user });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(409).json({ message: "User invalid" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "User logged in ", user: req.user });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ status: "logout" });
  });
};

export const checkauth = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ authenticated: true, message: "User is authenticated", user: req.user });
  } else {
    return res.status(401).json({ authenticated: false, message: "User is not authenticated" });
  }
};
