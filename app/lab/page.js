
"use client";

import React, { useState, useMemo } from "react";

/* ===================== Komponen Utama ===================== */
export default function App() {
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState("");
  const [operation, setOperation] = useState(null);

  // Fungsi untuk memformat angka dengan pemisah ribuan
  const formatDisplay = (num) => {
    if (!num) return "0";
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  const handleInput = (val) => {
    if (current === "0" && val !== ".") {
      setCurrent(val);
    } else {
      setCurrent(current + val);
    }
  };

  const handleOperation = (op) => {
    setPrevious(current);
    setCurrent("0");
    setOperation(op);
  };

  const calculate = () => {
    let res;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    
    switch (operation) {
      case "+": res = prev + curr; break;
      case "-": res = prev - curr; break;
      case "*": res = prev * curr; break;
      case "/": res = prev / curr; break;
      default: return;
    }
    setCurrent(res.toString());
    setPrevious("");
    setOperation(null);
  };

  const clear = () => { setCurrent("0"); setPrevious(""); setOperation(null); };

  const buttons = [
    ["sin", "cos", "tan", "C"],
    ["log", "ln", "xʸ", "⌫"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ",", "=", "+"]
  ];

  return (
    <div className="min-h-screen bg-black flex items-end justify-center p-4">
      <div className="w-full max-w-sm pb-8">
        {/* Display */}
        <div className="text-right p-6 mb-2">
          <div className="text-gray-500 text-lg h-8">{previous} {operation}</div>
          <div className="text-white text-6xl font-light overflow-x-auto">
            {formatDisplay(current)}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn === "C") clear();
                else if (btn === "=") calculate();
                else if (["+", "-", "*", "/"].includes(btn)) handleOperation(btn);
                else if (btn === ",") handleInput(".");
                else handleInput(btn);
              }}
              className={`h-20 w-20 rounded-full flex items-center justify-center text-xl font-medium transition-all
                ${["+", "-", "*", "/", "="].includes(btn) ? "bg-orange-500 text-white" : "bg-[#1c1c1c] text-white hover:bg-[#333]"}`}
            >
              {btn === "." ? "," : btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
