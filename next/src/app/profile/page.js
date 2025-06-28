"use client";
import { useContext, useEffect, useState } from 'react';
import '@/styles/profile.css';
import { AuthContext } from '@/contexts/authContext';
import { api1 } from '@/services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await api1.get("/quest");
        setQuests(response.data);
      } catch (error) {
        toast.error("Could not load quests");
      }
    };
    fetchQuests();
  }, []);

  const claimQuest = async (questName) => {
    try {
      await api1.post("/quest/claim", { quest_name: questName });
      setQuests(prev =>
        prev.map(q =>
          q.quest_name === questName ? { ...q, claimed: true } : q
        )
      );
      toast.success("Quest claimed!");
    } catch (error) {
      toast.error("Failed to claim quest");
    }
  };

  return (
    <div className="profiles-container">
      <div className="profiles-header">
        <div className="profiles-info">
          <div className="avatar">
            <img src="/images/akkaphoto.jpg" alt="Avatar" />
          </div>
          <div className="details">
            <h1>{user?.username || "TreeCanFixMe"}</h1>
            <div className="badges">
              <div className="badge" id="flash">Flash Flora 🌲</div>
              <div className="badge">Intermediate Planter 🌳</div>
            </div>
            <p>Email: {user?.email || "Tree@gmail.com"}</p>
            <a href="#" className="add-bio">Add Bio</a>
          </div>
        </div>

        <div className="points">
          <h2 id="yourpoint">YOUR POINTS</h2>
          <p id="pointinc">{user?.points ?? 0} 🌞 Coins</p>
          <p>{((user?.points ?? 0) / 500).toFixed(2)} 💊 Carbon Credit</p>
        </div>
      </div>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>Buyer Name</th>
              <th>Credits Purchased</th>
              <th>Certificate Transfer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12/1/25</td>
              <td>Ae123</td>
              <td>Stark Industries</td>
              <td>2 CC</td>
              <td><div className="status transferred">Transferred</div></td>
            </tr>
            <tr>
              <td>15/1/25</td>
              <td>Re179</td>
              <td>Vel Pvt. Lt.</td>
              <td>2 CC</td>
              <td><div className="status timed-out">Timed Out</div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="quests">
        <h2 id="quest">Quests</h2>
        <p>Note: complete these challenges to get Green currency</p>

        {quests.map((q) => (
          <div className="quest" key={q.quest_name}>
            <p className="quest-text">{q.quest_name}</p>
            <p className="quest-reward">
              {q.completed ? "+10 💚" : "LOCKED"}
              {q.completed && !q.claimed && " + Reward Available"}
            </p>
            <button
              className={q.claimed ? "locked-btn" : "claim-btn"}
              onClick={() => claimQuest(q.quest_name)}
              disabled={!q.completed || q.claimed}
              style={q.claimed ? { backgroundColor: "grey" } : {}}
            >
              {q.claimed ? "Claimed" : q.completed ? "Claim" : "🔒"}
            </button>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
