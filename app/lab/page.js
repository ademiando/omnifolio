
"use client";

import React, { useState, useEffect, useCallback } from "react";

// --- FORMATTING UTILITIES ---
const formatCurrency = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "";
  const str = num.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
};

const TrashIcon = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// ==========================================
// 1. TRADING / INVESTMENT CALCULATOR
// ==========================================
const TradingCalculator = () => {
  const [tab, setTab] = useState("average");

  const [avgEntries, setAvgEntries] = useState([
    { price: "", qty: "" },
    { price: "", qty: "" },
  ]);

  const [tradePlan, setTradePlan] = useState({
    buyPrice: "", targetPrice: "", stopLoss: "",
    qty: "100", feeBuy: "0.15", feeSell: "0.25",
  });

  const handleAvgChange = (index, field, value) => {
    const cleanValue = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    const newEntries = [...avgEntries];
    newEntries[index][field] = cleanValue;
    setAvgEntries(newEntries);
  };

  const addAvgEntry = () => setAvgEntries([...avgEntries, { price: "", qty: "" }]);
  const removeAvgEntry = (index) => setAvgEntries(avgEntries.filter((_, i) => i !== index));

  // --- Averaging Calculations ---
  let totalQty = 0;
  let totalValue = 0;
  avgEntries.forEach((entry) => {
    const p = parseFloat(entry.price) || 0;
    const q = parseFloat(entry.qty) || 0;
    totalQty += q;
    totalValue += p * q;
  });
  const averagePrice = totalQty > 0 ? totalValue / totalQty : 0;

  // --- Profit & Risk Calculations ---
  const bp = parseFloat(tradePlan.buyPrice) || 0;
  const tp = parseFloat(tradePlan.targetPrice) || 0;
  const sl = parseFloat(tradePlan.stopLoss) || 0;
  const qty = parseFloat(tradePlan.qty) || 0;
  const fb = parseFloat(tradePlan.feeBuy) / 100 || 0;
  const fs = parseFloat(tradePlan.feeSell) / 100 || 0;

  const grossCapital = bp * qty;
  const totalCapital = grossCapital + (grossCapital * fb);
  
  const grossTP = tp * qty;
  const netTP = grossTP - (grossTP * fs);
  const profitAmt = tp > 0 ? netTP - totalCapital : 0;
  const profitPct = totalCapital > 0 && tp > 0 ? (profitAmt / totalCapital) * 100 : 0;
  
  const grossSL = sl * qty;
  const netSL = grossSL - (grossSL * fs);
  const lossAmt = sl > 0 ? totalCapital - netSL : 0;
  const lossPct = totalCapital > 0 && sl > 0 ? (lossAmt / totalCapital) * 100 : 0;
  
  const rrRatio = lossAmt > 0 && profitAmt > 0 ? profitAmt / lossAmt : 0;

  return (
    <div className="flex flex-col w-full px-4 pb-8">
      {/* SUB-TABS STICKY DI BAWAH MAIN NAV */}
      <div className="sticky top-[42px] z-20 py-2 bg-black/90 backdrop-blur-xl -mx-4 px-4 border-b border-white/5">
        <div className="flex bg-zinc-900/80 p-0.5 rounded-lg border border-white/5">
          <button onClick={() => setTab("average")} className={`flex-1 py-1 text-[10px] font-semibold rounded-md transition-all duration-300 ${tab === "average" ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-gray-400 hover:text-gray-200"}`}>Averaging</button>
          <button onClick={() => setTab("pl")} className={`flex-1 py-1 text-[10px] font-semibold rounded-md transition-all duration-300 ${tab === "pl" ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-gray-400 hover:text-gray-200"}`}>Trade Plan</button>
        </div>
      </div>

      {tab === "average" && (
        <div className="flex flex-col gap-3 pt-3">
          <div className="glass-card p-5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-50"></div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Average Price</p>
            <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight whitespace-nowrap overflow-x-auto scrollbar-hide">{formatCurrency(averagePrice.toFixed(2))}</p>
            <div className="flex justify-between mt-5 text-sm border-t border-white/10 pt-4">
              <span className="text-gray-400">Capital: <span className="text-white font-medium whitespace-nowrap">{formatCurrency(totalValue.toFixed(2))}</span></span>
              <span className="text-gray-400">Units: <span className="text-white font-medium whitespace-nowrap">{formatCurrency(totalQty)}</span></span>
            </div>
          </div>

          <div className="space-y-3 mt-2">
            {avgEntries.map((entry, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="flex-1 glass-card px-4 py-2 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all">
                  <label className="text-[10px] font-medium uppercase text-gray-500">Entry {i + 1} Price</label>
                  <input type="text" inputMode="decimal" value={entry.price} onChange={(e) => handleAvgChange(i, "price", e.target.value)} className="w-full bg-transparent text-white outline-none font-medium text-lg mt-0.5 tabular-nums" placeholder="0.00" />
                </div>
                <div className="w-24 sm:w-28 glass-card px-4 py-2 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all">
                  <label className="text-[10px] font-medium uppercase text-gray-500">Qty</label>
                  <input type="text" inputMode="decimal" value={entry.qty} onChange={(e) => handleAvgChange(i, "qty", e.target.value)} className="w-full bg-transparent text-white outline-none font-medium text-lg mt-0.5 tabular-nums" placeholder="0" />
                </div>
                {i > 1 && (
                    <button onClick={() => removeAvgEntry(i)} className="p-4 text-red-400 glass-card hover:bg-red-500/20 hover:border-red-500/30 active:scale-95 transition-all flex items-center justify-center">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                )}
              </div>
            ))}
          </div>
          <button onClick={addAvgEntry} className="w-full py-4 mt-2 glass-card border-dashed border-white/20 text-gray-400 font-medium hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all">+ Add Another Entry</button>
        </div>
      )}

      {tab === "pl" && (
        <div className="flex flex-col gap-4 pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-4 focus-within:border-blue-500/50 transition-all">
              <label className="text-[10px] font-medium uppercase text-gray-500">Buy Price</label>
              <input type="text" inputMode="decimal" value={tradePlan.buyPrice} onChange={(e) => setTradePlan({ ...tradePlan, buyPrice: e.target.value.replace(/[^0-9.]/g, "") })} className="w-full bg-transparent text-white outline-none font-medium text-lg mt-1 tabular-nums" placeholder="0.00" />
            </div>
            <div className="glass-card p-4 focus-within:border-blue-500/50 transition-all">
              <label className="text-[10px] font-medium uppercase text-gray-500">Quantity</label>
              <input type="text" inputMode="decimal" value={tradePlan.qty} onChange={(e) => setTradePlan({ ...tradePlan, qty: e.target.value.replace(/[^0-9.]/g, "") })} className="w-full bg-transparent text-white outline-none font-medium text-lg mt-1 tabular-nums" placeholder="0" />
            </div>
            <div className="glass-card p-4 border-emerald-900/30 focus-within:border-emerald-500/70 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all">
              <label className="text-[10px] font-medium uppercase text-emerald-500">Target Price</label>
              <input type="text" inputMode="decimal" value={tradePlan.targetPrice} onChange={(e) => setTradePlan({ ...tradePlan, targetPrice: e.target.value.replace(/[^0-9.]/g, "") })} className="w-full bg-transparent text-emerald-400 outline-none font-medium text-lg mt-1 tabular-nums" placeholder="0.00" />
            </div>
            <div className="glass-card p-4 border-red-900/30 focus-within:border-red-500/70 focus-within:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all">
              <label className="text-[10px] font-medium uppercase text-red-500">Stop Loss</label>
              <input type="text" inputMode="decimal" value={tradePlan.stopLoss} onChange={(e) => setTradePlan({ ...tradePlan, stopLoss: e.target.value.replace(/[^0-9.]/g, "") })} className="w-full bg-transparent text-red-400 outline-none font-medium text-lg mt-1 tabular-nums" placeholder="0.00" />
            </div>
          </div>

          <div className="glass-card p-5 relative overflow-hidden group">
             <div className="flex justify-between items-end pb-4 border-b border-white/10 min-w-0">
               <div className="min-w-0 pr-2">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 mb-1">Risk / Reward</p>
                  <p className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">1 : {rrRatio ? rrRatio.toFixed(2) : "0.00"}</p>
               </div>
               <div className="text-right shrink-0 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 mb-1">Capital (+Fee)</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-200 whitespace-nowrap overflow-x-auto scrollbar-hide">{formatCurrency(totalCapital.toFixed(2))}</p>
               </div>
             </div>
             
             <div className="flex justify-between items-center pt-5 min-w-0 gap-2">
               <div className="min-w-0">
                 <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-500 mb-1">Pot. Profit</p>
                 <p className="text-lg sm:text-xl font-bold text-emerald-400 whitespace-nowrap overflow-x-auto scrollbar-hide">+{formatCurrency(profitAmt.toFixed(2))}</p>
                 <p className="text-xs font-semibold text-emerald-500/80 mt-1">+{profitPct.toFixed(2)}%</p>
               </div>
               <div className="text-right min-w-0">
                 <p className="text-[10px] font-medium uppercase tracking-wide text-red-500 mb-1">Pot. Loss</p>
                 <p className="text-lg sm:text-xl font-bold text-red-400 whitespace-nowrap overflow-x-auto scrollbar-hide">-{formatCurrency(lossAmt.toFixed(2))}</p>
                 <p className="text-xs font-semibold text-red-500/80 mt-1">-{lossPct.toFixed(2)}%</p>
               </div>
             </div>
          </div>

          <div className="flex gap-3">
             <div className="flex-1 flex justify-between items-center glass-card px-4 py-3 focus-within:border-white/30 transition-all">
                <span className="text-[11px] font-medium text-gray-400">Buy Fee %</span>
                <input type="number" step="0.01" value={tradePlan.feeBuy} onChange={(e) => setTradePlan({...tradePlan, feeBuy: e.target.value})} className="w-16 bg-transparent text-right font-medium text-white outline-none tabular-nums" />
             </div>
             <div className="flex-1 flex justify-between items-center glass-card px-4 py-3 focus-within:border-white/30 transition-all">
                <span className="text-[11px] font-medium text-gray-400">Sell Fee %</span>
                <input type="number" step="0.01" value={tradePlan.feeSell} onChange={(e) => setTradePlan({...tradePlan, feeSell: e.target.value})} className="w-16 bg-transparent text-right font-medium text-white outline-none tabular-nums" />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. SCIENTIFIC CALCULATOR COMPONENT
// ==========================================
const ScientificCalculator = () => {
  const [eq, setEq] = useState("");
  const [liveResult, setLiveResult] = useState(null);
  const [isRad, setIsRad] = useState(true);
  const [hasCalculated, setHasCalculated] = useState(false);

  const formatEquation = (equation) => {
    return equation.replace(/\d+(\.\d+)?/g, (match) => {
      const parts = match.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    });
  };

  const evaluateMath = useCallback((equation) => {
    if (!equation) return null;
    let jsExpr = equation
      .replace(/(\d|\))(?=π|e|abs|sin|cos|tan|ln|log|√|\()/g, "$1*")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**")
      .replace(/π/g, "math.PI")
      .replace(/e/g, "math.E")
      .replace(/√\(/g, "math.sqrt(")
      .replace(/abs\(/g, "math.abs(")
      .replace(/sin\(/g, "math.sin(")
      .replace(/cos\(/g, "math.cos(")
      .replace(/tan\(/g, "math.tan(")
      .replace(/ln\(/g, "math.log(")
      .replace(/log\(/g, "math.log10(");

    const openP = (jsExpr.match(/\(/g) || []).length;
    const closeP = (jsExpr.match(/\)/g) || []).length;
    for (let i = 0; i < openP - closeP; i++) jsExpr += ")";

    try {
      const math = {
        sin: (x) => (isRad ? Math.sin(x) : Math.sin((x * Math.PI) / 180)),
        cos: (x) => (isRad ? Math.cos(x) : Math.cos((x * Math.PI) / 180)),
        tan: (x) => (isRad ? Math.tan(x) : Math.tan((x * Math.PI) / 180)),
        log: Math.log10, ln: Math.log, sqrt: Math.sqrt, abs: Math.abs, PI: Math.PI, E: Math.E,
      };
      const func = new Function("math", `return ${jsExpr}`);
      const result = func(math);

      if (typeof result === "number" && !isNaN(result) && isFinite(result)) {
        return parseFloat(result.toPrecision(12));
      }
      return null;
    } catch (e) {
      return null;
    }
  }, [isRad]);

  useEffect(() => {
    setLiveResult(evaluateMath(eq));
  }, [eq, evaluateMath]);

  const handleInput = (val) => {
    if (val === "C") { setEq(""); setLiveResult(null); setHasCalculated(false); return; }
    if (val === "⌫") { 
      if (hasCalculated) { setEq(""); setHasCalculated(false); return; }
      setEq((prev) => prev.slice(0, -1)); 
      return; 
    }
    if (val === "=") {
      if (liveResult !== null) { 
        setEq(liveResult.toString()); 
        setLiveResult(null); 
        setHasCalculated(true); 
      }
      return;
    }
    if (val === "Rad" || val === "Deg") { setIsRad(!isRad); return; }
    if (val === "↔") return;

    setEq((prev) => {
      let current = prev;

      if (hasCalculated) {
        if (["+", "-", "×", "÷", "%", "x²", "xʸ", "eˣ", "^"].includes(val)) {
            current = prev; 
        } else {
            current = "";
        }
        setHasCalculated(false);
      }

      if (val === "%") {
        const lastNumMatch = current.match(/(\d+(?:\.\d+)?)$/);
        if (!lastNumMatch) return current; 
        const lastNum = parseFloat(lastNumMatch[1]);
        const preceding = current.slice(0, -lastNumMatch[1].length);

        if (/[\+\-]\s*$/.test(preceding)) {
            const exprToEval = preceding.replace(/[\+\-]\s*$/, "").trim();
            const baseVal = evaluateMath(exprToEval) || 0;
            const percentVal = baseVal * (lastNum / 100);
            const cleanVal = parseFloat(percentVal.toPrecision(12));
            return preceding + cleanVal.toString();
        }
        const cleanVal = parseFloat((lastNum / 100).toPrecision(12));
        return preceding + cleanVal.toString();
      }

      if (/[0-9]/.test(val)) {
        if (current === "0") return val;
        if (/[\+\-\×\÷\(\^]0$/.test(current)) return current.slice(0, -1) + val;
      }

      if (val === "x²") return current + "^2";
      if (val === "xʸ") return current + "^";
      if (val === "eˣ") return current + "e^";
      if (val === "1/x") return current + "1/(";
      if (val === "√") return current + "√(";
      if (val === "|x|") return current + "abs(";
      if (["sin", "cos", "tan", "ln", "log"].includes(val)) return current + val + "(";
      
      if (val === ".") {
        const lastNumMatch = current.match(/[\d.]+$/);
        if (lastNumMatch && lastNumMatch[0].includes(".")) return current;
        return current + (current.length === 0 || /[^\d]$/.test(current) ? "0." : ".");
      }
      
      if (val === "( )") {
        const openP = (current.match(/\(/g) || []).length;
        const closeP = (current.match(/\)/g) || []).length;
        if (openP > closeP && /[\d\)]$/.test(current)) return current + ")";
        return current + (current.length === 0 || /[\+\-\×\÷\(\^]$/.test(current) ? "(" : "×(");
      }
      
      if (val === "+/-") {
        const lastNumMatch = current.match(/(-?[\d.]+)$/);
        if (lastNumMatch) {
          const num = lastNumMatch[0];
          const toggled = num.startsWith("-") ? num.slice(1) : "-" + num;
          return current.slice(0, -lastNumMatch[0].length) + toggled;
        }
        return current + "(-";
      }
      
      if (["+", "-", "×", "÷"].includes(val)) {
        if (current === "") return val === "-" ? "-" : current;
        if (/[\+\-\×\÷]$/.test(current)) return current.slice(0, -1) + val;
        return current + val;
      }
      
      return current + val;
    });
  };

  const buttonRows = [
    ["↔", isRad ? "Rad" : "Deg", "√", "|x|"],
    ["sin", "cos", "tan", "π"],
    ["ln", "log", "1/x", "e"],
    ["eˣ", "x²", "xʸ", "+/-"],
    ["C", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["( )", "0", ".", "="],
  ];

  const getBtnClass = (btn) => {
    // Primary Action (Equals)
    if (btn === "=") return "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]";
    // Danger/Clear Actions
    if (btn === "C" || btn === "⌫") return "glass-card text-red-400 hover:bg-red-500/10 hover:border-red-500/30";
    // Operators
    if (["÷", "×", "-", "+", "%"].includes(btn)) return "glass-card text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30";
    // Numbers & Basics
    if (/[0-9]/.test(btn) || btn === "." || btn === "( )") return "glass-card text-white hover:bg-white/10";
    // Scientific Math Functions
    return "glass-card text-gray-400 hover:bg-white/10 hover:text-white";
  };

  return (
    <div className="flex flex-col h-full w-full px-2 pb-2">
      {/* Layar Kalkulator Fleksibel */}
      <div className="flex-1 flex flex-col justify-end px-4 pb-4 min-h-[100px]">
        <div className="text-right text-white text-4xl sm:text-[3rem] leading-tight font-light tracking-wide overflow-x-auto whitespace-nowrap mb-1 pb-1 scrollbar-hide">
          {eq ? formatEquation(eq) : ""}
        </div>
        <div className="text-right text-gray-500 text-xl sm:text-2xl h-8 tracking-wide font-light whitespace-nowrap overflow-x-auto scrollbar-hide">
          {liveResult !== null ? formatCurrency(liveResult) : ""}
        </div>
      </div>

      {/* Grid Tombol */}
      <div className="flex flex-col flex-none h-[68%] w-full max-h-[600px] gap-2 md:gap-2.5 px-2">
        {buttonRows.map((row, rIndex) => (
          <div key={rIndex} className="flex flex-1 gap-2 md:gap-2.5">
            {row.map((btn, cIndex) => (
              <button 
                key={cIndex} onClick={() => handleInput(btn)} 
                className={`flex-1 flex items-center justify-center text-[16px] sm:text-lg font-medium rounded-2xl sm:rounded-3xl transition-all duration-200 active:scale-95 active:opacity-70 ${getBtnClass(btn)}`}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN APP WRAPPER (Safe Sticky)
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState("scientific");

  return (
    <div className="w-full bg-black flex flex-col font-sans selection:bg-transparent main-background min-h-[100dvh]">
      <style>{`
        body, .main-background { background-color: #000000; }
        .glass-card { 
            background: rgba(28, 28, 32, 0.6); 
            backdrop-filter: blur(12px); 
            -webkit-backdrop-filter: blur(12px); 
            border-radius: 12px; 
            border: 1px solid rgba(255, 255, 255, 0.08); 
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* MENGGUNAKAN STICKY INTERNAL DENGAN Z-INDEX LEBIH RENDAH (z-30) 
        DAN TANPA CLASS 'fixed left-0 right-0' AGAR TETAP DI DALAM AREA KALKULATOR 
        DAN TIDAK MENUTUPI HAMBURGER MENU GLOBAL APLIKASI UTAMA ANDA.
      */}
      <div className="sticky top-0 z-30 flex justify-center pt-3 pb-2 w-full bg-black/95 backdrop-blur-md border-b border-white/5">
        <div className="flex bg-zinc-900/80 rounded-full p-0.5 border border-white/10 shadow-lg">
          <button 
            onClick={() => setActiveTab("scientific")} 
            className={`px-4 py-1.5 text-[10px] font-semibold rounded-full transition-all duration-300 ${activeTab === "scientific" ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-gray-400 hover:text-white"}`}
          >
            Calculator
          </button>
          <button 
            onClick={() => setActiveTab("trading")} 
            className={`px-4 py-1.5 text-[10px] font-semibold rounded-full transition-all duration-300 ${activeTab === "trading" ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-gray-400 hover:text-white"}`}
          >
            Trading Plan
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="flex-1 w-full max-w-md mx-auto flex flex-col relative">
        {activeTab === "scientific" ? <ScientificCalculator /> : <TradingCalculator />}
      </div>
    </div>
  );
}
