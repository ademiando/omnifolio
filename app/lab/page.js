"use client";

import React, { useState, useEffect, useCallback } from "react";

// --- FORMATTING UTILITIES (US Standard for Finance) ---
const formatCurrency = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "";
  const str = num.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
};

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
    // Only allow numbers and max one decimal dot
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
    <div className="flex flex-col h-full w-full bg-[#121212] p-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="flex bg-[#1c1d22] rounded-xl p-1 mb-4 shrink-0">
        <button onClick={() => setTab("average")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === "average" ? "bg-blue-600 text-white" : "text-gray-400"}`}>Averaging</button>
        <button onClick={() => setTab("pl")} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === "pl" ? "bg-blue-600 text-white" : "text-gray-400"}`}>Trade Plan</button>
      </div>

      {tab === "average" && (
        <div className="flex flex-col gap-3 pb-8">
          <div className="bg-[#1c1d22] p-4 rounded-xl shadow-sm border border-gray-800/50">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Average Price</p>
            <p className="text-3xl font-semibold text-white">{formatCurrency(averagePrice.toFixed(2))}</p>
            <div className="flex justify-between mt-4 text-sm border-t border-gray-700/50 pt-3">
              <span className="text-gray-400">Capital: <span className="text-white font-medium">{formatCurrency(totalValue.toFixed(2))}</span></span>
              <span className="text-gray-400">Qty/Units: <span className="text-white font-medium">{formatCurrency(totalQty)}</span></span>
            </div>
          </div>
          <div className="space-y-3 mt-1">
            {avgEntries.map((entry, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="flex-1 bg-[#1c1d22] rounded-xl px-3 py-2 border border-transparent focus-within:border-gray-600 transition-colors">
                  <label className="text-[10px] font-medium uppercase text-gray-500">Entry {i + 1} Price</label>
                  <input type="text" inputMode="decimal" value={entry.price} onChange={(e) => handleAvgChange(i, "price", e.target.value)} className="w-full bg-transparent text-white outline-none font-medium text-lg mt-0.5" placeholder="0.00" />
                </div>
                <div className="w-24 bg-[#1c1d22] rounded-xl px-3 py-2 border border-transparent focus-within:border-gray-600 transition-colors">
                  <label className="text-[10px] font-medium uppercase text-gray-500">Qty</label>
                  <input type="text" inputMode="decimal" value={entry.qty} onChange={(e) => handleAvgChange(i, "qty", e.target.value)} className="w-full bg-transparent text-white outline-none font-medium text-lg mt-0.5" placeholder="0" />
                </div>
                {i > 1 && <button onClick={() => removeAvgEntry(i)} className="p-3.5 text-red-500 bg-[#1c1d22] rounded-xl hover:bg-red-500/20 active:scale-95 transition-all">✕</button>}
              </div>
            ))}
          </div>
          <button onClick={addAvgEntry} className="w-full py-3.5 mt-2 border border-dashed border-gray-600 text-gray-400 font-medium rounded-xl hover:bg-[#1c1d22] hover:text-white transition-colors">+ Add Entry</button>
        </div>
      )}

      {tab === "pl" && (
        <div className="flex flex-col gap-4 pb-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1c1d22] p-3 rounded-xl border border-transparent focus-within:border-gray-600">
              <label className="text-[10px] font-medium uppercase text-gray-500">Buy Price</label>
              <input type="text" inputMode="decimal" value={tradePlan.buyPrice} onChange={(e) => setTradePlan({ ...tradePlan, buyPrice: e.target.value.replace(/[^0-9.]/g, "") })} className="w-full bg-transparent text-white outline-none font-medium text-lg mt-1" placeholder="0.00" />
            </div>
            <div className="bg-[#1c1d22] p-3 rounded-xl border border-transparent focus-within:border-gray-600">
              <label className="text-[10px] font-medium uppercase text-gray-500">Quantity</label>
              <input type="text" inputMode="decimal" value={tradePlan.qty} onChange={(e) => setTradePlan({ ...tradePlan, qty: e.target.value.replace(/[^0-9.]/g, "") })} className="w-full bg-transparent text-white outline-none font-medium text-lg mt-1" placeholder="0" />
            </div>
            <div className="bg-[#1c1d22] p-3 rounded-xl border border-green-900/30 focus-within:border-green-500/50">
              <label className="text-[10px] font-medium uppercase text-green-500">Target Price</label>
              <input type="text" inputMode="decimal" value={tradePlan.targetPrice} onChange={(e) => setTradePlan({ ...tradePlan, targetPrice: e.target.value.replace(/[^0-9.]/g, "") })} className="w-full bg-transparent text-green-400 outline-none font-medium text-lg mt-1" placeholder="0.00" />
            </div>
            <div className="bg-[#1c1d22] p-3 rounded-xl border border-red-900/30 focus-within:border-red-500/50">
              <label className="text-[10px] font-medium uppercase text-red-500">Stop Loss</label>
              <input type="text" inputMode="decimal" value={tradePlan.stopLoss} onChange={(e) => setTradePlan({ ...tradePlan, stopLoss: e.target.value.replace(/[^0-9.]/g, "") })} className="w-full bg-transparent text-red-400 outline-none font-medium text-lg mt-1" placeholder="0.00" />
            </div>
          </div>

          <div className="bg-[#1c1d22] p-4 rounded-xl shadow-sm border border-gray-800/50">
             <div className="flex justify-between items-end pb-4 border-b border-gray-700/50">
               <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 mb-1">Risk / Reward Ratio</p>
                  <p className="text-2xl font-semibold text-white">1 : {rrRatio ? rrRatio.toFixed(2) : "0.00"}</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 mb-1">Capital (+Fee)</p>
                  <p className="text-base font-medium text-gray-300">{formatCurrency(totalCapital.toFixed(2))}</p>
               </div>
             </div>
             <div className="flex justify-between items-center pt-4">
               <div>
                 <p className="text-[10px] font-medium uppercase tracking-wide text-green-500 mb-1">Pot. Profit</p>
                 <p className="text-xl font-semibold text-green-400">+{formatCurrency(profitAmt.toFixed(2))}</p>
                 <p className="text-xs text-green-500 mt-0.5">+{profitPct.toFixed(2)}%</p>
               </div>
               <div className="text-right">
                 <p className="text-[10px] font-medium uppercase tracking-wide text-red-500 mb-1">Pot. Loss</p>
                 <p className="text-xl font-semibold text-red-400">-{formatCurrency(lossAmt.toFixed(2))}</p>
                 <p className="text-xs text-red-500 mt-0.5">-{lossPct.toFixed(2)}%</p>
               </div>
             </div>
          </div>

          <div className="flex gap-3">
             <div className="flex-1 flex justify-between items-center bg-[#1c1d22] px-3 py-2.5 rounded-lg border border-transparent focus-within:border-gray-600">
                <span className="text-[11px] font-medium text-gray-500">Buy Fee %</span>
                <input type="number" step="0.01" value={tradePlan.feeBuy} onChange={(e) => setTradePlan({...tradePlan, feeBuy: e.target.value})} className="w-14 bg-transparent text-right font-medium text-white outline-none" />
             </div>
             <div className="flex-1 flex justify-between items-center bg-[#1c1d22] px-3 py-2.5 rounded-lg border border-transparent focus-within:border-gray-600">
                <span className="text-[11px] font-medium text-gray-500">Sell Fee %</span>
                <input type="number" step="0.01" value={tradePlan.feeSell} onChange={(e) => setTradePlan({...tradePlan, feeSell: e.target.value})} className="w-14 bg-transparent text-right font-medium text-white outline-none" />
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
  const [hasCalculated, setHasCalculated] = useState(false); // Kunci logika reset layar

  const formatEquation = (equation) => {
    return equation.replace(/\d+(\.\d+)?/g, (match) => {
      const parts = match.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    });
  };

  // Evaluator Math Tahan Banting (Safe Eval)
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

    // Auto-close open parentheses
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

      // Pastikan hasil valid (bukan NaN / Infinity string yang merusak)
      if (typeof result === "number" && !isNaN(result) && isFinite(result)) {
        return parseFloat(result.toPrecision(12));
      }
      return null;
    } catch (e) {
      return null; // Abaikan error jika rumus masih gantung saat diketik (misal "5 + ")
    }
  }, [isRad]);

  // Update Live Result secara real-time
  useEffect(() => {
    setLiveResult(evaluateMath(eq));
  }, [eq, evaluateMath]);

  const handleInput = (val) => {
    // Tombol Fungsionalitas Dasar
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
        setHasCalculated(true); // Tandai bahwa hitungan selesai
      }
      return;
    }
    if (val === "Rad" || val === "Deg") { setIsRad(!isRad); return; }
    if (val === "↔") return;

    setEq((prev) => {
      let current = prev;

      // LOGIKA RESET LAYAR JIKA SEHABIS TEKAN '='
      if (hasCalculated) {
        // Jika menekan operator (+, -, dsb), sambung hasilnya. Jika mengetik angka baru, reset layarnya.
        if (["+", "-", "×", "÷", "%", "x²", "xʸ", "eˣ", "^"].includes(val)) {
            current = prev; 
        } else {
            current = "";
        }
        setHasCalculated(false);
      }

      // LOGIKA PERSENTASE (%) AKURAT SEPERTI KALKULATOR ASLI
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

      // Input Angka (Mencegah Leading Zero "0005" atau "+ 05")
      if (/[0-9]/.test(val)) {
        if (current === "0") return val;
        if (/[\+\-\×\÷\(\^]0$/.test(current)) return current.slice(0, -1) + val;
      }

      // Mapping Spesial
      if (val === "x²") return current + "^2";
      if (val === "xʸ") return current + "^";
      if (val === "eˣ") return current + "e^";
      if (val === "1/x") return current + "1/(";
      if (val === "√") return current + "√(";
      if (val === "|x|") return current + "abs(";
      if (["sin", "cos", "tan", "ln", "log"].includes(val)) return current + val + "(";
      
      // Pencegahan Koma/Titik Ganda
      if (val === ".") {
        const lastNumMatch = current.match(/[\d.]+$/);
        if (lastNumMatch && lastNumMatch[0].includes(".")) return current;
        return current + (current.length === 0 || /[^\d]$/.test(current) ? "0." : ".");
      }
      
      // Tanda Kurung Pintar
      if (val === "( )") {
        const openP = (current.match(/\(/g) || []).length;
        const closeP = (current.match(/\)/g) || []).length;
        if (openP > closeP && /[\d\)]$/.test(current)) return current + ")";
        return current + (current.length === 0 || /[\+\-\×\÷\(\^]$/.test(current) ? "(" : "×(");
      }
      
      // Toggle Positif/Negatif
      if (val === "+/-") {
        const lastNumMatch = current.match(/(-?[\d.]+)$/);
        if (lastNumMatch) {
          const num = lastNumMatch[0];
          const toggled = num.startsWith("-") ? num.slice(1) : "-" + num;
          return current.slice(0, -lastNumMatch[0].length) + toggled;
        }
        return current + "(-";
      }
      
      // Penumpukan Operator (Timpa operator jika diketik beruntun, misal + lalu x)
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
    if (btn === "=") return "bg-blue-600 text-white hover:bg-blue-500 shadow-md";
    if (btn === "C" || btn === "⌫") return "bg-[#1c1d22] text-red-500 hover:bg-[#2b2d35]";
    if (["÷", "×", "-", "+", "%"].includes(btn)) return "bg-[#1c1d22] text-gray-200 hover:bg-[#2b2d35]";
    if (/[0-9]/.test(btn) || btn === "." || btn === "( )") return "bg-[#1c1d22] text-white hover:bg-[#2b2d35]";
    return "bg-[#1c1d22] text-gray-400 hover:bg-[#2b2d35]";
  };

  return (
    <div className="flex flex-col h-full w-full px-2 pb-2">
      {/* Layar Kalkulator Fleksibel (Ambil sisa ruang) */}
      <div className="flex-1 flex flex-col justify-end px-3 pb-3 min-h-[100px]">
        <div className="text-right text-white text-4xl sm:text-[2.75rem] leading-none font-light tracking-wide overflow-x-auto whitespace-nowrap mb-1 pb-1" style={{ scrollbarWidth: "none" }}>
          {eq ? formatEquation(eq) : ""}
        </div>
        <div className="text-right text-gray-500 text-xl sm:text-2xl h-8 tracking-wide font-light">
          {liveResult !== null ? formatCurrency(liveResult) : ""}
        </div>
      </div>

      {/* Grid Tombol (Tingginya dikunci dinamis agar fit di HP tanpa scroll) */}
      <div className="flex flex-col flex-none h-[68%] w-full max-h-[580px] gap-[6px] md:gap-2">
        {buttonRows.map((row, rIndex) => (
          <div key={rIndex} className="flex flex-1 gap-[6px] md:gap-2">
            {row.map((btn, cIndex) => (
              <button 
                key={cIndex} onClick={() => handleInput(btn)} 
                className={`flex-1 flex items-center justify-center text-[16px] sm:text-[17px] font-medium rounded-2xl transition-all active:scale-95 active:opacity-70 ${getBtnClass(btn)}`}
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
// 3. MAIN APP WRAPPER (100dvh enforced)
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState("scientific");

  return (
    // 'h-[100dvh]' memastikan tinggi div sama persis dengan tinggi layar viewport (terutama di iOS/Android)
    <div className="h-[100dvh] w-full bg-black flex flex-col font-sans selection:bg-transparent overflow-hidden">
      <div className="w-full max-w-md mx-auto h-full flex flex-col relative">
        
        {/* Navigasi Toggle */}
        <div className="flex justify-center pt-5 pb-3 w-full px-4 shrink-0">
          <div className="flex bg-[#1c1d22] rounded-full p-1 border border-gray-800 w-full shadow-sm">
            <button onClick={() => setActiveTab("scientific")} className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all ${activeTab === "scientific" ? "bg-[#32343d] text-white shadow" : "text-gray-500 hover:text-gray-300"}`}>
              Calculator
            </button>
            <button onClick={() => setActiveTab("trading")} className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all ${activeTab === "trading" ? "bg-[#32343d] text-white shadow" : "text-gray-500 hover:text-gray-300"}`}>
              Trading Plan
            </button>
          </div>
        </div>

        {/* Konten (Kalkulator) */}
        <div className="flex-1 overflow-hidden min-h-0">
          {activeTab === "scientific" ? <ScientificCalculator /> : <TradingCalculator />}
        </div>

      </div>
    </div>
  );
}


