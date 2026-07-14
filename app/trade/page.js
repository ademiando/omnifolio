"use client";

import React, { useState } from "react";

export default function TradePage() {
  const [showNotify, setShowNotify] = useState(false);

  const services = [
    "MetaMask", 
    "Binance", 
    "Ajaib", 
    "Stockbit", 
    "Coinbase", 
    "Interactive Brokers",
    "Tokocrypto",
    "Pintu",
    "Bibit",
    "Bareksa"
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Modal Notifikasi */}
      {showNotify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl text-center shadow-2xl">
            <h3 className="text-white font-bold text-sm mb-2">Feature Preview</h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">
              This feature is currently in development. Our team is working to bring this integration to you soon.
            </p>
            <button 
              onClick={() => setShowNotify(false)}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg text-xs transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header Sticky */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md pt-5 pb-3 px-6 border-b border-white/5">
        <h1 className="text-lg font-bold tracking-tight text-center">
          Connect Assets
        </h1>
      </div>

      {/* List */}
      <div className="max-w-md mx-auto p-4 space-y-2">
        {services.map((name) => (
          <button 
            key={name}
            onClick={() => setShowNotify(true)}
            className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] border border-white/5 rounded-lg hover:border-emerald-500/30 transition-all group"
          >
            <span className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">
              {name}
            </span>
            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
              Connect
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

