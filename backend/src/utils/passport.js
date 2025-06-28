import passport from "passport";
import { Strategy } from "passport-local";
import supabase from "../model/userdb.js";
import bcrypt from "bcrypt";

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await supabase
        .from("users")
        .select("id, username, password, email") // ✅ include id
        .eq("username", username);
    

      if (result.data.length === 0) return cb(null, false);

      const user = result.data[0];

      bcrypt.compare(password, user.password, (err, valid) => {
        if (err) return cb(err);
        if (valid) return cb(null, user);
        return cb(null, false);
      });
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  if (!user || !user.id) {
    console.error("Serialize error — user.id is missing:", user);
    return cb(new Error("Cannot serialize user: id missing"));
  }
  cb(null, user.id); // ✅ use id instead of sno
});


passport.deserializeUser(async (id, cb) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", id)
      .single();
    if (error) return cb(error);
    cb(null, data);
  } catch (err) {
    cb(err);
  }
});


export default passport;
