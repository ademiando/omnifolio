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
    "Interactive Brokers"
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Modal Notifikasi */}
      {showNotify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl text-center shadow-2xl">
            <h3 className="text-white font-bold text-lg mb-3">Feature Preview</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              This feature is currently in development. Our team is working to bring this integration to you soon.
            </p>
            <button 
              onClick={() => setShowNotify(false)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto">
        {/* Judul diposisikan di tengah */}
        <h1 className="text-2xl font-bold mb-8 tracking-tight text-center">
          Connect Assets
        </h1>
        
        <div className="space-y-2">
          {services.map((name) => (
            <button 
              key={name}
              onClick={() => setShowNotify(true)}
              className="w-full flex items-center justify-between p-4 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-emerald-500/30 transition-all group"
            >
              <span className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors">
                {name}
              </span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                Connect
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

