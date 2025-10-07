import React, { useState } from "react";

export default function App() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [have, setHave] = useState("");
  const [need, setNeed] = useState("");
  const [dupes, setDupes] = useState("");
  const [trades, setTrades] = useState([]);

  const addMember = () => {
    if (!name.trim()) return;
    setMembers([
      ...members,
      {
        name,
        have: have.split(",").map((s) => s.trim()).filter(Boolean),
        need: need.split(",").map((s) => s.trim()).filter(Boolean),
        dupes: dupes.split(",").map((s) => s.trim()).filter(Boolean),
      },
    ]);
    setName("");
    setHave("");
    setNeed("");
    setDupes("");
  };

  const calculateTrades = () => {
    let results = [];
    for (let i = 0; i < members.length; i++) {
      for (let j = 0; j < members.length; j++) {
        if (i !== j) {
          const giver = members[i];
          const receiver = members[j];
          const possible = giver.dupes.filter((f) => receiver.need.includes(f));
          if (possible.length > 0) {
            results.push(
              `${giver.name} pode dar ${possible.join(", ")} para ${receiver.name}`
            );
          }
        }
      }
    }
    setTrades(results);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#121212",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px"
    }}>
      <h1 style={{ marginBottom: "20px" }}>📒 Figurinha App</h1>

      <div style={{
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        width: "100%",
        maxWidth: "400px"
      }}>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Possui (ex: 1, 2, 3)"
          value={have}
          onChange={(e) => setHave(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Precisa (ex: 4, 5, 6)"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Repetidas (ex: 7, 8)"
          value={dupes}
          onChange={(e) => setDupes(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addMember} style={buttonStyle}>
          ➕ Adicionar
        </button>
      </div>

      <button onClick={calculateTrades} style={buttonStyle}>
        🔄 Calcular Trocas
      </button>

      <div style={{ marginTop: "20px", maxWidth: "600px" }}>
        <h2>Resultados</h2>
        {trades.length === 0 && <p>Nenhuma troca calculada ainda.</p>}
        <ul>
          {trades.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "5px 0",
  borderRadius: "8px",
  border: "none",
  outline: "none"
};

const buttonStyle = {
  background: "#0070f3",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px"
};

