"use client";
import { useState, useContext } from "react";
import Header from "@/components/header";
import HomePost from "@/components/homepost";
import { AuthContext } from "@/contexts/authContext";
import Bgimage from "@/components/bg";

export default function Home() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  return (
    <div>
      <div className="home-container">
        <div className="home-left">
          {isAuthenticated && (
            <div className="uname">👋hello {user?.fullname}!</div>
          )}

          <div className="content">
            <h1>Plant a Tree today!</h1>
            <p>
              "Planting a tree today is a step toward a better future. Trees clean
              the air, combat climate change, and create habitats for wildlife.
              They stand as symbols of hope, offering beauty and shade while
              fostering life for generations to come."
            </p>
          </div>
          <div className="content">
            <h1>About Us!</h1>
            <p>
              "We are a platform that turns tree planting into an exciting and
              rewarding experience. By gamifying environmental action, we let
              users earn points for every tree planted, which can later be
              converted into carbon credits. Together, we make sustainability fun,
              impactful, and rewarding for everyone!"
            </p>
          </div>
        </div>
        <div className="home-right">
          <h2 id="posthead">Posts</h2>
          <div className="Post-container">
            <HomePost
              username="Niki"
              uid="nk124345"
              desc="Planted this tree today!"
            />
            <HomePost
              username="Niki"
              uid="nk124345"
              desc="Planted this tree today!"
            />
            <HomePost
              username="Niki"
              uid="nk124345"
              desc="Planted this tree today!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
