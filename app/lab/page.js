"use client";

import React, { useState } from "react";

export default function App() {
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState("");
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(false); // Untuk mereset layar setelah hasil '='

  // Fungsi untuk memformat angka: titik untuk ribuan, koma untuk desimal (Format Indonesia)
  const formatDisplay = (num) => {
    if (!num && num !== 0) return "0";
    if (num === "Infinity" || num === "-Infinity" || num === "NaN") return num;

    const stringNum = num.toString();
    const parts = stringNum.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  const handleInput = (val) => {
    // Mencegah dua koma dalam satu angka
    if (val === "." && current.includes(".")) return;

    if (current === "0" && val !== ".") {
      setCurrent(val);
    } else if (overwrite) {
      setCurrent(val === "." ? "0." : val);
      setOverwrite(false);
    } else {
      setCurrent(current + val);
    }
  };

  const doMath = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return a / b;
      case "xʸ": return Math.pow(a, b);
      default: return b;
    }
  };

  const handleOperation = (op) => {
    // Jika operator ditekan berturut-turut, hitung hasil sementaranya dulu
    if (operation && previous && !overwrite) {
      const prev = parseFloat(previous);
      const curr = parseFloat(current);
      const res = doMath(prev, curr, operation);
      setPrevious(res.toString());
      setCurrent("0");
      setOperation(op);
    } else {
      setPrevious(current);
      setCurrent("0");
      setOperation(op);
    }
    setOverwrite(false);
  };

  const calculate = () => {
    if (!operation || !previous) return;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    const res = doMath(prev, curr, operation);

    setCurrent(res.toString());
    setPrevious("");
    setOperation(null);
    setOverwrite(true); // Input angka berikutnya akan menimpa hasil ini
  };

  const handleScientific = (func) => {
    const curr = parseFloat(current);
    let res = 0;
    switch (func) {
      case "sin":
        res = Math.sin((curr * Math.PI) / 180); // Dikonversi ke derajat
        break;
      case "cos":
        res = Math.cos((curr * Math.PI) / 180);
        break;
      case "tan":
        res = Math.tan((curr * Math.PI) / 180);
        break;
      case "log":
        res = Math.log10(curr);
        break;
      case "ln":
        res = Math.log(curr);
        break;
      default:
        return;
    }
    // Dibulatkan agar tidak muncul masalah floating point (misal 0.00000000016)
    res = parseFloat(res.toPrecision(10));
    setCurrent(res.toString());
    setOverwrite(true);
  };

  const handleBackspace = () => {
    if (overwrite) {
      setCurrent("0");
      setOverwrite(false);
      return;
    }
    if (current.length > 1) {
      setCurrent(current.slice(0, -1));
    } else {
      setCurrent("0");
    }
  };

  const clear = () => {
    setCurrent("0");
    setPrevious("");
    setOperation(null);
    setOverwrite(false);
  };

  const buttons = [
    ["sin", "cos", "tan", "C"],
    ["log", "ln", "xʸ", "⌫"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ",", "=", "+"]
  ];

  // Fungsi untuk memberi warna dinamis pada tombol
  const getButtonClass = (btn) => {
    if (["+", "-", "*", "/", "=", "xʸ"].includes(btn)) return "bg-orange-500 text-white hover:bg-orange-400";
    if (["C", "⌫", "sin", "cos", "tan", "log", "ln"].includes(btn)) return "bg-gray-400 text-black hover:bg-gray-300";
    return "bg-neutral-800 text-white hover:bg-neutral-700";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-[40px] p-4 pb-8 shadow-2xl">
        
        {/* Display Layar */}
        <div className="text-right p-4 mb-4 flex flex-col justify-end h-40">
          <div className="text-gray-400 text-xl h-8 mb-2">
            {previous ? `${formatDisplay(previous)} ${operation === "xʸ" ? "^" : operation}` : ""}
          </div>
          <div 
            className="text-white text-6xl font-light overflow-x-auto pb-2" 
            style={{ scrollbarWidth: "none" }}
          >
            {formatDisplay(current)}
          </div>
        </div>

        {/* Grid Tombol */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn === "C") clear();
                else if (btn === "⌫") handleBackspace();
                else if (btn === "=") calculate();
                else if (["sin", "cos", "tan", "log", "ln"].includes(btn)) handleScientific(btn);
                else if (["+", "-", "*", "/", "xʸ"].includes(btn)) handleOperation(btn);
                else if (btn === ",") handleInput(".");
                else handleInput(btn);
              }}
              className={`h-16 sm:h-20 rounded-full flex items-center justify-center text-xl font-medium transition-all active:scale-90 ${getButtonClass(btn)}`}
            >
              {btn}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

