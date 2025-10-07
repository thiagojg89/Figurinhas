import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function FigurinhaApp() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState("");
  const [possui, setPossui] = useState("");
  const [falta, setFalta] = useState("");
  const [repetidas, setRepetidas] = useState("");
  const [trocas, setTrocas] = useState([]);

  const adicionarPessoa = () => {
    if (!nome) return;
    const novaPessoa = {
      nome,
      possui: possui ? possui.split(",").map((x) => x.trim()) : [],
      falta: falta ? falta.split(",").map((x) => x.trim()) : [],
      repetidas: repetidas ? repetidas.split(",").map((x) => x.trim()) : [],
    };
    setPessoas([...pessoas, novaPessoa]);
    setNome("");
    setPossui("");
    setFalta("");
    setRepetidas("");
  };

  const calcularTrocas = () => {
    let listaTrocas = [];
    pessoas.forEach((p1) => {
      pessoas.forEach((p2) => {
        if (p1.nome !== p2.nome) {
          p1.repetidas.forEach((fig) => {
            if (p2.falta.includes(fig)) {
              listaTrocas.push(`${p1.nome} → ${p2.nome}: figurinha ${fig}`);
            }
          });
        }
      });
    });
    setTrocas(listaTrocas);
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <motion.h1
        className="text-2xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Trocas de Figurinhas
      </motion.h1>

      {/* Cadastro de pessoas */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4 space-y-3">
          <Input
            className="text-lg"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            className="text-lg"
            placeholder="Possui (ex: 1,2,3)"
            value={possui}
            onChange={(e) => setPossui(e.target.value)}
          />
          <Input
            className="text-lg"
            placeholder="Falta (ex: 4,5,6)"
            value={falta}
            onChange={(e) => setFalta(e.target.value)}
          />
          <Input
            className="text-lg"
            placeholder="Repetidas (ex: 2,7,9)"
            value={repetidas}
            onChange={(e) => setRepetidas(e.target.value)}
          />
          <Button className="w-full text-lg py-6" onClick={adicionarPessoa}>
            Adicionar Pessoa
          </Button>
        </CardContent>
      </Card>

      {/* Trocas */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4 space-y-3">
          <Button className="w-full text-lg py-6" onClick={calcularTrocas}>
            Calcular Trocas
          </Button>
          <ul className="mt-2 space-y-2">
            {trocas.length === 0 && (
              <li className="text-sm text-center text-gray-400">Nenhuma troca encontrada</li>
            )}
            {trocas.map((t, i) => (
              <li
                key={i}
                className="text-sm bg-gray-800 text-white px-3 py-2 rounded-lg"
              >
                {t}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Lista de pessoas */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-4">
          <h2 className="font-semibold text-lg mb-2 text-center">Pessoas cadastradas</h2>
          <ul className="space-y-2">
            {pessoas.map((p, i) => (
              <li
                key={i}
                className="text-sm bg-gray-700 text-white p-3 rounded-lg"
              >
                <strong>{p.nome}</strong>
                <br />
                <span className="text-xs">Possui: {p.possui.join(", ") || "-"}</span>
                <br />
                <span className="text-xs">Falta: {p.falta.join(", ") || "-"}</span>
                <br />
                <span className="text-xs">Repetidas: {p.repetidas.join(", ") || "-"}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
