"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ===================== Icons (Modern & Professional) ===================== */
const UserAvatar = () => (<svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#374151"></circle><path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#9CA3AF"></path></svg>);
const MoreVerticalIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>);
const ArrowRightIconSimple = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>);
const TrashIcon = ({className}) => (<svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>);
const ArrowUpIcon = ({className}) => <svg className={className} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/></svg>;
const ArrowDownIcon = ({className}) => <svg className={className} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/></svg>;
const InfoIcon = ({className}) => <svg className={className} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>;
const FullscreenIcon = ({className}) => (<svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>);
const ExitFullscreenIcon = ({ className }) => (<svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 0-2-2h-3M3 16h3a2 2 0 0 0 2 2v3"/></svg>);
const PencilIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>);
const AvgProfitIcon = ({className}) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>;
const AvgLossIcon = ({className}) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v10"/><path d="M18 4v16"/><path d="M6 4v8"/></svg>;
const SearchIcon = (props) => (<svg {...props} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" ><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const StarIcon = ({ isFilled, ...props }) => (<svg {...props} width="20" height="20" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);

// Sector Allocation Icons
const WalletIcon = ({className}) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>);
const TrendingUpIcon = ({className}) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>);
const BuildingIcon = ({className}) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>);
const CryptoIcon = ({className}) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 19 9 12 22 5 9 12 2"></polygon><polyline points="5 9 12 13 19 9"></polyline><line x1="12" y1="2" x2="12" y2="22"></line></svg>);

/* ===================== Config & Helpers ===================== */
const COINGECKO_API = "https://api.coingecko.com/api/v3";
const TV_SEARCH_API = (q) => `https://symbol-search.tradingview.com/symbol_search/v3/?text=${encodeURIComponent(q)}&hl=1&exchange=&type=stock,fund,dr,index&lang=en`;
const COINGECKO_MARKETS = (ids) => `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(ids)}&price_change_percentage=24h`;

const getYahooSymbol = (symbol, exchange, country) => {
    if (exchange === 'IDX' || country === 'ID') return `${symbol}.JK`;
    if (exchange === 'NSE' || exchange === 'BSE') return `${symbol}.${exchange === 'NSE' ? 'NS' : 'BO'}`;
    if (country === 'GB' && exchange === 'LSE') return `${symbol}.L`;
    if (country === 'CA') return `${symbol}.TO`;
    if (country === 'AU') return `${symbol}.AX`;
    if (country === 'HK') return `${symbol}.HK`;
    if (country === 'SG') return `${symbol}.SI`;
    if (country === 'MY') return `${symbol}.KL`;
    if (country === 'TH') return `${symbol}.BK`;
    if (country === 'TW') return `${symbol}.TW`;
    if (exchange === 'MOEX') return `${symbol}.ME`;
    return symbol; 
};

const isBrowser = typeof window !== "undefined";
const toNum = (v) => { const n = Number(String(v).replace(/,/g, '').replace(/\s/g,'')); return isNaN(n) ? 0 : n; };

// Fast fetcher
const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
};

const safeGetStorage = (key, fallback) => {
    if (!isBrowser) return fallback;
    try { const val = localStorage.getItem(key); return val !== null ? val : fallback; } 
    catch (e) { return fallback; }
};
const safeSetStorage = (key, value) => {
    if (!isBrowser) return;
    try { localStorage.setItem(key, value); } catch (e) {}
};
const safeRemoveStorage = (key) => {
    if (!isBrowser) return;
    try { localStorage.removeItem(key); } catch (e) {}
};

function formatCurrency(value, valueIsUSD, displaySymbol, usdIdr) {
  if (value === null || typeof value === 'undefined' || isNaN(Number(value))) { return displaySymbol === '$' ? '$0.00' : 'Rp 0'; }
  let displayValue = valueIsUSD ? value : (displaySymbol === '$' ? value / usdIdr : value);
  if (!valueIsUSD && displaySymbol !== '$') displayValue = value; 
  if (valueIsUSD && displaySymbol !== '$') displayValue = value * usdIdr; 

  const absNum = Math.abs(displayValue);
  const isRupiah = displaySymbol !== '$';
  const sign = displayValue < 0 ? '-' : '';
  const prefix = isRupiah ? 'Rp ' : '$';

  if (absNum >= 1e12) {
      const numStr = parseFloat((absNum / 1e12).toFixed(2)).toString();
      return `${sign}${prefix}${isRupiah ? numStr.replace('.', ',') : numStr} T`;
  } else if (absNum >= 10e9) {
      const numStr = parseFloat((absNum / 1e9).toFixed(2)).toString();
      return `${sign}${prefix}${isRupiah ? numStr.replace('.', ',') : numStr} B`;
  }

  if (isRupiah) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(displayValue);
  } else {
      let options = { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 };
      if (absNum > 0 && absNum < 1) { options.minimumFractionDigits = 4; options.maximumFractionDigits = 4; }
      return new Intl.NumberFormat('en-US', options).format(displayValue);
  }
}

function formatCurrencyShort(value, valueIsUSD, displaySymbol, usdIdr) {
  return formatCurrency(value, valueIsUSD, displaySymbol, usdIdr);
}

function formatCurrencyCompact(value, valueIsUSD, displaySymbol, usdIdr) {
  if (value === null || typeof value === 'undefined' || isNaN(Number(value))) return displaySymbol === '$' ? '$0.00' : 'Rp 0';
  let displayValue = valueIsUSD ? value : (displaySymbol === '$' ? value / usdIdr : value);
  if (!valueIsUSD && displaySymbol !== '$') displayValue = value; 
  if (valueIsUSD && displaySymbol !== '$') displayValue = value * usdIdr; 

  const absNum = Math.abs(displayValue);
  const isRupiah = displaySymbol !== '$';
  const sign = displayValue < 0 ? '-' : '';
  const prefix = isRupiah ? 'Rp ' : '$';

  const formatNum = (num, divisor) => {
      let str = (num / divisor).toFixed(2);
      str = parseFloat(str).toString(); 
      return isRupiah ? str.replace('.', ',') : str;
  };

  if (absNum >= 1e12) return `${sign}${prefix}${formatNum(absNum, 1e12)} T`;
  if (absNum >= 1e9)  return `${sign}${prefix}${formatNum(absNum, 1e9)} B`;
  if (absNum >= 1e6)  return `${sign}${prefix}${formatNum(absNum, 1e6)} M`;
  if (absNum >= 1e3)  return `${sign}${prefix}${formatNum(absNum, 1e3)} K`;
  
  return formatCurrency(value, valueIsUSD, displaySymbol, usdIdr); 
}

function formatCurrencyCompactNoSymbol(value, valueIsUSD, displaySymbol, usdIdr) {
  if (value === null || typeof value === 'undefined' || isNaN(Number(value))) return '0';
  let displayValue = valueIsUSD ? value : (displaySymbol === '$' ? value / usdIdr : value);
  if (!valueIsUSD && displaySymbol !== '$') displayValue = value;
  if (valueIsUSD && displaySymbol !== '$') displayValue = value * usdIdr;

  const absNum = Math.abs(displayValue);
  const isRupiah = displaySymbol !== '$';
  const sign = displayValue < 0 ? '-' : '';

  const formatNum = (num, divisor) => {
      let str = (num / divisor).toFixed(2);
      str = parseFloat(str).toString(); 
      return isRupiah ? str.replace('.', ',') : str;
  };

  if (absNum >= 1e12) return `${sign}${formatNum(absNum, 1e12)} T`;
  if (absNum >= 1e9)  return `${sign}${formatNum(absNum, 1e9)} B`;
  if (absNum >= 1e6)  return `${sign}${formatNum(absNum, 1e6)} M`;
  if (absNum >= 1e3)  return `${sign}${formatNum(absNum, 1e3)} K`;

  return new Intl.NumberFormat(isRupiah ? 'id-ID' : 'en-US', { style: 'decimal', minimumFractionDigits: isRupiah ? 0 : 2, maximumFractionDigits: isRupiah ? 0 : 2 }).format(displayValue);
}

function formatQty(v) {
  const n = Number(v || 0);
  if (n === 0) return "0";
  if (Math.abs(n) < 1) return n.toFixed(6).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  return n.toLocaleString('id-ID');
}

function ensureNumericAsset(a) {
  return { ...a, id: a.id || `${a.type}:${a.symbol}:${Math.random()}`, name: a.name || a.symbol, shares: toNum(a.shares || 0), avgPrice: toNum(a.avgPrice || 0), investedUSD: toNum(a.investedUSD || 0), lastPriceUSD: toNum(a.lastPriceUSD || 0), change24hUSD: toNum(a.change24hUSD || 0), change24hPct: toNum(a.change24hPct || 0), createdAt: a.createdAt || Date.now(), purchaseDate: a.purchaseDate || a.createdAt || Date.now(), nonLiquidYoy: toNum(a.nonLiquidYoy || 0), coupon: toNum(a.coupon || 0), incomeFrequency: a.incomeFrequency || 'None', type: a.type || "stock", image: a.image || null, description: a.description || '' };
}

/* ===================== UI Helpers ===================== */
const Modal = ({ children, isOpen, onClose, title, size = "2xl" }) => {
  useEffect(() => {
    if (isOpen && isBrowser) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else if (isBrowser) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      if (isBrowser) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;
  const sizeClasses = { 'lg': 'max-w-lg', '2xl': 'max-w-2xl', '3xl': 'max-w-3xl' };
  
  return (
    <div className="fixed top-[72px] bottom-0 left-0 right-0 bg-black/75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 opacity-100 overflow-y-auto" onClick={onClose}>
      <div className={`glass-card w-full ${sizeClasses[size]} max-h-[85vh] flex flex-col transform transition-all duration-300 scale-100 my-auto shadow-2xl`} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-white/10 shrink-0 bg-black/20 rounded-t-xl">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl px-2 py-1 leading-none rounded hover:bg-white/10 transition-colors">&times;</button>
        </div>
        <div className="p-4 overflow-y-auto flex-1 scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};

const BottomSheet = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (<div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={onClose}><div className={`fixed bottom-0 left-0 right-0 glass-card rounded-t-2xl shadow-lg transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`} onClick={e => e.stopPropagation()}><div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto my-3"></div>{children}</div></div>);
};

/* ===================== Main Component ===================== */
export default function App() {
  const STORAGE_VERSION = "v42"; 
  
  const [assets, setAssets] = useState(() => JSON.parse(safeGetStorage(`pf_assets_${STORAGE_VERSION}`, "[]")).map(ensureNumericAsset));
  const [transactions, setTransactions] = useState(() => JSON.parse(safeGetStorage(`pf_transactions_${STORAGE_VERSION}`, "[]")));
  const [financialSummaries, setFinancialSummaries] = useState({ realizedUSD: 0, tradingBalance: 0, totalDeposits: 0, totalWithdrawals: 0, });
  const [displaySymbol, setDisplaySymbol] = useState(() => safeGetStorage(`pf_display_sym_${STORAGE_VERSION}`, "Rp"));
  const [usdIdr, setUsdIdr] = useState(() => Number(safeGetStorage(`pf_usd_idr_rate_${STORAGE_VERSION}`, "16200")));
  const [profilePic, setProfilePic] = useState(() => safeGetStorage(`pf_profile_pic_${STORAGE_VERSION}`, null));

  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isViewPhotoOpen, setIsViewPhotoOpen] = useState(false);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
      const fetchInitialRate = async () => {
          try {
              const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=idr');
              const data = await res.json();
              if (data && data.tether && data.tether.idr) {
                  setUsdIdr(data.tether.idr);
                  safeSetStorage(`pf_usd_idr_rate_${STORAGE_VERSION}`, data.tether.idr.toString());
              }
          } catch (e) { console.error("Initial IDR rate fetch failed", e); }
      };
      fetchInitialRate();
  }, []);
  
  const defaultWatched = [
      { id: 'QQQ', symbol: 'NASDAQ', name: 'Nasdaq 100 (QQQ)', type: 'stock', image: 'https://s3-symbol-logo.tradingview.com/nasdaq--big.svg' },
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', type: 'crypto', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' }
  ];
  const [watchedAssets, setWatchedAssets] = useState(() => JSON.parse(safeGetStorage(`pf_watched_assets_${STORAGE_VERSION}`, JSON.stringify(defaultWatched))));
  const [watchedAssetData, setWatchedAssetData] = useState({});
  const [priceHistory, setPriceHistory] = useState(() => JSON.parse(safeGetStorage(`pf_price_history_${STORAGE_VERSION}`, "{}")));
  const [priceFlashes, setPriceFlashes] = useState({});

  const [isAddAssetModalOpen, setAddAssetModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState("stock");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isManagePortfolioOpen, setManagePortfolioOpen] = useState(false);
  const [isBalanceModalOpen, setBalanceModalOpen] = useState(false);
  const [balanceModalMode, setBalanceModalMode] = useState('Add');
  const [isAssetDetailModalOpen, setAssetDetailModalOpen] = useState(false);
  const [selectedAssetForDetail, setSelectedAssetForDetail] = useState(null);
  const [isEquityModalOpen, setIsEquityModalOpen] = useState(false);
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [isAssetOptionsOpen, setIsAssetOptionsOpen] = useState(false);
  const [assetSortBy, setAssetSortBy] = useState('default');
  const [assetDisplayAs, setAssetDisplayAs] = useState(() => safeGetStorage(`pf_asset_display_as_${STORAGE_VERSION}`, 'card'));

  const [nlName, setNlName] = useState(""), [nlQty, setNlQty] = useState(""), [nlPrice, setNlPrice] = useState(""), [nlPriceCcy, setNlPriceCcy] = useState("IDR"), [nlPurchaseDate, setNlPurchaseDate] = useState(""), [nlCoupon, setNlCoupon] = useState(""), [nlYoy, setNlYoy] = useState(""), [nlDesc, setNlDesc] = useState(""), [nlIncomeFreq, setNlIncomeFreq] = useState("None");
  const importInputRef = useRef(null);
  const prevAssetsRef = useRef();
  
  const recalculateStateFromTransactions = (txs) => {
    let newAssets = {}; let realizedUSD = 0; let tradingBalance = 0; let totalDeposits = 0; let totalWithdrawals = 0;
    const sortedTxs = [...txs].sort((a, b) => a.date - b.date);
    for (const tx of sortedTxs) {
      if (tx.type === 'deposit') { tradingBalance += tx.amount; totalDeposits += tx.amount; continue; }
      if (tx.type === 'withdraw') { tradingBalance -= tx.amount; totalWithdrawals += tx.amount; continue; }
      
      const assetId = tx.assetId || `${tx.assetStub.type}:${tx.assetStub.symbol}`;
      if (!newAssets[assetId]) { 
          newAssets[assetId] = ensureNumericAsset({ ...tx.assetStub, shares: 0, investedUSD: 0, avgPrice: 0 }); 
          newAssets[assetId].purchaseDate = tx.date;
      }
      
      const asset = newAssets[assetId];
      if (tx.type === 'buy') {
        if (tx.date < asset.purchaseDate) {
            asset.purchaseDate = tx.date;
        }

        tradingBalance -= tx.cost * usdIdr; const totalInvested = asset.investedUSD + tx.cost; const totalShares = asset.shares + tx.qty;
        asset.investedUSD = totalInvested; asset.shares = totalShares; asset.avgPrice = totalShares > 0 ? totalInvested / totalShares : 0;
      } else if (tx.type === 'sell' || tx.type === 'delete') {
        tradingBalance += tx.proceeds * usdIdr; realizedUSD += tx.realized; const costOfSold = asset.avgPrice * tx.qty;
        asset.investedUSD -= costOfSold; asset.shares -= tx.qty;
      }
    }
    setAssets(Object.values(newAssets).filter(a => a.shares > 0.000001));
    setFinancialSummaries({ realizedUSD, tradingBalance, totalDeposits, totalWithdrawals });
  };

  useEffect(() => {
    safeSetStorage(`pf_transactions_${STORAGE_VERSION}`, JSON.stringify(transactions));
    recalculateStateFromTransactions(transactions);
  }, [transactions, usdIdr]);
  
  useEffect(() => { 
    safeSetStorage(`pf_assets_${STORAGE_VERSION}`, JSON.stringify(assets));
    prevAssetsRef.current = assets.reduce((acc, asset) => { acc[asset.id] = asset; return acc; }, {});
  }, [assets]);
  
  useEffect(() => { safeSetStorage(`pf_display_sym_${STORAGE_VERSION}`, displaySymbol); }, [displaySymbol]);
  useEffect(() => { safeSetStorage(`pf_watched_assets_${STORAGE_VERSION}`, JSON.stringify(watchedAssets)); }, [watchedAssets]);
  useEffect(() => { safeSetStorage(`pf_price_history_${STORAGE_VERSION}`, JSON.stringify(priceHistory)); }, [priceHistory]);
  useEffect(() => { safeSetStorage(`pf_asset_display_as_${STORAGE_VERSION}`, assetDisplayAs); }, [assetDisplayAs]);

  // Realtime Polling Optimizations
  useEffect(() => {
    const pollPrices = async () => {
      try {
          const resIdr = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=idr');
          const dataIdr = await resIdr.json();
          if (dataIdr?.tether?.idr) {
              setUsdIdr(dataIdr.tether.idr);
              safeSetStorage(`pf_usd_idr_rate_${STORAGE_VERSION}`, dataIdr.tether.idr.toString());
          }
      } catch (e) {}

      if (assets.length === 0 && watchedAssets.length === 0) return;

      const stockSymbols = [...new Set(assets.filter(a => a.type === "stock").map(a => a.symbol).filter(Boolean))];
      const portfolioCryptoIds = [...new Set(assets.filter(a => a.type === "crypto" && a.coingeckoId).map(a => a.coingeckoId))];
      
      const newPrices = {};
      const newFlashes = {};
      const newHistory = {...priceHistory};
      const newWatchedData = {...watchedAssetData};

      const watchedStocks = watchedAssets.filter(a => a.type === 'stock');
      const allStockSymbols = [...new Set([...stockSymbols, ...watchedStocks.map(s => s.id || s.symbol)])];
      
      if (allStockSymbols.length > 0) {
        try {
            const url = `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${allStockSymbols.join(',')}`;
            let spark = [];
            
            try {
                const res = await fetch(url);
                if(!res.ok) throw new Error('Direct fail');
                const data = await res.json();
                spark = data?.spark?.result || [];
            } catch(e0) {
                try {
                    const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
                    if(!res.ok) throw new Error('Raw fail');
                    const data = await res.json();
                    spark = data?.spark?.result || [];
                } catch(e1) {
                    try {
                        const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`);
                        const data = await res.json();
                        spark = data?.spark?.result || [];
                    } catch (e2) {}
                }
            }
            
            spark.forEach(item => {
                const sym = item.symbol;
                const meta = item.response[0]?.meta;
                if(meta && meta.regularMarketPrice) {
                    const priceInUSD = sym.endsWith('.JK') ? meta.regularMarketPrice / usdIdr : meta.regularMarketPrice;
                    const prevCloseUSD = sym.endsWith('.JK') ? (meta.previousClose || meta.regularMarketPrice) / usdIdr : (meta.previousClose || meta.regularMarketPrice);
                    const changeUSD = priceInUSD - prevCloseUSD;
                    const pctChange = prevCloseUSD ? (changeUSD / prevCloseUSD) * 100 : 0;
                    
                    const assetObj = assets.find(a => a.symbol === sym || a.id === sym);
                    if (assetObj) {
                        newPrices[assetObj.symbol] = { price: priceInUSD, change: changeUSD, pctChange: pctChange };
                    }
                    
                    const watchedStock = watchedStocks.find(s => s.id === sym || s.symbol === sym);
                    if(watchedStock) {
                        newWatchedData[watchedStock.id] = {
                            id: watchedStock.id, price_usd: priceInUSD, change_24h: pctChange,
                            name: watchedStock.name, symbol: watchedStock.symbol, type: 'stock', image: watchedStock.image
                        };
                    }
                }
            });
        } catch (e) { console.error("Failed to fetch stock prices", e); }
      }
      
      const watchedCryptos = watchedAssets.filter(a => a.type === 'crypto');
      const allCryptoIds = [...new Set([...portfolioCryptoIds, ...watchedCryptos.map(c => c.id)])];
      
      if (allCryptoIds.length > 0) {
        try {
            const res = await fetch(COINGECKO_MARKETS(allCryptoIds.join(',')));
            const data = await res.json();
            
            data.forEach(item => {
                if (watchedCryptos.some(w => w.id === item.id)) {
                     newWatchedData[item.id] = {
                        id: item.id, price_usd: item.current_price, type: 'crypto',
                        change_24h: item.price_change_percentage_24h,
                        name: item.name, symbol: item.symbol.toUpperCase(), image: item.image,
                    };
                }
                if (portfolioCryptoIds.includes(item.id)) {
                    const asset = assets.find(a => a.coingeckoId === item.id);
                    if (asset) {
                       newPrices[asset.symbol] = { price: item.current_price ?? 0, change: item.price_change_24h ?? 0, pctChange: item.price_change_percentage_24h ?? 0 };
                    }
                }
            });
        } catch (e) { console.error("Failed to fetch crypto prices", e); }
      }
      
      setWatchedAssetData(newWatchedData);

      if (Object.keys(newPrices).length > 0) {
        setAssets(prev => prev.map(a => {
            if (newPrices[a.symbol]) {
                const newPriceData = newPrices[a.symbol];
                const prevAsset = prevAssetsRef.current?.[a.id];
                if (prevAsset && newPriceData.price !== prevAsset.lastPriceUSD) {
                    newFlashes[a.id] = newPriceData.price > prevAsset.lastPriceUSD ? 'up' : 'down';
                }
                const history = (newHistory[a.id] || []).slice(-29);
                history.push(newPriceData.price);
                newHistory[a.id] = history;
                return { ...a, lastPriceUSD: newPriceData.price, change24hUSD: newPriceData.change, change24hPct: newPriceData.pctChange };
            }
            return a;
        }));
        
        setPriceHistory(newHistory);
        if (Object.keys(newFlashes).length > 0) {
            setPriceFlashes(newFlashes);
            Object.keys(newFlashes).forEach(assetId => {
                setTimeout(() => { setPriceFlashes(prev => { const next = {...prev}; delete next[assetId]; return next; }); }, 700);
            });
        }
      }
    };

    pollPrices();
    const id = setInterval(pollPrices, 20000); 
    return () => clearInterval(id);
  }, [assets.length, usdIdr, watchedAssets]);

  const searchTimeoutRef = useRef(null);
  useEffect(() => {
    if (!query || query.trim().length < 2) { setSuggestions([]); setIsSearching(false); return; }
    setIsSearching(true);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const q = query.trim();
        if (searchMode === 'crypto') {
          const res = await fetchWithTimeout(`${COINGECKO_API}/search?query=${encodeURIComponent(q)}`, {}, 5000);
          if (!res.ok) throw new Error('Search API failed');
          const j = await res.json();
          setSuggestions((j.coins || []).slice(0, 10).map(c => ({ 
              symbol: c.symbol.toUpperCase(), display: `${c.name} (${c.symbol.toUpperCase()})`, id: c.id, 
              image: c.thumb, source: "coingecko", type: "crypto" 
          })));
        } else {
            let results = [];
            
            try {
                const tvUrl = TV_SEARCH_API(q);
                const res = await fetchWithTimeout(tvUrl, {}, 3000);
                if (!res.ok) throw new Error("TV direct fail");
                const data = await res.json();
                
                if (data && data.length > 0) {
                    results = data.map(it => {
                        const yahooSymbol = getYahooSymbol(it.symbol, it.exchange, it.country);
                        const isIndo = it.country === 'ID' || it.exchange === 'IDX';
                        const cleanSymbol = it.symbol.replace('.JK', '');
                        const imgUrl = it.logoid 
                            ? `https://s3-symbol-logo.tradingview.com/${it.logoid}--big.svg`
                            : (isIndo ? `https://assets.stockbit.com/logos/companies/${cleanSymbol}.png` : `https://assets.parqet.com/logos/symbol/${it.symbol}?format=png`);
                        return { symbol: yahooSymbol, display: `${it.description} (${it.symbol})`, exchange: it.exchange || it.country, id: yahooSymbol, source: "tradingview", type: "stock", image: imgUrl };
                    });
                } else { throw new Error("Empty TV"); }
            } catch (e1) {
                try {
                    const tvUrlProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(TV_SEARCH_API(q))}`;
                    const res = await fetchWithTimeout(tvUrlProxy, {}, 3000);
                    const data = await res.json();
                    
                    if (data && data.length > 0) {
                        results = data.map(it => {
                            const yahooSymbol = getYahooSymbol(it.symbol, it.exchange, it.country);
                            const isIndo = it.country === 'ID' || it.exchange === 'IDX';
                            const cleanSymbol = it.symbol.replace('.JK', '');
                            const imgUrl = it.logoid 
                                ? `https://s3-symbol-logo.tradingview.com/${it.logoid}--big.svg`
                                : (isIndo ? `https://assets.stockbit.com/logos/companies/${cleanSymbol}.png` : `https://assets.parqet.com/logos/symbol/${it.symbol}?format=png`);
                            return { symbol: yahooSymbol, display: `${it.description} (${it.symbol})`, exchange: it.exchange || it.country, id: yahooSymbol, source: "tradingview", type: "stock", image: imgUrl };
                        });
                    } else { throw new Error("Empty Proxy TV"); }
                } catch (e2) {
                    const yahooUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${q}`;
                    try {
                        const res = await fetchWithTimeout(yahooUrl, {}, 3000);
                        const data = await res.json();
                        if (data && data.quotes) {
                            results = data.quotes.filter(it => it.shortname || it.longname).map(it => {
                                 const isIndo = it.symbol.endsWith('.JK');
                                 const cleanSymbol = it.symbol.replace('.JK', '');
                                 const imgUrl = isIndo ? `https://assets.stockbit.com/logos/companies/${cleanSymbol}.png` : `https://assets.parqet.com/logos/symbol/${it.symbol}?format=png`;
                                 return { symbol: it.symbol.toUpperCase(), display: `${it.shortname || it.longname} (${it.symbol.toUpperCase()})`, exchange: it.exchange, id: it.symbol.toUpperCase(), source: "yahoo", type: "stock", image: imgUrl }
                            });
                        }
                    } catch(e3) {
                         const yahooProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`;
                         const res = await fetchWithTimeout(yahooProxy, {}, 4000);
                         const data = await res.json();
                         if (data && data.quotes) {
                              results = data.quotes.filter(it => it.shortname || it.longname).map(it => {
                                 const isIndo = it.symbol.endsWith('.JK');
                                 const cleanSymbol = it.symbol.replace('.JK', '');
                                 const imgUrl = isIndo ? `https://assets.stockbit.com/logos/companies/${cleanSymbol}.png` : `https://assets.parqet.com/logos/symbol/${it.symbol}?format=png`;
                                 return { symbol: it.symbol.toUpperCase(), display: `${it.shortname || it.longname} (${it.symbol.toUpperCase()})`, exchange: it.exchange, id: it.symbol.toUpperCase(), source: "yahoo", type: "stock", image: imgUrl }
                              });
                         }
                    }
                }
            }
            setSuggestions(results.slice(0, 10));
        }
      } catch (e) { console.error("Semua metode pencarian gagal:", e); setSuggestions([]); } finally { setIsSearching(false); }
    }, 300); 
    return () => clearTimeout(searchTimeoutRef.current);
  }, [query, searchMode]);

  const addTransaction = (tx) => setTransactions(prev => [...prev, tx]);
  
  const handleBuy = (assetStub, qty, priceUSD, overrideDate) => {
    qty = toNum(qty); priceUSD = toNum(priceUSD);
    if (qty <= 0 || priceUSD < 0) { alert("Quantity must be greater than zero and price cannot be negative."); return false; }
    const costUSD = qty * priceUSD;
    
    if (costUSD * usdIdr > financialSummaries.tradingBalance) {
        alert("Insufficient balance! Redirecting to Add Balance...");
        setAddAssetModalOpen(false);
        setAssetDetailModalOpen(false);
        setBalanceModalMode('Add');
        setBalanceModalOpen(true);
        return false;
    }
    
    const assetId = assetStub.id || `${assetStub.type}:${assetStub.symbol}`;
    const txDate = overrideDate || assetStub.purchaseDate || Date.now();
    
    addTransaction({ id: `tx:${Date.now()}`, type: "buy", qty, pricePerUnit: priceUSD, cost: costUSD, date: txDate, symbol: assetStub.symbol, name: assetStub.name || assetStub.symbol, assetId, assetStub });
    if (isAssetDetailModalOpen) setAssetDetailModalOpen(false); return true;
  };

  const handleSell = (asset, qty, priceUSD) => {
    qty = toNum(qty); priceUSD = toNum(priceUSD);
    if (!asset || qty <= 0 || priceUSD < 0) { alert("Quantity must be > 0 and price >= 0"); return false; }
    if (qty > asset.shares) { alert("Cannot sell more than you own."); return false; }
    const proceedsUSD = qty * priceUSD; const costOfSold = qty * asset.avgPrice; const realized = proceedsUSD - costOfSold;
    addTransaction({ id: `tx:${Date.now()}`, assetId: asset.id, type: "sell", qty, pricePerUnit: priceUSD, proceeds: proceedsUSD, costOfSold, realized, date: Date.now(), symbol: asset.symbol, name: asset.name, image: asset.image });
    if (isAssetDetailModalOpen) setAssetDetailModalOpen(false); return true;
  };

  const handleDeleteAsset = (asset) => {
    if (!asset || !confirm(`Delete and liquidate ${asset.symbol} at market price?`)) return;
    const marketUSD = asset.shares * asset.lastPriceUSD; const realized = marketUSD - asset.investedUSD;
    addTransaction({ id: `tx:${Date.now()}`, assetId: asset.id, type: "delete", qty: asset.shares, pricePerUnit: asset.lastPriceUSD, proceeds: marketUSD, costOfSold: asset.investedUSD, realized, date: Date.now(), symbol: asset.symbol, name: asset.name, image: asset.image, note: "liquidated" });
    setAssetDetailModalOpen(false);
  };
  
  const handleDeleteTransaction = (txId) => { 
      if (confirm("Delete this transaction permanently?")) {
          setTransactions(prev => prev.filter(tx => tx.id !== txId)); 
      }
  };

  const addAssetWithInitial = (qty, price) => {
    qty = toNum(qty); price = toNum(price); let p = selectedSuggestion;
    if (!p) { const t = query.split("(")[0].trim(); if (!t) return; p = { symbol: t.toUpperCase(), display: t.toUpperCase(), type: searchMode, image: null, id: t.toUpperCase() }; }
    if (qty <= 0 || price < 0) return;
    const priceUSD = (displaySymbol === "Rp") ? price / usdIdr : price;
    const newStub = { id: p.id, type: p.type, symbol: p.symbol, name: p.display, image: p.image, coingeckoId: p.type === 'crypto' ? p.id : undefined };
    if (handleBuy(newStub, qty, priceUSD)) { setAddAssetModalOpen(false); setQuery(''); setSelectedSuggestion(null); setSuggestions([]); }
  };

  const addNonLiquidAsset = () => {
    const name = nlName.trim(), qty = toNum(nlQty), priceIn = toNum(nlPrice);
    if (!name || qty <= 0) { alert("Category and quantity must be filled."); return; }
    if (priceIn < 0) { alert("Purchase price cannot be negative."); return; }

    const priceUSD = nlPriceCcy === 'IDR' ? priceIn / usdIdr : priceIn;
    const couponNominal = toNum(nlCoupon);
    const couponUSD = nlPriceCcy === 'IDR' ? couponNominal / usdIdr : couponNominal;
    
    const truePurchaseDate = nlPurchaseDate ? new Date(nlPurchaseDate).getTime() : Date.now();

    const newAssetStub = { 
        id: `nonliquid:${name.replace(/\s/g,'_')}`, 
        type: 'nonliquid', 
        symbol: name.slice(0,8).toUpperCase(), 
        name, 
        purchaseDate: truePurchaseDate, 
        nonLiquidYoy: toNum(nlYoy), 
        coupon: couponUSD, 
        incomeFrequency: nlIncomeFreq,
        description: nlDesc 
    };
    
    if (handleBuy(newAssetStub, qty, priceUSD, truePurchaseDate)) { 
        setAddAssetModalOpen(false); setNlName(''); setNlQty(''); setNlPrice(''); setNlPurchaseDate(''); setNlCoupon(''); setNlYoy(''); setNlDesc(''); setNlIncomeFreq('None'); 
    }
  };
  
  const handleAddBalance = (amount) => { 
      const amountIDR = displaySymbol === '$' ? toNum(amount) * usdIdr : toNum(amount);
      addTransaction({ id: `tx:${Date.now()}`, type: "deposit", amount: amountIDR, date: Date.now() }); 
      setBalanceModalOpen(false); 
  };
  
  const handleWithdraw = (amount) => {
    const amountIDR = displaySymbol === '$' ? toNum(amount) * usdIdr : toNum(amount);
    if (amountIDR > financialSummaries.tradingBalance) { alert("Withdrawal amount exceeds balance."); return; }
    addTransaction({ id: `tx:${Date.now()}`, type: "withdraw", amount: amountIDR, date: Date.now() }); 
    setBalanceModalOpen(false);
  };
  
  const handleExport = () => {
    if (transactions.length === 0) { alert("No transactions to export."); return; }
    
    const formatCsvCell = (cellData) => { 
        if (cellData === null || cellData === undefined) return '';
        const stringData = String(cellData); 
        if (stringData.includes(',') || stringData.includes('"') || stringData.includes('\n')) { 
            return `"${stringData.replace(/"/g, '""')}"`; 
        } 
        return stringData; 
    };

    const headers = ['id', 'date', 'type', 'symbol', 'name', 'qty', 'pricePerUnit', 'cost', 'proceeds', 'realized', 'amount', 'assetId', 'note', 'assetStub_id', 'assetStub_type', 'assetStub_symbol', 'assetStub_name', 'assetStub_image', 'assetStub_coingeckoId', 'assetStub_incomeFrequency', 'assetStub_coupon', 'assetStub_purchaseDate', 'assetStub_nonLiquidYoy', 'assetStub_description'];
    const headerRow = headers.join(',') + '\n';
    
    const rows = transactions.map(tx => { 
        return headers.map(header => { 
            let val;
            if (header.startsWith('assetStub_')) { 
                const key = header.replace('assetStub_', ''); 
                val = tx.assetStub ? tx.assetStub[key] : ''; 
            } else {
                val = tx[header];
            }

            if (header === 'date' || header === 'assetStub_purchaseDate') {
                if (val && typeof val === 'number') {
                    val = new Date(val).toISOString();
                }
            }
            return formatCsvCell(val);
        }).join(','); 
    }).join('\n');
    
    const csvContent = headerRow + rows; const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }); const link = document.createElement("a");
    if (link.download !== undefined) { const url = URL.createObjectURL(blob); link.setAttribute("href", url); link.setAttribute("download", `portfolio_transactions_${new Date().toISOString().split('T')[0]}.csv`); link.style.visibility = 'hidden'; document.body.appendChild(link); link.click(); document.body.removeChild(link); }
    setManagePortfolioOpen(false);
  };

  const handleImportClick = () => { importInputRef.current.click(); };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!confirm("Importing new data will replace your current transaction history. Continue?")) { event.target.value = null; return; }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target.result;
            const lines = text.split(/\r\n|\n/).map(l => l.trim()).filter(Boolean);
            if (lines.length < 2) throw new Error("File is empty or data format is invalid.");
            
            const firstLine = lines[0];
            let delimiter = ',';
            if (firstLine.includes('\t')) delimiter = '\t';

            const headers = firstLine.split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
            
            const newTransactions = lines.slice(1).map((line, lineIdx) => {
                let values = [];
                if (delimiter === ',') {
                    values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
                } else {
                    values = line.split('\t').map(val => val.trim().replace(/^"|"$/g, ''));
                }

                const tx = {};
                headers.forEach((header, idx) => {
                    if (values[idx] !== undefined && values[idx] !== '') {
                        tx[header] = values[idx];
                    }
                });

                ['date', 'assetStub_purchaseDate'].forEach(dateField => {
                    if (tx[dateField]) {
                        if (typeof tx[dateField] === 'string' && tx[dateField].includes('T')) {
                            tx[dateField] = new Date(tx[dateField]).getTime();
                        } else {
                            tx[dateField] = toNum(tx[dateField]); 
                        }
                    }
                });

                if (tx.type === 'buy' && tx.assetStub_symbol) {
                    tx.assetStub = {
                        id: tx.assetStub_id || `${tx.assetStub_type || 'stock'}:${tx.assetStub_symbol}`,
                        type: tx.assetStub_type || 'stock',
                        symbol: tx.assetStub_symbol,
                        name: tx.assetStub_name || tx.assetStub_symbol,
                        image: tx.assetStub_image || null,
                        coingeckoId: tx.assetStub_coingeckoId || undefined,
                        incomeFrequency: tx.assetStub_incomeFrequency || 'None',
                        coupon: toNum(tx.assetStub_coupon || 0),
                        purchaseDate: tx.assetStub_purchaseDate || tx.date || Date.now(),
                        nonLiquidYoy: toNum(tx.assetStub_nonLiquidYoy || 0),
                        description: tx.assetStub_description || ''
                    };
                }

                Object.keys(tx).forEach(key => {
                    if (key.startsWith('assetStub_')) delete tx[key];
                });

                const numericFields = ['qty', 'pricePerUnit', 'cost', 'proceeds', 'realized', 'amount'];
                numericFields.forEach(field => {
                    if (tx[field] !== undefined) {
                        tx[field] = toNum(tx[field]);
                    }
                });

                if (!tx.id) tx.id = `import:${Date.now()}:${lineIdx}`;
                if (!tx.date) tx.date = Date.now();
                if (!tx.type) tx.type = 'deposit';

                return tx;
            });

            setTransactions(newTransactions);
            alert("Successfully imported " + newTransactions.length + " transactions!");
        } catch (error) {
            console.error("Failed to import data:", error);
            alert(`Failed to import file: ${error.message}. Please ensure it is a valid CSV/TSV file.`);
        } finally {
            event.target.value = null;
        }
    };
    reader.readAsText(file);
    setManagePortfolioOpen(false);
  };

  const handleSetWatchedAsset = (assetData) => {
    setWatchedAssets(prev => {
        if (prev.some(a => a.id === assetData.id)) return prev.filter(a => a.id !== assetData.id);
        if (prev.length >= 2) { const newWatched = [...prev]; newWatched.shift(); newWatched.push(assetData); return newWatched; }
        return [...prev, assetData];
    });
  };

  const handleProfilePicChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
              const img = new Image();
              img.onload = () => {
                  const canvas = document.createElement('canvas');
                  const MAX_WIDTH = 400; 
                  const MAX_HEIGHT = 400;
                  let width = img.width;
                  let height = img.height;

                  if (width > height) {
                      if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                  } else {
                      if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                  }

                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0, width, height);

                  const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                  
                  setProfilePic(dataUrl);
                  safeSetStorage(`pf_profile_pic_${STORAGE_VERSION}`, dataUrl);
              };
              img.src = event.target.result;
          };
          reader.readAsDataURL(file);
      }
      e.target.value = null; 
  };

  const { tradingBalance, realizedUSD, totalDeposits, totalWithdrawals } = financialSummaries;
  
  const derivedData = useMemo(() => {
    const rows = assets.map(a => {
        if (a.type === 'nonliquid') {
            const purchaseTime = a.purchaseDate || a.createdAt || Date.now();
            const nowTime = Date.now();
            
            const exactYearsPassed = Math.max(0, (nowTime - purchaseTime) / (1000 * 60 * 60 * 24 * 365.25));
            
            const initialPrice = a.avgPrice || 0;
            const currentPrice = initialPrice * (1 + ((a.nonLiquidYoy || 0) / 100) * exactYearsPassed);
            const capitalValueUSD = a.shares * currentPrice;
            
            let accumulatedCouponUSD = 0;
            let nextIncomeDate = null;
            const freq = a.incomeFrequency || 'None';
            let validPeriods = 0;

            if (freq !== 'None' && a.coupon > 0) {
                let monthsPerPeriod = 12;
                if (freq === 'Monthly') monthsPerPeriod = 1;
                else if (freq === 'Quarterly') monthsPerPeriod = 3;
                else if (freq === 'Semi Annual') monthsPerPeriod = 6;
                else if (freq === 'Annual') monthsPerPeriod = 12;

                let tempDate = new Date(purchaseTime);
                
                while(true) {
                    tempDate.setMonth(tempDate.getMonth() + monthsPerPeriod);
                    if (tempDate.getTime() <= nowTime) {
                        validPeriods++;
                    } else {
                        nextIncomeDate = tempDate.getTime();
                        break;
                    }
                }
                
                const incomePerPeriod = a.coupon * a.shares; 
                accumulatedCouponUSD = validPeriods * incomePerPeriod;
            }
            
            const marketValueUSD = capitalValueUSD + accumulatedCouponUSD;
            const pnlUSD = marketValueUSD - a.investedUSD;
            const pnlPct = a.investedUSD > 0 ? (pnlUSD / a.investedUSD) * 100 : 0;
            
            return { ...a, marketValueUSD, pnlUSD, pnlPct, lastPriceUSD: currentPrice, accumulatedCouponUSD, nextIncomeDate, capitalValueUSD, exactYearsPassed, validPeriods };
        } else {
            const currentPrice = a.lastPriceUSD > 0 ? a.lastPriceUSD : a.avgPrice;
            const marketValueUSD = a.shares * currentPrice;
            const pnlUSD = marketValueUSD - a.investedUSD;
            const pnlPct = a.investedUSD > 0 ? (pnlUSD / a.investedUSD) * 100 : 0;
            return { ...a, marketValueUSD, pnlUSD, pnlPct, lastPriceUSD: currentPrice };
        }
    });
    const investedUSD = rows.reduce((s, r) => s + r.investedUSD, 0);
    const marketValueUSD = rows.reduce((s, r) => s + r.marketValueUSD, 0);
    const unrealizedPnlUSD = marketValueUSD - investedUSD;
    const unrealizedPnlPct = investedUSD > 0 ? (unrealizedPnlUSD / investedUSD) * 100 : 0;
    const totalEquity = (marketValueUSD * usdIdr) + tradingBalance;
    
    // Perbaikan Logika Win/Loss dengan lebih presisi
    const sells = transactions.filter(tx => tx.type === 'sell' || tx.type === 'delete');
    const wins = sells.filter(tx => tx.realized > 0); 
    const losses = sells.filter(tx => tx.realized < 0);
    const totalTrades = sells.length;
    
    const tradeStats = { 
        trades: totalTrades, 
        wins: wins.length, 
        losses: losses.length, 
        winRate: totalTrades > 0 ? (wins.length / totalTrades) * 100 : 0, 
        maxProfit: wins.length ? Math.max(...wins.map(tx => tx.realized)) : 0, 
        maxLoss: losses.length ? Math.min(...losses.map(tx => tx.realized)) : 0, 
        avgProfit: wins.length ? wins.reduce((s, tx) => s + tx.realized, 0) / wins.length : 0, 
        avgLoss: losses.length ? losses.reduce((s, tx) => s + tx.realized, 0) / losses.length : 0, 
        totalRealizedGain: realizedUSD 
    };
    
    const netDeposit = totalDeposits - totalWithdrawals; const totalPnlUSD = unrealizedPnlUSD + realizedUSD;
    const totalValueForBreakdown = tradingBalance + (marketValueUSD * usdIdr);
    const cashPct = totalValueForBreakdown > 0 ? (tradingBalance / totalValueForBreakdown) * 100 : 0;
    const investedPct = totalValueForBreakdown > 0 ? ((marketValueUSD * usdIdr) / totalValueForBreakdown) * 100 : 0;
    
    return { rows, totals: { investedUSD, marketValueUSD, unrealizedPnlUSD, unrealizedPnlPct }, totalEquity, tradeStats, netDeposit, totalPnlUSD, cashPct, investedPct };
  }, [assets, tradingBalance, realizedUSD, totalDeposits, totalWithdrawals, transactions, usdIdr]);

  const sortedAssets = useMemo(() => {
    const assetsToSort = [...derivedData.rows];
    if (assetSortBy === 'allocation') { return assetsToSort.sort((a,b) => b.marketValueUSD - a.marketValueUSD); }
    if (assetSortBy === 'purchaseDate') { return assetsToSort.sort((a,b) => a.purchaseDate - b.purchaseDate); }
    return assetsToSort;
  }, [derivedData.rows, assetSortBy]);

  const equitySeries = useMemo(() => {
    const sortedTx = [...transactions].sort((a, b) => a.date - b.date);
    if (sortedTx.length === 0) return [{ t: Date.now() - 86400000, v: 0 }, { t: Date.now(), v: 0 }];
    const points = []; let currentCash = 0; let currentHoldings = {};
    for (const tx of sortedTx) {
        if (tx.type === 'deposit') currentCash += tx.amount;
        else if (tx.type === 'withdraw') currentCash -= tx.amount;
        else if (tx.type === 'buy') {
            currentCash -= tx.cost * usdIdr;
            const asset = currentHoldings[tx.assetId] || { shares: 0, avgPrice: 0, invested: 0 };
            const newInvested = asset.invested + tx.cost; const newShares = asset.shares + tx.qty;
            asset.invested = newInvested; asset.shares = newShares; asset.avgPrice = newShares > 0 ? newInvested / newShares : 0;
            currentHoldings[tx.assetId] = asset;
        } else if (tx.type === 'sell' || tx.type === 'delete') {
            currentCash += tx.proceeds * usdIdr;
            if (currentHoldings[tx.assetId]) {
                const asset = currentHoldings[tx.assetId];
                asset.invested -= asset.avgPrice * tx.qty; asset.shares -= tx.qty;
            }
        }
        let holdingsValueUSD = 0;
        for (const assetId in currentHoldings) {
            const holding = currentHoldings[assetId];
            const liveAsset = assets.find(a => a.id === assetId);
            holdingsValueUSD += holding.shares * (liveAsset ? liveAsset.lastPriceUSD : holding.avgPrice);
        }
        points.push({ t: tx.date, v: currentCash + (holdingsValueUSD * usdIdr) });
    }
    if (points.length === 0) return [{ t: Date.now() - 86400000, v: 0 }, { t: Date.now(), v: derivedData.totalEquity }];
    return [{ t: points[0].t - 86400000, v: 0 }, ...points, { t: Date.now(), v: derivedData.totalEquity }];
  }, [transactions, assets, usdIdr, derivedData.totalEquity]);

  const handleWatchedAssetClick = (data) => {
    const assetStub = {
        id: `watched:${data.id}`,
        symbol: data.symbol,
        name: data.name,
        type: data.type || 'stock',
        coingeckoId: data.type === 'crypto' ? data.id : undefined,
        lastPriceUSD: data.price_usd || 0,
        change24hUSD: (data.price_usd || 0) * ((data.change_24h || 0) / 100),
        change24hPct: data.change_24h || 0,
        shares: 0,
    };
    setSelectedAssetForDetail(assetStub);
    setAssetDetailModalOpen(true);
  };

  const totalEquityFontSizeClass = useMemo(() => {
    const textFormatted = formatCurrency(derivedData.totalEquity, false, displaySymbol, usdIdr);
    const length = textFormatted.length;
    if (length > 20) return "text-sm sm:text-lg md:text-2xl";
    if (length > 16) return "text-base sm:text-xl md:text-2xl";
    if (length > 12) return "text-lg sm:text-2xl md:text-3xl";
    return "text-xl sm:text-2xl md:text-3xl";
  }, [derivedData.totalEquity, displaySymbol, usdIdr]);

  return (
    <div className="bg-black text-gray-300 min-h-screen font-sans main-background">
      <style>{`
        body, .main-background { background-color: #000000; }
        .glass-card { background: rgba(28, 28, 32, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); }
        @keyframes flash-green { 0% { background-color: rgba(16, 185, 129, 0.5); } 100% { background-color: transparent; } }
        @keyframes flash-red { 0% { background-color: rgba(239, 68, 68, 0.5); } 100% { background-color: transparent; } }
        .flash-up { animation: flash-green 0.7s ease-out; }
        .flash-down { animation: flash-red 0.7s ease-out; }
        .tradingview-widget-container:fullscreen { background-color: #131722; }
        .tradingview-widget-copyright { display: none !important; opacity: 0 !important; visibility: hidden !important; }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <header className="p-4 flex justify-end items-center sticky top-0 bg-[#000000] z-10 w-full">
            <div className="flex items-center gap-4 sm:gap-6">
                <button onClick={() => setAddAssetModalOpen(true)} className="text-gray-400 hover:text-white"><SearchIcon /></button>
                <div className="flex items-center gap-2"><span className="text-xs font-semibold text-gray-400">IDR</span><div role="switch" aria-checked={displaySymbol === "$"} onClick={() => setDisplaySymbol(prev => prev === "Rp" ? "$" : "Rp")} className={`relative w-12 h-6 rounded-full p-1 cursor-pointer transition ${displaySymbol === "$" ? 'bg-emerald-600' : 'bg-zinc-700'}`}><div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${displaySymbol === "$" ? 'translate-x-6' : 'translate-x-0'}`}></div></div><span className="text-xs font-semibold text-gray-400">USD</span></div>
                <button onClick={() => setManagePortfolioOpen(true)} className="text-gray-400 hover:text-white"><MoreVerticalIcon /></button>
                
                <button onClick={() => setProfileMenuOpen(true)} className="flex items-center justify-center outline-none">
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-[26px] h-[26px] rounded-full object-cover border border-white/20" />
                    ) : (
                        <UserAvatar />
                    )}
                </button>
            </div>
        </header>
        <main>
          <section className="p-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div onClick={() => setIsEquityModalOpen(true)} className="glass-card p-2.5 sm:p-4 shadow-lg flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all overflow-hidden relative group">
                    <div className="min-w-0 z-10">
                        <p className="text-gray-400 text-[10px] sm:text-xs">Total Equity</p>
                        <p className={`${totalEquityFontSizeClass} font-bold text-white tracking-tight leading-normal whitespace-nowrap overflow-hidden text-ellipsis w-full mt-0.5`}>
                          {formatCurrency(derivedData.totalEquity, false, displaySymbol, usdIdr)}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                          {displaySymbol === 'Rp' ? formatCurrency(derivedData.totalEquity, false, '$', usdIdr) : formatCurrency(derivedData.totalEquity, false, 'Rp', usdIdr)}
                        </p>
                    </div>
                     <div className="text-[10px] sm:text-xs mt-2 space-y-1 text-gray-400 border-t border-white/10 pt-2 min-w-0 z-10">
                        <div className="flex justify-between w-full">
                            <span className="truncate pr-1">Unrealized P&L</span>
                            <span className={`font-semibold shrink-0 whitespace-nowrap ${derivedData.totals.unrealizedPnlUSD >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {formatCurrencyShort(derivedData.totals.unrealizedPnlUSD, true, displaySymbol, usdIdr)}
                            </span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span>&nbsp;</span>
                            <span className={`font-semibold text-right block shrink-0 whitespace-nowrap ${derivedData.totals.unrealizedPnlUSD >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {derivedData.totals.unrealizedPnlUSD >= 0 ? '+' : ''}{derivedData.totals.unrealizedPnlPct.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                    <div className="h-20 -mb-4 -mx-4 mt-auto pt-2 opacity-80 group-hover:opacity-100 transition-opacity"><AreaChart data={equitySeries} simplified={true} displaySymbol={displaySymbol}/></div>
                </div>
                
                <div onClick={() => setIsAllocationModalOpen(true)} className="glass-card p-2.5 sm:p-4 shadow-lg flex flex-col justify-center cursor-pointer hover:border-white/20 transition-all min-w-0">
                    <div className="grid grid-cols-2 text-center gap-1 w-full">
                        <div className="flex flex-col items-center overflow-hidden w-full">
                            <p className="text-gray-400 text-[11px] sm:text-xs mb-1">Cash</p>
                            <p className="font-semibold text-sm sm:text-base whitespace-nowrap w-full overflow-hidden text-ellipsis">{formatCurrencyCompactNoSymbol(tradingBalance, false, displaySymbol, usdIdr)}</p>
                        </div>
                        <div className="flex flex-col items-center overflow-hidden w-full">
                            <p className="text-gray-400 text-[11px] sm:text-xs mb-1">Invested</p>
                            <p className="font-semibold text-sm sm:text-base whitespace-nowrap w-full overflow-hidden text-ellipsis">{formatCurrencyCompactNoSymbol(derivedData.totals.marketValueUSD, true, displaySymbol, usdIdr)}</p>
                        </div>
                    </div>
                    <div className="relative w-full h-4 bg-black/20 rounded-full my-2 flex text-[10px] font-bold text-white items-center">
                        <div className="bg-blue-500 h-full flex items-center justify-center rounded-l-full overflow-hidden" style={{ width: `${derivedData.cashPct}%` }}>
                            {derivedData.cashPct > 15 && `${derivedData.cashPct.toFixed(0)}%`}
                        </div>
                        <div className="bg-emerald-500 h-full flex items-center justify-center rounded-r-full overflow-hidden" style={{ width: `${derivedData.investedPct}%` }}>
                            {derivedData.investedPct > 15 && `${derivedData.investedPct.toFixed(0)}%`}
                        </div>
                    </div>
                    <div className="text-[10px] sm:text-xs mt-2 space-y-1 text-gray-400 border-t border-white/10 pt-2 min-w-0">
                        <div className="flex justify-between w-full gap-1">
                            <span className="truncate shrink-0">Net Deposit</span>
                            <span className="font-medium text-gray-300 whitespace-nowrap text-right">{formatCurrency(derivedData.netDeposit, false, displaySymbol, usdIdr)}</span>
                        </div>
                        <div className="flex justify-between w-full gap-1">
                            <span className="truncate shrink-0">Total G/L</span>
                            <span className={`font-semibold whitespace-nowrap text-right ${derivedData.totalPnlUSD >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {derivedData.totalPnlUSD >= 0 ? '+' : ''}{formatCurrency(derivedData.totalPnlUSD, true, displaySymbol, usdIdr)}
                            </span>
                        </div>
                    </div>
                </div>

                <div onClick={() => setIsHistoryModalOpen(true)} className="glass-card p-3 sm:p-4 shadow-lg cursor-pointer hover:border-white/20 transition-all min-w-0">
                     <p className="text-gray-400 text-[10px] sm:text-xs mb-2">Summary</p>
                    <div className="text-[11px] sm:text-xs space-y-2 min-w-0">
                        <div className="flex justify-between items-center gap-1 w-full"><span className="text-gray-400 shrink-0">Deposit</span><span className="font-medium whitespace-nowrap text-right">{formatCurrencyShort(totalDeposits, false, displaySymbol, usdIdr)}</span></div>
                        <div className="flex justify-between items-center gap-1 w-full"><span className="text-gray-400 shrink-0">Withdraw</span><span className="font-medium whitespace-nowrap text-right">{formatCurrencyShort(totalWithdrawals, false, displaySymbol, usdIdr)}</span></div>
                        <div className="flex justify-between items-center gap-1 w-full border-t border-white/10 pt-2 mt-2"><span className="text-gray-400 shrink-0">Realized P&L</span><span className={`font-semibold whitespace-nowrap text-right ${realizedUSD >= 0 ? 'text-[#20c997]' : 'text-red-400'}`}>{realizedUSD >= 0 ? '+' : ''}{formatCurrencyShort(realizedUSD, true, displaySymbol, usdIdr)}</span></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 min-w-0">
                    {watchedAssets.map(w => {
                        const data = watchedAssetData[w.id] || { price_usd: 0, change_24h: 0 };
                        const change = data.change_24h || 0;
                        const currentPrice = data.price_usd || 0;
                        return (
                            <div key={w.id} onClick={() => handleWatchedAssetClick({...w, ...data})} className="flex-1 glass-card p-2 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all overflow-hidden min-w-0">
                                <div className="flex items-center gap-2 min-w-0 pr-2">
                                    <img src={w.image} alt={w.name} className="w-5 h-5 rounded-full bg-zinc-800 object-cover shrink-0 border border-white/5" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${w.symbol}&background=random&color=fff&rounded=true&bold=true`; }} />
                                    <div className="min-w-0">
                                        <p className="text-[11px] sm:text-xs font-semibold text-white truncate max-w-[70px] sm:max-w-[100px]">{w.symbol}</p>
                                        <p className="text-[9px] text-gray-400 truncate max-w-[70px] sm:max-w-[100px]">{w.name.replace(/\(.*?\)/,'').trim()}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    {currentPrice > 0 ? (
                                        <>
                                            <p className="text-[11px] sm:text-xs font-semibold text-white tabular-nums whitespace-nowrap">{formatCurrencyShort(currentPrice, true, displaySymbol, usdIdr)}</p>
                                            <p className={`text-[9px] sm:text-xs font-semibold tabular-nums whitespace-nowrap ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{change > 0 ? '+' : ''}{change.toFixed(2)}%</p>
                                        </>
                                    ) : (
                                        <div className="w-10 h-3 bg-zinc-700/50 rounded animate-pulse"></div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="mt-4 px-2 flex justify-between items-center">
                <button onClick={() => setIsAssetOptionsOpen(true)} className="text-gray-400 hover:text-white p-1" title="Filter and View Options">
                    <PencilIcon width="16" height="16" />
                </button>
                <div className="text-sm text-white cursor-pointer inline-flex items-center gap-2" onClick={() => setIsPerformanceModalOpen(true)}>
                    View Trade Performance <ArrowRightIconSimple />
                </div>
            </div>
          </section>
          
          <div className="p-2 space-y-2 pb-10">
             {assetDisplayAs === 'card' ? (
                sortedAssets.map(r => {
                    const pnlColor = r.pnlUSD >= 0 ? 'text-emerald-400' : 'text-red-400';
                    const changeColor = r.change24hPct >= 0 ? 'text-emerald-400' : 'text-red-400';
                    const flashClass = priceFlashes[r.id] === 'up' ? 'flash-up' : priceFlashes[r.id] === 'down' ? 'flash-down' : '';

                    return (
                        <div key={r.id} className="glass-card p-2.5 sm:p-3 cursor-pointer hover:border-white/20 transition-all min-w-0" onClick={() => { setSelectedAssetForDetail(r); setAssetDetailModalOpen(true); }}>
                            <div className="flex justify-between items-center mb-2 min-w-0">
                                <div className="min-w-0 flex-1 pr-2 flex items-center gap-2 sm:gap-3">
                                    {r.type !== 'nonliquid' && (
                                        <img src={r.image} alt={r.symbol} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-800 object-cover shrink-0 border border-white/5" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${r.symbol}&background=random&color=fff&rounded=true&bold=true`; }} />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm sm:text-base font-bold text-white truncate">{r.symbol}</h3>
                                        <p className="text-[9px] sm:text-xs text-gray-400 truncate w-full">{r.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                    <div className="w-16 h-8 sm:w-20 sm:h-10">
                                        {r.type === 'nonliquid' ? 
                                            <div className="w-full h-full flex items-center justify-end"><span className="text-[10px] text-gray-500 italic">Alternative</span></div> 
                                            : <Sparkline data={priceHistory[r.id] || []} color={r.change24hPct >= 0 ? '#10B981' : '#EF4444'} />
                                        }
                                    </div>
                                    <div className={`text-right p-1 rounded-md ${flashClass} shrink-0 min-w-[70px]`}>
                                        <p className="text-xs sm:text-sm font-semibold text-white tabular-nums whitespace-nowrap">{formatCurrency(r.lastPriceUSD, true, displaySymbol, usdIdr)}</p>
                                        <p className={`text-[9px] sm:text-[10px] font-semibold tabular-nums whitespace-nowrap ${changeColor}`}>
                                            {r.type === 'nonliquid' ? '' : (r.change24hUSD >= 0 ? '+' : '')}{r.type === 'nonliquid' ? '-' : formatCurrencyShort(r.change24hUSD, true, displaySymbol, usdIdr)} {r.type === 'nonliquid' ? '' : `(${r.change24hPct?.toFixed(2) ?? '0.00'}%)`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs pt-2 border-t border-white/10 min-w-0">
                                <div className="space-y-1 min-w-0">
                                    <div className="flex justify-between items-center gap-1"><span className="text-gray-400 truncate pr-1">Qty</span><span className="font-medium text-gray-200 whitespace-nowrap">{formatQty(r.shares)}</span></div>
                                    <div className="flex justify-between items-center gap-1"><span className="text-gray-400 truncate pr-1">Invested</span><span className="font-medium text-gray-200 whitespace-nowrap">{formatCurrencyShort(r.investedUSD, true, displaySymbol, usdIdr)}</span></div>
                                    <div className="flex justify-between items-center gap-1"><span className="text-gray-400 truncate pr-1">Avg Price</span><span className="font-medium text-gray-200 whitespace-nowrap">{formatCurrencyShort(r.avgPrice, true, displaySymbol, usdIdr)}</span></div>
                                </div>
                                <div className="space-y-1 text-right min-w-0">
                                    <div className="flex justify-between items-center gap-1"><span className="text-gray-400 truncate pr-1">Gain P&L</span><span className={`font-semibold whitespace-nowrap ${pnlColor}`}>{r.pnlUSD >= 0 ? '+' : ''}{formatCurrencyShort(r.pnlUSD, true, displaySymbol, usdIdr)} ({r.pnlPct.toFixed(1)}%)</span></div>
                                    <div className="flex justify-between items-center gap-1"><span className="text-gray-400 truncate pr-1">Market</span><span className="font-semibold text-gray-200 whitespace-nowrap">{formatCurrencyShort(r.marketValueUSD, true, displaySymbol, usdIdr)}</span></div>
                                    <div className="flex justify-between items-center gap-1"><span className="text-gray-400 truncate pr-1">Current</span><span className="font-semibold text-gray-200 whitespace-nowrap">{formatCurrencyShort(r.lastPriceUSD, true, displaySymbol, usdIdr)}</span></div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <AssetTableView rows={sortedAssets} displaySymbol={displaySymbol} usdIdr={usdIdr} onRowClick={(r) => { setSelectedAssetForDetail(r); setAssetDetailModalOpen(true); }} />
            )}
            {sortedAssets.length === 0 && <p className="text-center py-8 text-gray-500">No assets in portfolio.</p>}
            <div className="p-4 text-center"><button onClick={() => setAddAssetModalOpen(true)} className="text-emerald-400 font-semibold text-sm">+ Add new asset</button></div>
          </div>

        </main>
        
        <input type="file" accept="image/*" capture="user" ref={cameraInputRef} onChange={handleProfilePicChange} className="hidden" />
        <input type="file" accept="image/*" ref={galleryInputRef} onChange={handleProfilePicChange} className="hidden" />

        <BottomSheet isOpen={isProfileMenuOpen} onClose={() => setProfileMenuOpen(false)}>
            <div className="p-4 text-white text-sm">
                <h3 className="text-base font-semibold mb-4 px-2">Profile Photo Menu</h3>
                <div className="space-y-1">
                    {profilePic && (
                        <button onClick={() => { setProfileMenuOpen(false); setIsViewPhotoOpen(true); }} className="w-full text-left p-3 rounded hover:bg-zinc-700/50 text-emerald-400 font-medium">View Full Photo</button>
                    )}
                    <button onClick={() => { setProfileMenuOpen(false); cameraInputRef.current.click(); }} className="w-full text-left p-3 rounded hover:bg-zinc-700/50 text-gray-300">{profilePic ? 'Change from Camera' : 'Take from Camera'}</button>
                    <button onClick={() => { setProfileMenuOpen(false); galleryInputRef.current.click(); }} className="w-full text-left p-3 rounded hover:bg-zinc-700/50 text-gray-300">{profilePic ? 'Change from Gallery/File' : 'Choose from Gallery/File'}</button>
                    {profilePic && (
                        <button onClick={() => { 
                            if(confirm("Delete current profile photo?")) {
                                setProfilePic(null); 
                                safeRemoveStorage(`pf_profile_pic_${STORAGE_VERSION}`);
                            }
                            setProfileMenuOpen(false); 
                        }} className="w-full text-left p-3 rounded hover:bg-red-700/20 text-red-400 mt-2 border-t border-zinc-700/50">Delete Profile Photo</button>
                    )}
                </div>
            </div>
        </BottomSheet>

        <Modal isOpen={isViewPhotoOpen} onClose={() => setIsViewPhotoOpen(false)} title="Profile Photo" size="lg">
            <div className="flex items-center justify-center p-2">
                <img src={profilePic} alt="Profile Full" className="max-w-full max-h-[70vh] rounded-lg object-contain" />
            </div>
        </Modal>

        <AssetDetailModal isOpen={isAssetDetailModalOpen} onClose={() => setAssetDetailModalOpen(false)} asset={selectedAssetForDetail} onBuy={handleBuy} onSell={handleSell} onDelete={handleDeleteAsset} usdIdr={usdIdr} displaySymbol={displaySymbol} />
        <Modal title="Add New Asset" isOpen={isAddAssetModalOpen} onClose={() => setAddAssetModalOpen(false)} size="lg"><AddAssetForm {...{searchMode, setSearchMode, query, setQuery, suggestions, setSelectedSuggestion, isSearching, addAssetWithInitial, addNonLiquidAsset, nlName, setNlName, nlQty, setNlQty, nlPrice, setNlPrice, nlPriceCcy, setNlPriceCcy, nlPurchaseDate, setNlPurchaseDate, nlCoupon, setNlCoupon, nlYoy, setNlYoy, nlDesc, setNlDesc, nlIncomeFreq, setNlIncomeFreq, displaySymbol, handleSetWatchedAsset, watchedAssets}} /></Modal>
        <Modal title={`${balanceModalMode} Balance`} isOpen={isBalanceModalOpen} onClose={() => setBalanceModalOpen(false)} size="lg"><BalanceManager onConfirm={balanceModalMode === 'Add' ? handleAddBalance : handleWithdraw} displaySymbol={displaySymbol} /></Modal>
        <Modal title="Portfolio Growth" isOpen={isEquityModalOpen} onClose={() => setIsEquityModalOpen(false)} size="3xl"><EquityGrowthView equitySeries={equitySeries} displaySymbol={displaySymbol} usdIdr={usdIdr} totalEquity={derivedData.totalEquity} /></Modal>
        <Modal title="Portfolio Allocation" isOpen={isAllocationModalOpen} onClose={() => setIsAllocationModalOpen(false)}><PortfolioAllocation data={derivedData.rows} tradingBalance={financialSummaries.tradingBalance} displaySymbol={displaySymbol} usdIdr={usdIdr}/></Modal>
        <Modal title="Transaction History" isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)}><HistoryView transactions={transactions} usdIdr={usdIdr} displaySymbol={displaySymbol} onDeleteTransaction={handleDeleteTransaction} /></Modal>
        
        {/* Updated Trade Performance Modal - Data Driven logic */}
        <Modal title="Trade Performance" isOpen={isPerformanceModalOpen} onClose={() => setIsPerformanceModalOpen(false)} size="3xl">
            <div className="max-h-[80vh] overflow-y-auto">
                <TradeStatsView stats={derivedData.tradeStats} transactions={transactions} displaySymbol={displaySymbol} usdIdr={usdIdr} assets={assets} />
            </div>
        </Modal>
        
        <Modal title="Asset Options" isOpen={isAssetOptionsOpen} onClose={() => setIsAssetOptionsOpen(false)} size="lg">
            <AssetOptionsPanel 
                sortBy={assetSortBy}
                setSortBy={setAssetSortBy}
                displayAs={assetDisplayAs}
                setDisplayAs={setAssetDisplayAs}
                onClose={() => setIsAssetOptionsOpen(false)}
            />
        </Modal>
        <BottomSheet isOpen={isManagePortfolioOpen} onClose={() => setManagePortfolioOpen(false)}><ManagePortfolioSheet onAddBalance={() => { setManagePortfolioOpen(false); setBalanceModalMode('Add'); setBalanceModalOpen(true); }} onWithdraw={() => { setManagePortfolioOpen(false); setBalanceModalMode('Withdraw'); setBalanceModalOpen(true); }} onClearAll={() => { if(confirm("Erase all portfolio data? This cannot be undone.")) { setTransactions([]); } setManagePortfolioOpen(false); }} onExport={handleExport} onImport={handleImportClick} /></BottomSheet>
        <input type="file" ref={importInputRef} onChange={handleFileImport} className="hidden" accept=".csv,.tsv,.txt" />
      </div>
    </div>
  );
}

/* ===================== Charts (Enhanced Broker-Style) ===================== */
const Sparkline = ({ data = [], color = '#10B981' }) => {
  const uniqueId = useMemo(() => `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`, []);

  if (!data || data.length < 2) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 80 32" preserveAspectRatio="none">
        <line x1="0" y1="16" x2="80" y2="16" stroke="#4B5563" strokeWidth="1.5" strokeDasharray="2,2" />
      </svg>
    );
  }
  const width = 80; const height = 32;
  const yMin = Math.min(...data); const yMax = Math.max(...data);
  const yRange = yMax - yMin === 0 ? 1 : yMax - yMin;
  const xStep = width / (data.length - 1);

  const points = data.map((point, i) => { const x = i * xStep; const y = height - ((point - yMin) / yRange) * height; return `${x.toFixed(2)},${y.toFixed(2)}`; }).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={uniqueId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" points={points} />
      <polygon fill={`url(#${uniqueId})`} points={areaPoints} />
    </svg>
  );
};

const AreaChart = ({ data: chartData, simplified = false, displaySymbol, range, setRange, showTimeframes = true }) => {
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);
  const now = new Date();
  let startTime;
  switch (range) {
    case '1W': startTime = new Date(now.getTime() - 7 * 24 * 3600 * 1000); break;
    case '1M': startTime = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); break;
    case '3M': startTime = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()); break;
    case '1Y': startTime = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); break;
    case 'All': startTime = chartData.length > 1 ? new Date(chartData[0].t) : new Date(0); break;
    case 'YTD': default: startTime = new Date(now.getFullYear(), 0, 1); break;
  }
  
  const filteredData = chartData.filter(d => d.t >= startTime.getTime());
  const data = useMemo(() => {
      if(filteredData.length === 0) return [{t: startTime.getTime(), v: 0}, {t: now.getTime(), v: 0}];
      if(filteredData.length > 0 && filteredData[0].t > startTime.getTime()){
          const firstValue = filteredData.find(d => d.v > 0)?.v || 0;
          return [{t: startTime.getTime(), v: firstValue}, ...filteredData];
      }
      return filteredData;
  }, [filteredData, startTime, now]);

  const height = simplified ? 80 : 250;
  const width = 700;
  const padding = { top: simplified ? 5 : 20, bottom: simplified ? 5 : 40, left: 0, right: simplified ? 0 : 80 };
  
  const yValues = data.map(d => d.v); const minVal = Math.min(...yValues); const maxVal = Math.max(...yValues);
  const valRange = maxVal - minVal || 1; const timeStart = data[0].t; const timeEnd = data[data.length - 1].t;
  const xScale = (t) => padding.left + ((t - timeStart) / (timeEnd - timeStart || 1)) * (width - padding.left - padding.right);
  const yScale = (v) => padding.top + (1 - (v - minVal) / valRange) * (height - padding.top - padding.bottom);

  const createSmoothPath = (points, x, y) => {
    if (points.length < 2) return "";
    if (points.length === 2) return `M ${x(points[0].t)},${y(points[0].v)} L ${x(points[1].t)},${y(points[1].v)}`;
    
    let path = `M ${x(points[0].t)},${y(points[0].v)}`;
    for (let i = 0; i < points.length - 1; i++) {
        const x0 = x(points[i].t); const y0 = y(points[i].v);
        const x1 = x(points[i + 1].t); const y1 = y(points[i + 1].v);
        const xc = (x0 + x1) / 2;
        path += ` C ${xc},${y0} ${xc},${y1} ${x1},${y1}`;
    } 
    return path;
  };
  const path = createSmoothPath(data, xScale, yScale);
  const areaPath = `${path} L ${xScale(timeEnd)},${height - padding.bottom} L ${xScale(timeStart)},${height - padding.bottom} Z`;
  
  const lastPoint = data[data.length - 1];
  const lastX = xScale(lastPoint.t);
  const lastY = yScale(lastPoint.v);

  const handleMouseMove = (event) => {
    if (simplified || !svgRef.current || data.length < 2) return;
    const svg = svgRef.current; const rect = svg.getBoundingClientRect(); const x = event.clientX - rect.left;
    const boundedX = Math.max(padding.left, Math.min(x, width - padding.right));
    const time = timeStart + ((boundedX - padding.left) / (width - padding.left - padding.right)) * (timeEnd - timeStart);
    let closestPoint = data.reduce((prev, curr) => Math.abs(curr.t - time) < Math.abs(prev.t - time) ? curr : prev);
    if (closestPoint) setHoverData({ point: closestPoint, x: xScale(closestPoint.t), y: yScale(closestPoint.v) });
  };

  return (
    <div>
      <div className="relative group">
        <svg ref={svgRef} width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio={simplified ? "none" : "xMidYMid meet"} onMouseMove={handleMouseMove} onMouseLeave={() => setHoverData(null)} className="cursor-crosshair">
          <defs>
              <linearGradient id="areaGradientBroker" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                  </feMerge>
              </filter>
          </defs>
          
          <path d={areaPath} fill="url(#areaGradientBroker)" style={{ transition: 'd 0.3s ease' }} />
          <path d={path} fill="none" stroke="#10B981" strokeWidth={simplified ? "1.5" : "2.5"} strokeLinejoin="round" strokeLinecap="round" style={{ transition: 'd 0.3s ease' }} filter={!simplified ? "url(#glow)" : ""} />
          
          {!simplified && (
             <line x1={0} x2={width - padding.right} y1={lastY} y2={lastY} stroke="#10B981" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" className="transition-all duration-300" />
          )}
          
          <circle cx={lastX} cy={lastY} r={simplified ? "2" : "4"} fill="#10B981" className="animate-pulse" />

          {!simplified && (
            <>
              {Array.from({length: 5}, (_, i) => minVal + (valRange / 4) * i).map((v, idx) => {
                  let strLabel = '';
                  if(displaySymbol === 'Rp') {
                      if(v >= 1e12) strLabel = `Rp ${(v/1e12).toFixed(1)}T`;
                      else if(v >= 1e9) strLabel = `Rp ${(v/1e9).toFixed(1)}B`;
                      else if(v >= 1e6) strLabel = `Rp ${(v/1e6).toFixed(1)}M`;
                      else if(v >= 1e3) strLabel = `Rp ${(v/1e3).toFixed(1)}K`;
                      else strLabel = `Rp ${v}`;
                  } else {
                      if(v >= 1e12) strLabel = `$${(v/1e12).toFixed(1)}T`;
                      else if(v >= 1e9) strLabel = `$${(v/1e9).toFixed(1)}B`;
                      else if(v >= 1e6) strLabel = `$${(v/1e6).toFixed(1)}M`;
                      else if(v >= 1e3) strLabel = `$${(v/1e3).toFixed(1)}K`;
                      else strLabel = `$${v}`;
                  }
                  return (
                  <g key={idx}>
                      <text x={width - padding.right + 6} y={yScale(v) + 4} fontSize="10" fill="#6B7280" className="font-semibold">{strLabel}</text>
                  </g>
              )})}
              {Array.from({length: 5}, (_, i) => {const t = timeStart + (i / 4) * (timeEnd - timeStart); return {t, label: new Date(t).toLocaleDateString('en-US', {day: 'numeric', month: 'short'})}}).map((item, idx) => (<text key={idx} x={xScale(item.t)} y={height - padding.bottom + 20} textAnchor="middle" fontSize="10" fill="#6B7280">{item.label}</text>))}
              
              {hoverData && (
                  <g>
                      <line y1={padding.top} y2={height - padding.bottom} x1={hoverData.x} x2={hoverData.x} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
                      <circle cx={hoverData.x} cy={hoverData.y} r="5" fill="#10B981" stroke="white" strokeWidth="2" filter="url(#glow)"/>
                  </g>
              )}
            </>
          )}
        </svg>
        {hoverData && !simplified && (
            <div className="absolute p-3 rounded-xl bg-zinc-800/95 backdrop-blur shadow-2xl border border-white/10 text-white text-xs pointer-events-none transform -translate-x-1/2 -translate-y-full transition-transform" style={{ left: `${(hoverData.x / width) * 100}%`, top: `${hoverData.y - 15}px`, minWidth: '130px', zIndex: 10 }}>
                <div className="text-gray-400 font-medium mb-1">{new Date(hoverData.point.t).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour:'2-digit', minute:'2-digit' })}</div>
                <div className="font-bold text-lg text-emerald-400">{formatCurrency(hoverData.point.v, false, displaySymbol, 1)}</div>
            </div>
        )}
      </div>
      {showTimeframes && <div className="flex justify-center gap-2 mt-4">{['1W', '1M', '3M', 'YTD', '1Y', 'All'].map(r => (<button key={r} onClick={() => setRange(r)} className={`px-4 py-1 text-[11px] font-semibold rounded-full transition-all ${range === r ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'}`}>{r}</button>))}</div>}
    </div>
  );
};

/* ===================== Sub-Components & Pages ===================== */
const EquityGrowthView = ({ equitySeries, displaySymbol, usdIdr, totalEquity }) => {
    const [chartRange, setChartRange] = useState("All"); const [returnPeriod, setReturnPeriod] = useState('Monthly');
    const equityReturnData = useMemo(() => {
        if (equitySeries.length < 2) return []; let periodData = {};
        for (let i = 1; i < equitySeries.length; i++) {
            const currentDate = new Date(equitySeries[i].t); let key;
            if(returnPeriod === 'Daily'){ key = currentDate.toISOString().split('T')[0]; } 
            else if(returnPeriod === 'Monthly'){ key = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`; } 
            else { key = `${currentDate.getFullYear()}`; }
            if (!periodData[key]) { periodData[key] = { startEquity: equitySeries[i-1].v, endEquity: equitySeries[i].v, endDate: currentDate }; } 
            else { periodData[key].endEquity = equitySeries[i].v; periodData[key].endDate = currentDate; }
        }
        return Object.keys(periodData).map(key => {
            const item = periodData[key]; const pnl = item.endEquity - item.startEquity; const pnlPct = item.startEquity > 0 ? (pnl / item.startEquity) * 100 : 0;
            const date = new Date(item.endDate); let dateLabel = key;
            if(returnPeriod === 'Monthly') dateLabel = date.toLocaleString('default', { month: 'short', year: 'numeric' });
            else if(returnPeriod === 'Daily') dateLabel = date.toLocaleString('default', { month: 'short', day: 'numeric' });
            return { date: dateLabel, equity: item.endEquity, pnl, pnlPct, rawDate: item.endDate }
        }).sort((a,b) => b.rawDate - a.rawDate);
    }, [equitySeries, returnPeriod]);
    return ( <div className="p-1"> <div><p className="text-sm text-gray-400">Total Equity</p><p className="text-2xl sm:text-3xl font-bold text-white mb-1 truncate w-full">{formatCurrency(totalEquity, false, displaySymbol, usdIdr)}</p></div> <div className="mt-6"><AreaChart data={equitySeries} displaySymbol={displaySymbol} range={chartRange} setRange={setChartRange} /></div> <div className="mt-8 max-h-64 overflow-y-auto"> <div className="flex justify-between items-center mb-4 sticky top-0 bg-zinc-900/80 backdrop-blur-sm py-2"><h3 className="text-base font-semibold text-white">Total Equity Return</h3><div className="flex items-center gap-2 text-sm">{['Daily', 'Monthly', 'Yearly'].map(p => (<button key={p} onClick={() => setReturnPeriod(p)} className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs ${returnPeriod === p ? 'bg-zinc-700 text-white' : 'text-gray-400'}`}>{p}</button>))}</div></div> <table className="w-full text-xs sm:text-sm"> <thead className="text-left text-gray-500 text-xs"><tr><th className="p-2 font-normal">Date</th><th className="p-2 font-normal text-right">Equity</th><th className="p-2 font-normal text-right">P&L</th></tr></thead> <tbody>{equityReturnData.map((item, index) => (<tr key={index} className="border-t border-white/10"><td className="p-2 text-white">{item.date}</td><td className="p-2 text-white text-right tabular-nums whitespace-nowrap">{formatCurrencyShort(item.equity, false, displaySymbol, usdIdr)}</td><td className={`p-2 text-right tabular-nums whitespace-nowrap ${item.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{item.pnl >= 0 ? '+' : ''}{formatCurrencyShort(item.pnl, false, displaySymbol, usdIdr)} <br className="sm:hidden" />({item.pnlPct.toFixed(2)}%)</td></tr>))}</tbody> </table> </div> </div> );
};

/* ================== UPDATED TRADE STATS VIEW ================== */
const TradeStatsView = ({ stats, transactions, displaySymbol, usdIdr, assets }) => {
    const [chartRange, setChartRange] = useState("All");
    
    // Exact Win Rate Circle math
    const radius = 45;
    const circumference = 2 * Math.PI * radius; // ~282.74
    const dashOffset = circumference * (stats.winRate / 100);

    const { maxProfitPct, maxLossPct } = useMemo(() => { 
        const maxProfitTx = transactions.find(tx => tx.realized === stats.maxProfit); 
        const profitPct = maxProfitTx && maxProfitTx.costOfSold > 0 ? (maxProfitTx.realized / maxProfitTx.costOfSold) * 100 : 0; 
        const maxLossTx = transactions.find(tx => tx.realized === stats.maxLoss); 
        const lossPct = maxLossTx && maxLossTx.costOfSold > 0 ? (maxLossTx.realized / maxLossTx.costOfSold) * 100 : 0; 
        return { maxProfitPct: profitPct, maxLossPct: lossPct }; 
    }, [transactions, stats.maxProfit, stats.maxLoss]);
    
    const realizedGainSeries = useMemo(() => { 
        const sorted = [...transactions.filter(t => t.type === 'sell' || t.type === 'delete')].sort((a, b) => a.date - b.date); 
        let cumulativeGain = 0; 
        const points = sorted.map(tx => { 
            cumulativeGain += tx.realized || 0; 
            return { t: tx.date, v: displaySymbol === '$' ? cumulativeGain : cumulativeGain * usdIdr }; 
        }); 
        if (points.length > 0) points.unshift({ t: points[0].t - 86400000, v: 0 }); 
        return points.length ? points : [{ t: Date.now() - 1000, v: 0 }, {t: Date.now(), v:0}]; 
    }, [transactions, displaySymbol, usdIdr]);
    
    const sells = useMemo(() => transactions.filter(tx => tx.type === 'sell' || tx.type === 'delete'), [transactions]); 
    
    const { topGainers, topLosers } = useMemo(() => { 
        const gainers = {}; 
        sells.forEach(tx => { 
            if (!gainers[tx.symbol]) gainers[tx.symbol] = { trades: 0, pnl: 0, cost: 0, image: tx.image }; 
            gainers[tx.symbol].trades++; 
            gainers[tx.symbol].pnl += tx.realized; 
            gainers[tx.symbol].cost += tx.costOfSold || 0;
            if (tx.image) gainers[tx.symbol].image = tx.image;
        }); 
        
        const arr = Object.entries(gainers).map(([symbol, data]) => ({ symbol, ...data, pnlPct: data.cost > 0 ? (data.pnl / data.cost) * 100 : 0 }));
        return {
            topGainers: arr.filter(g => g.pnl > 0).sort((a, b) => b.pnl - a.pnl).slice(0, 3),
            topLosers: arr.filter(g => g.pnl < 0).sort((a, b) => a.pnl - b.pnl).slice(0, 3)
        };
    }, [sells]);

    if (!stats || stats.trades === 0) return <div className="p-8 text-center text-gray-500">No trade data available yet. Start trading to see your performance.</div>;

    return (
        <div className="p-2 sm:p-4 text-gray-300 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center border-b border-white/10 pb-6">
                
                {/* Donut Chart (Data Driven Presisi) */}
                <div className="flex-shrink-0 relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Lingkaran Dasar (Losses) -> Merah */}
                        <circle cx="50%" cy="50%" r={`${radius}%`} stroke="#EF4444" strokeWidth="8" fill="transparent" />
                        {/* Lingkaran Overlay (Wins) -> Hijau, Diukur dinamis */}
                        <circle cx="50%" cy="50%" r={`${radius}%`} stroke="#10B981" strokeWidth="8" fill="transparent" strokeDasharray={`${dashOffset} ${circumference}`} strokeLinecap="round"/>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="text-xl font-bold text-white leading-tight">{stats.winRate.toFixed(1)}%</div>
                        <div className="text-[9px] text-gray-400 mt-0.5">Win Rate</div>
                        <div className="text-[10px] mt-1 space-x-1 font-medium bg-black/40 px-2 rounded-full border border-white/5">
                            <span className="text-emerald-400" title={`${stats.wins} Winning Trades`}>{stats.wins}W</span>
                            <span className="text-gray-500">/</span>
                            <span className="text-red-400" title={`${stats.losses} Losing Trades`}>{stats.losses}L</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    <div className="flex flex-col justify-between glass-card p-3 min-w-0">
                        <span className="text-[10px] sm:text-xs text-gray-400 mb-1 flex items-center gap-1"><AvgProfitIcon className="w-3.5 h-3.5"/> Avg Profit</span>
                        <span className="text-base sm:text-lg font-semibold text-emerald-400 truncate">+{formatCurrencyCompact(stats.avgProfit, true, displaySymbol, usdIdr)}</span>
                    </div>
                    <div className="flex flex-col justify-between glass-card p-3 min-w-0">
                        <span className="text-[10px] sm:text-xs text-gray-400 mb-1 flex items-center gap-1"><ArrowUpIcon className="text-emerald-400"/> Max Profit</span>
                        <div>
                            <span className="text-base sm:text-lg font-semibold text-emerald-400 truncate block">+{formatCurrencyCompact(stats.maxProfit, true, displaySymbol, usdIdr)}</span>
                            <span className="text-[9px] sm:text-[10px] text-emerald-400/80">+{maxProfitPct.toFixed(2)}%</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between glass-card p-3 min-w-0">
                        <span className="text-[10px] sm:text-xs text-gray-400 mb-1 flex items-center gap-1"><AvgLossIcon className="w-3.5 h-3.5"/> Avg Loss</span>
                        <span className="text-base sm:text-lg font-semibold text-red-400 truncate">{formatCurrencyCompact(stats.avgLoss, true, displaySymbol, usdIdr)}</span>
                    </div>
                     <div className="flex flex-col justify-between glass-card p-3 min-w-0">
                        <span className="text-[10px] sm:text-xs text-gray-400 mb-1 flex items-center gap-1"><ArrowDownIcon className="text-red-400"/> Max Loss</span>
                        <div>
                            <span className="text-base sm:text-lg font-semibold text-red-400 truncate block">{formatCurrencyCompact(stats.maxLoss, true, displaySymbol, usdIdr)}</span>
                            <span className="text-[9px] sm:text-[10px] text-red-400/80">{maxLossPct.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-white/10 pb-6">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h3 className="text-sm text-gray-500 font-medium">Total Realized Gain</h3>
                        <div className={`text-3xl font-bold mt-1 ${stats.totalRealizedGain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {stats.totalRealizedGain >= 0 ? '+' : ''}{formatCurrency(stats.totalRealizedGain, true, displaySymbol, usdIdr)}
                        </div>
                    </div>
                </div>
                <div className="h-48">
                    <AreaChart data={realizedGainSeries} displaySymbol={displaySymbol} range={chartRange} setRange={setChartRange} showTimeframes={false}/>
                </div>
            </div>

            {/* Dibagi Menjadi Dua Kolom: Gainers dan Losers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                     <h3 className="text-sm text-gray-500 font-medium mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Top Gainers
                     </h3>
                     <div className="space-y-1">
                         {topGainers.map(g => {
                             const assetMatch = assets.find(a => a.symbol === g.symbol);
                             const imgSrc = assetMatch?.image || g.image || `https://ui-avatars.com/api/?name=${g.symbol}&background=random&color=fff&rounded=true&bold=true`;

                             return (
                                <div key={g.symbol} className="flex justify-between items-center group hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <img src={imgSrc} alt={g.symbol} className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center object-cover shrink-0 border border-white/5" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${g.symbol}&background=random&color=fff&rounded=true&bold=true`; }} />
                                        <div>
                                            <div className="font-semibold text-white text-sm">{g.symbol}</div>
                                            <div className="text-[10px] text-gray-500">{g.trades} trades</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-sm text-emerald-400">+{formatCurrencyShort(g.pnl, true, displaySymbol, usdIdr)}</div>
                                        <div className="text-[10px] font-medium text-emerald-500/80">+{g.pnlPct.toFixed(2)}%</div>
                                    </div>
                                </div>
                             );
                         })}
                         {topGainers.length === 0 && <div className="text-gray-500 text-sm italic py-2">No winning trades yet</div>}
                     </div>
                 </div>

                 <div>
                     <h3 className="text-sm text-gray-500 font-medium mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-red-500"></span> Top Losers
                     </h3>
                     <div className="space-y-1">
                         {topLosers.map(g => {
                             const assetMatch = assets.find(a => a.symbol === g.symbol);
                             const imgSrc = assetMatch?.image || g.image || `https://ui-avatars.com/api/?name=${g.symbol}&background=random&color=fff&rounded=true&bold=true`;

                             return (
                                <div key={g.symbol} className="flex justify-between items-center group hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <img src={imgSrc} alt={g.symbol} className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center object-cover shrink-0 border border-white/5" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${g.symbol}&background=random&color=fff&rounded=true&bold=true`; }} />
                                        <div>
                                            <div className="font-semibold text-white text-sm">{g.symbol}</div>
                                            <div className="text-[10px] text-gray-500">{g.trades} trades</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-sm text-red-400">{formatCurrencyShort(g.pnl, true, displaySymbol, usdIdr)}</div>
                                        <div className="text-[10px] font-medium text-red-500/80">{g.pnlPct.toFixed(2)}%</div>
                                    </div>
                                </div>
                             );
                         })}
                         {topLosers.length === 0 && <div className="text-gray-500 text-sm italic py-2">No losing trades yet</div>}
                     </div>
                 </div>
            </div>
        </div>
    );
};

const HistoryView = ({ transactions, usdIdr, displaySymbol, onDeleteTransaction }) => ( <div className="p-1 max-h-[70vh] overflow-y-auto"> <table className="w-full text-[10px] sm:text-sm"> <thead className="text-left text-gray-500 text-xs sticky top-0 bg-zinc-900/80 backdrop-blur-sm z-10"> <tr><th className="p-2 sm:p-3">Time</th><th className="p-2 sm:p-3">Type</th><th className="p-2 sm:p-3">Detail</th><th className="p-2 sm:p-3 text-right">Nominal</th><th className="p-2 sm:p-3 text-right">Action</th></tr> </thead> <tbody> {[...transactions].sort((a,b) => b.date - a.date).map(tx => ( <tr key={tx.id} className="border-t border-white/10 hover:bg-white/5 transition-colors"> <td className="p-2 sm:p-3 text-gray-400 text-[9px] sm:text-xs">{new Date(tx.date).toLocaleDateString()}<br/>{new Date(tx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td> <td className="p-2 sm:p-3 capitalize font-semibold">{tx.type}</td> <td className="p-2 sm:p-3 text-[9px] sm:text-xs truncate max-w-[80px] sm:max-w-[150px]">{tx.type === 'buy' || tx.type === 'sell' || tx.type === 'delete' ? (<><div><strong className="truncate block">{tx.symbol}</strong></div><div className="truncate">{formatQty(tx.qty)} @ {formatCurrencyShort(tx.pricePerUnit, true, displaySymbol, usdIdr)}</div></>) : (<span>-</span>)}</td> <td className="p-2 sm:p-3 text-right tabular-nums whitespace-nowrap">{formatCurrencyShort(tx.type === 'deposit' || tx.type === 'withdraw' ? tx.amount : (tx.cost || tx.proceeds || 0) * usdIdr, false, 'Rp', usdIdr)}</td> <td className="p-2 sm:p-3 text-right align-middle">
      <button onClick={(e) => { e.stopPropagation(); onDeleteTransaction(tx.id); }} className="text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 p-1.5 sm:p-2 rounded-md inline-flex items-center justify-center cursor-pointer relative z-20">
          <TrashIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
  </td> </tr> ))} {transactions.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-500">No history</td></tr>} </tbody> </table> </div> );

const BalanceManager = ({ onConfirm, displaySymbol }) => { 
    const [amount, setAmount] = useState(''); 
    const currencyName = displaySymbol === '$' ? 'USD' : 'IDR';
    
    return ( 
        <form onSubmit={(e) => { e.preventDefault(); onConfirm(amount); }} className="space-y-4"> 
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Amount (in {currencyName})</label>
                <input type="number" step="any" value={amount} onChange={e => setAmount(e.target.value)} autoFocus className="w-full bg-zinc-800 px-3 py-2 rounded border border-zinc-700 text-white" placeholder={`e.g. ${displaySymbol === '$' ? '1000' : '1000000'}`} />
            </div> 
            <button type="submit" className="w-full py-2.5 rounded font-semibold bg-emerald-600 text-white hover:bg-emerald-500">Confirm</button> 
        </form> 
    ); 
};

const ManagePortfolioSheet = ({ onAddBalance, onWithdraw, onClearAll, onExport, onImport }) => ( <div className="p-4 text-white text-sm"> <h3 className="text-base font-semibold mb-4 px-2">Manage Portfolio</h3> <div className="space-y-1"> <button onClick={onAddBalance} className="w-full text-left p-2 rounded hover:bg-zinc-700/50 text-gray-300">Add Balance</button> <button onClick={onWithdraw} className="w-full text-left p-2 rounded hover:bg-zinc-700/50 text-gray-300">Withdraw</button> <div className="border-t border-zinc-700 my-2"></div> <button onClick={onExport} className="w-full text-left p-2 rounded hover:bg-zinc-700/50 text-gray-300">Export as CSV</button> <button onClick={onImport} className="w-full text-left p-2 rounded hover:bg-zinc-700/50 text-gray-300">Import from CSV/TSV</button> <div className="border-t border-zinc-700 my-2"></div> <button onClick={onClearAll} className="w-full text-left p-2 rounded hover:bg-red-700/20 text-red-400">Erase all data</button> </div> </div> );

const AddAssetForm = ({ searchMode, setSearchMode, query, setQuery, suggestions, setSelectedSuggestion, isSearching, addAssetWithInitial, addNonLiquidAsset, nlName, setNlName, nlQty, setNlQty, nlPrice, setNlPrice, nlPriceCcy, setNlPriceCcy, nlPurchaseDate, setNlPurchaseDate, nlCoupon, setNlCoupon, nlYoy, setNlYoy, nlDesc, setNlDesc, nlIncomeFreq, setNlIncomeFreq, displaySymbol, handleSetWatchedAsset, watchedAssets }) => {
    const [shares, setShares] = useState(''); const [price, setPrice] = useState(''); const [total, setTotal] = useState('');
    const handleInputChange = (field, value) => { if (field === 'shares') { setShares(value); const num = toNum(price) * toNum(value); setTotal(num >= 0 ? `${num}` : ''); } else if (field === 'price') { setPrice(value); const num = toNum(value) * toNum(shares); setTotal(num >= 0 ? `${num}` : ''); } else if (field === 'total') { setTotal(value); const nTotal = toNum(value), nShares = toNum(shares); if (nShares > 0 && nTotal >= 0) setPrice(String((nTotal / nShares).toFixed(8))); } };
    return ( <div className="space-y-4"> <div className="flex border-b border-white/10">{[{ key: 'stock', label: 'Stock' }, { key:'crypto', label:'Crypto' }, { key:'nonliquid', label: 'Alternative Assets' }].map(item => (<button key={item.key} onClick={() => setSearchMode(item.key)} className={`px-3 py-2 text-sm font-medium ${searchMode === item.key ? 'text-white border-b-2 border-emerald-400' : 'text-gray-400'}`}>{item.label}</button>))}</div> {searchMode !== 'nonliquid' ? ( <div className="space-y-4"> <div className="relative">
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by code or name..." className="w-full rounded bg-zinc-800 px-3 py-2 text-sm outline-none border border-zinc-700 text-white pr-10" />
      {isSearching && <div className="absolute right-3 top-2.5 w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>}
      {suggestions.length > 0 && <div className="absolute z-50 mt-1 w-full glass-card max-h-56 overflow-auto">{suggestions.map((s, i) => (<div key={i} className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center gap-3"><button className="flex-1 flex items-center gap-3 text-left overflow-hidden" onClick={() => { setSelectedSuggestion(s); setQuery(s.display); setSuggestions([]); }}><img src={s.image} alt={s.symbol} className="w-5 h-5 rounded-full bg-zinc-700 object-cover shrink-0 border border-white/5" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${s.symbol}&background=random&color=fff&rounded=true&bold=true`; }} /><div className="flex-1 min-w-0"><div className="font-medium text-gray-100 truncate w-full">{s.display}</div><div className="text-xs text-gray-400">{s.exchange || s.source}</div></div></button>
        <button onClick={() => handleSetWatchedAsset({ id: s.id, symbol: s.symbol, name: s.display, type: s.type, image: s.image })} className="text-yellow-500 hover:text-yellow-400 p-1 shrink-0"><StarIcon isFilled={watchedAssets.some(w => w.id === s.id)} /></button>
    </div>))}</div>}</div> <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-xs text-gray-400">Qty</label><input value={shares} onChange={e => handleInputChange('shares', e.target.value)} className="w-full mt-1 rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" type="text" /></div><div><label className="text-xs text-gray-400">Price ({displaySymbol})</label><input value={price} onChange={e => handleInputChange('price', e.target.value)} className="w-full mt-1 rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" type="text" /></div></div> <div><label className="text-xs text-gray-400">Total Value ({displaySymbol})</label><input value={total} onChange={e => handleInputChange('total', e.target.value)} className="w-full mt-1 rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" type="text" /></div> <div className="flex justify-end"><button onClick={() => addAssetWithInitial(shares, price)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded font-semibold">Add Position</button></div> </div> ) : ( 
        <div className="space-y-4"> 
            <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input value={nlName} onChange={e => setNlName(e.target.value)} placeholder="Category (Property, Bond, Dividend, Land)" className="rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" />
                    <input value={nlQty} onChange={e => setNlQty(e.target.value)} placeholder="Qty / Units" type="number" className="rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" />
                    <div className="flex gap-2">
                        <input value={nlPrice} onChange={e => setNlPrice(e.target.value)} placeholder="Purchase Price" type="number" className="flex-1 rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" />
                        <select value={nlPriceCcy} onChange={e => setNlPriceCcy(e.target.value)} className="w-24 rounded bg-zinc-800 px-2 py-2 text-sm border border-zinc-700 text-white"><option value="IDR">IDR</option><option value="USD">USD</option></select>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col justify-center flex-1">
                            <span className="text-[10px] text-gray-500 ml-1 mb-0.5">Purchase Date</span>
                            <input type="date" value={nlPurchaseDate} onChange={e => setNlPurchaseDate(e.target.value)} className="rounded bg-zinc-800 px-3 py-1.5 text-sm border border-zinc-700 text-white w-full" />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                            <span className="text-[10px] text-gray-500 ml-1 mb-0.5">Income Frequency</span>
                            <select value={nlIncomeFreq} onChange={e => setNlIncomeFreq(e.target.value)} className="rounded bg-zinc-800 px-2 py-1.5 text-sm border border-zinc-700 text-white w-full">
                                <option value="None">None</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Semi Annual">Semi Annual</option>
                                <option value="Annual">Annual</option>
                            </select>
                        </div>
                    </div>
                    <input value={nlCoupon} onChange={e => setNlCoupon(e.target.value)} placeholder="Coupon / Income (Nominal)" type="number" className="rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" />
                    <input value={nlYoy} onChange={e => setNlYoy(e.target.value)} placeholder="YoY Gain (%)" type="number" className="rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" />
                </div>
                <input value={nlDesc} onChange={e => setNlDesc(e.target.value)} placeholder="Description (Optional)" className="w-full rounded bg-zinc-800 px-3 py-2 text-sm border border-zinc-700 text-white" />
            </div> 
            <div className="flex justify-end pt-2">
                <button onClick={addNonLiquidAsset} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded font-semibold">Add Asset</button>
            </div> 
        </div> )} </div> );
};

const AlternativeAssetDetails = ({ asset, usdIdr, displaySymbol }) => {
    const purchase = new Date(asset.purchaseDate || asset.createdAt);
    const now = new Date();
    
    let years = now.getFullYear() - purchase.getFullYear();
    let months = now.getMonth() - purchase.getMonth();
    let days = now.getDate() - purchase.getDate();
    
    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }
    
    const holdingPeriod = `${years > 0 ? years + ' Yr ' : ''}${months > 0 ? months + ' Mo ' : ''}${days} D`;
    const formatAmt = (val) => formatCurrency(val, true, displaySymbol, usdIdr);
    
    const exactYearsPassed = asset.exactYearsPassed || 0;
    const validPeriods = asset.validPeriods || 0;
    
    const freq = asset.incomeFrequency || 'None';
    const incomePerPeriod = freq !== 'None' ? asset.coupon * asset.shares : 0;
    
    let periodsPerYear = 1;
    if (freq === 'Monthly') periodsPerYear = 12;
    if (freq === 'Quarterly') periodsPerYear = 4;
    if (freq === 'Semi Annual') periodsPerYear = 2;
    
    const annualIncome = incomePerPeriod * periodsPerYear;

    return (
        <div className="space-y-4">
            <div className="glass-card p-4 space-y-4 text-sm bg-zinc-900/50">
                <h4 className="font-semibold text-white border-b border-white/10 pb-2">Valuation Details & Logic</h4>
                
                <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-gray-500 text-[10px] sm:text-xs block">Purchase Date</span><span className="text-gray-200 font-medium">{purchase.toLocaleDateString()}</span></div>
                    <div><span className="text-gray-500 text-[10px] sm:text-xs block">Holding Period</span><span className="text-gray-200 font-medium">{holdingPeriod}</span></div>
                    <div><span className="text-gray-500 text-[10px] sm:text-xs block">Initial Invested</span><span className="text-gray-200 font-medium tabular-nums">{formatAmt(asset.investedUSD)}</span></div>
                    <div><span className="text-gray-500 text-[10px] sm:text-xs block">Avg Price / Unit</span><span className="text-gray-200 font-medium tabular-nums">{formatAmt(asset.avgPrice)}</span></div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="font-medium text-emerald-400 mb-1 flex items-center gap-2">
                        <TrendingUpIcon className="w-4 h-4" /> Capital Growth Calculation
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>YoY Growth Rate: <strong className="text-white">{asset.nonLiquidYoy || 0}%</strong></span>
                        <span>Years Passed: <strong className="text-white">{exactYearsPassed.toFixed(2)}</strong></span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 font-mono bg-black/40 p-2 rounded break-all">
                        Invested + (Invested × {asset.nonLiquidYoy || 0}% × {exactYearsPassed.toFixed(2)})
                    </div>
                    <div className="text-right mt-2 text-sm">
                        <span className="text-gray-500 mr-2">Est. Capital Value =</span>
                        <span className="font-semibold text-white tabular-nums">{formatAmt(asset.capitalValueUSD || asset.investedUSD)}</span>
                    </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <div className="font-medium text-sky-400 mb-2 flex items-center gap-2">
                        <WalletIcon className="w-4 h-4" /> Income Generation Calculation
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] sm:text-xs text-gray-300 mb-3">
                        <div><span className="text-gray-500 block">Frequency</span><span className="font-medium">{freq}</span></div>
                        <div><span className="text-gray-500 block">Income per Period</span><span className="tabular-nums font-medium text-white">{formatAmt(incomePerPeriod)}</span></div>
                        <div><span className="text-gray-500 block">Est. Annual Income</span><span className="tabular-nums font-medium">{formatAmt(annualIncome)}</span></div>
                        <div><span className="text-gray-500 block">Periods Passed</span><span className="font-medium">{validPeriods}x</span></div>
                    </div>
                    
                    {freq !== 'None' ? (
                        <>
                            <div className="text-[10px] sm:text-xs text-gray-400 font-mono bg-black/40 p-2 rounded">
                                {formatAmt(incomePerPeriod)} × {validPeriods} periods
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                                <div className="text-[10px] sm:text-xs">
                                    <span className="text-gray-500 block sm:inline">Next Income Date: </span>
                                    <span className="text-gray-200 font-medium">{asset.nextIncomeDate ? new Date(asset.nextIncomeDate).toLocaleDateString() : '-'}</span>
                                </div>
                                <div className="text-right text-sm">
                                    <span className="text-gray-500 mr-2">Accumulated =</span>
                                    <span className="font-semibold text-white tabular-nums">{formatAmt(asset.accumulatedCouponUSD || 0)}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-xs text-gray-500 italic mt-1 bg-black/20 p-2 rounded text-center">No income frequency active.</div>
                    )}
                </div>
                
                <div className="flex justify-between items-center p-3 bg-zinc-800/80 rounded-lg border border-white/10 mt-2">
                    <span className="text-sm font-semibold text-gray-300">Total Market Value</span>
                    <span className="text-lg font-bold text-emerald-400 tabular-nums">{formatAmt(asset.marketValueUSD)}</span>
                </div>
            </div>
        </div>
    );
};

const AssetDetailModal = ({ isOpen, onClose, asset, onBuy, onSell, onDelete, usdIdr, displaySymbol }) => {
    if (!isOpen || !asset) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={<div className="truncate max-w-[200px] sm:max-w-full">{`${asset.symbol} - ${asset.name}`}</div>} size="3xl">
            <div className="space-y-4">
                {asset.type === 'nonliquid' ? (
                    <AlternativeAssetDetails asset={asset} usdIdr={usdIdr} displaySymbol={displaySymbol} />
                ) : (
                    <TradingViewWidget asset={asset} />
                )}
                {asset.shares > 0 && (
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <TradeForm asset={asset} onBuy={onBuy} onSell={onSell} onDelete={onDelete} usdIdr={usdIdr} displaySymbol={displaySymbol} />
                    </div>
                )}
            </div>
        </Modal>
    );
};

const TradeForm = ({ asset, onBuy, onSell, onDelete, usdIdr, displaySymbol }) => {
    const [mode, setMode] = useState('buy'); const [shares, setShares] = useState(''); const [price, setPrice] = useState(''); const [total, setTotal] = useState('');
    useEffect(() => { if (asset) { const priceVal = displaySymbol === "Rp" ? asset.lastPriceUSD * usdIdr : asset.lastPriceUSD; setPrice(String(isFinite(priceVal) ? (displaySymbol === "$" ? priceVal.toFixed(8) : Math.round(priceVal)) : '')); setShares(''); setTotal(''); } }, [asset, usdIdr, displaySymbol, mode]);
    const handleInputChange = (field, value) => { if (field === 'shares') { setShares(value); const nPrice = toNum(price), nShares = toNum(value); setTotal(nPrice >= 0 && nShares >= 0 ? (nPrice * nShares).toString() : ''); } else if (field === 'price') { setPrice(value); const nPrice = toNum(value), nShares = toNum(shares); setTotal(nPrice >= 0 && nShares >= 0 ? (nPrice * nShares).toString() : ''); } else if (field === 'total') { setTotal(value); const nTotal = toNum(value), nShares = toNum(shares); if (nShares > 0 && nTotal >= 0) setPrice(String((nTotal / nShares).toFixed(8))); } };
    const priceUSD = (displaySymbol === 'Rp') ? toNum(price) / usdIdr : toNum(price);
    const doSubmit = () => { if (mode === 'buy') onBuy(asset, shares, priceUSD); else if (mode === 'sell') onSell(asset, shares, priceUSD); };
    return (<div className="space-y-3"> <div className="flex bg-zinc-800 rounded-full p-1"><button onClick={() => setMode('buy')} className={`w-1/2 py-1.5 text-xs font-semibold rounded-full ${mode === 'buy' ? 'bg-emerald-600 text-white' : 'text-gray-300'}`}>Buy</button><button onClick={() => setMode('sell')} className={`w-1/2 py-1.5 text-xs font-semibold rounded-full ${mode === 'sell' ? 'bg-red-600 text-white' : 'text-gray-300'}`}>Sell</button></div> <div className="grid grid-cols-1 sm:grid-cols-3 gap-2"><div><label className="text-xs text-gray-400">Qty</label><input type="text" value={shares} onChange={e=>handleInputChange('shares', e.target.value)} className="w-full text-sm mt-1 bg-zinc-800 px-2 py-1.5 rounded border border-zinc-700 text-white" /></div> <div><label className="text-xs text-gray-400">Price ({displaySymbol})</label><input type="text" value={price} onChange={e=>handleInputChange('price', e.target.value)} className="w-full text-sm mt-1 bg-zinc-800 px-2 py-1.5 rounded border border-zinc-700 text-white" /></div> <div><label className="text-xs text-gray-400">Total ({displaySymbol})</label><input type="text" value={total} onChange={e=>handleInputChange('total', e.target.value)} className="w-full text-sm mt-1 bg-zinc-800 px-2 py-1.5 rounded border border-zinc-700 text-white" /></div></div> <div className="flex gap-2"><button onClick={doSubmit} className={`flex-1 py-2 rounded font-semibold text-white text-sm ${mode === 'buy' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}>Confirm {mode.charAt(0).toUpperCase() + mode.slice(1)}</button><button onClick={() => onDelete(asset)} title="Delete (liquidate)" className="py-2 px-3 rounded bg-zinc-700 hover:bg-zinc-600 text-white flex items-center gap-2"><TrashIcon className="w-4 h-4 text-white" /></button></div> </div>);
}

const TradingViewWidget = ({ asset }) => {
  const containerRef = useRef(null);
  const widgetContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => { setIsFullscreen(!!document.fullscreenElement); };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) { widgetContainerRef.current?.requestFullscreen().catch(err => { console.error(`Error attempting to enable full-screen mode: ${err.message}`); });
    } else { document.exitFullscreen(); }
  };

  useEffect(() => {
    const scriptId = 'tradingview-widget-script';
    let script = document.getElementById(scriptId);

    const formatSymbolForTV = (asset) => {
      if (asset.type === 'crypto') { return `BINANCE:${asset.symbol.toUpperCase()}USDT`; }
      if (asset.type === 'stock') {
        if (asset.symbol.endsWith('.JK')) { return `IDX:${asset.symbol.replace('.JK', '')}`; }
        if (asset.id === 'SPY' || asset.symbol === 'S&P 500') return `AMEX:SPY`;
        if (asset.id === 'QQQ' || asset.symbol === 'NASDAQ') return `NASDAQ:QQQ`;
        return asset.symbol;
      }
      return asset.symbol;
    };
    
    const createWidget = () => {
        if (containerRef.current && typeof window.TradingView !== 'undefined' && asset) {
            containerRef.current.innerHTML = '';
            new window.TradingView.widget({
                autosize: true, symbol: formatSymbolForTV(asset), interval: "D", timezone: "Asia/Jakarta", theme: "dark", style: "1", locale: "en", enable_publishing: false, allow_symbol_change: false, hide_side_toolbar: true, hide_top_toolbar: false, container_id: containerRef.current.id,
            });
        }
    };

    if (!script) {
        script = document.createElement("script"); script.id = scriptId; script.src = "https://s3.tradingview.com/tv.js"; script.type = "text/javascript"; script.async = true; script.onload = createWidget; document.head.appendChild(script);
    } else { createWidget(); }
  }, [asset]);

  if (!asset) return null;
  const uniqueId = `tradingview-widget-container-${asset.id || asset.symbol}`;
  
  return (
    <div ref={widgetContainerRef} className="tradingview-widget-container relative bg-zinc-900 rounded-lg overflow-hidden h-[50vh] sm:h-[60vh] w-full min-h-[350px]">
      <button onClick={handleToggleFullscreen} className="absolute top-2 right-2 z-10 p-1.5 bg-zinc-800/70 rounded-md hover:bg-zinc-700 transition-colors" aria-label="Toggle Fullscreen">
          {isFullscreen ? <ExitFullscreenIcon className="text-gray-300" /> : <FullscreenIcon className="text-gray-300"/>}
      </button>
      <div id={uniqueId} ref={containerRef} className="w-full h-full"></div>
    </div>
  );
};

const PortfolioAllocation = ({ data: fullAssetData, tradingBalance, displaySymbol, usdIdr }) => {
    const [activeTab, setActiveTab] = useState('Asset');
    const [hoveredSegment, setHoveredSegment] = useState(null);

    const { equityData, sectorData } = useMemo(() => {
        const tradingBalanceUSD = tradingBalance / usdIdr;
        
        // Define specific ordered gradient colors
        const greens = ["#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#064e3b"]; 
        const blues = ["#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"];

        const secDataMap = {
            'Cash': { value: tradingBalanceUSD, color: '#1e40af', icon: <WalletIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" /> },
            'Equity': { value: 0, color: '#059669', icon: <TrendingUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> }, 
            'Crypto': { value: 0, color: '#3b82f6', icon: <CryptoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" /> }, 
            'Alternative Assets': { value: 0, color: '#10b981', icon: <BuildingIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" /> }
        }; 
        fullAssetData.forEach(asset => { 
            if (asset.type === 'stock') secDataMap['Equity'].value += asset.marketValueUSD; 
            else if (asset.type === 'crypto') secDataMap['Crypto'].value += asset.marketValueUSD; 
            else if (asset.type === 'nonliquid') secDataMap['Alternative Assets'].value += asset.marketValueUSD; 
        }); 
        const finalSectorData = Object.entries(secDataMap).map(([name, data]) => ({ name, ...data })).filter(d => d.value > 0.01);

        const allAssets = [
            ...fullAssetData.map(d => ({ name: d.symbol, value: d.marketValueUSD, image: d.image, type: d.type })),
            { name: 'Cash', value: tradingBalanceUSD, image: null, type: 'cash' }
        ].filter(a => a.value > 0.01).sort((a, b) => b.value - a.value);

        let finalEquityData;
        if (allAssets.length > 12) {
            const top11 = allAssets.slice(0, 11);
            const others = allAssets.slice(11);
            const othersValue = others.reduce((sum, item) => sum + item.value, 0);
            finalEquityData = [ ...top11, { name: 'Others', value: othersValue, type: 'other' } ];
        } else {
            finalEquityData = allAssets;
        }

        const assetOnlyCount = finalEquityData.filter(a => a.type !== 'cash' && a.type !== 'other').length;
        const half = Math.ceil(assetOnlyCount / 2);
        let assetIndex = 0;

        finalEquityData = finalEquityData.map((d) => {
            let icon, color;
            if (d.type === 'cash') {
                icon = <WalletIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />;
                color = '#1e3a8a';
            } else if (d.type === 'other') {
                icon = <MoreVerticalIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
                color = '#6b7280';
            } else {
                icon = <img src={d.image || `https://ui-avatars.com/api/?name=${d.name}&background=random&color=fff&rounded=true`} alt={d.name} className="w-full h-full rounded-full object-cover border border-white/5" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${d.name}&background=random&color=fff&rounded=true&bold=true`; }} />;
                
                if (assetIndex < half) {
                    color = greens[Math.min(assetIndex, greens.length - 1)];
                } else {
                    color = blues[Math.min(assetIndex - half, blues.length - 1)];
                }
                assetIndex++;
            }
            return { ...d, icon, color };
        });

        return { equityData: finalEquityData, sectorData: finalSectorData };
    }, [fullAssetData, tradingBalance, usdIdr]);

    const data = activeTab === 'Asset' ? equityData : sectorData;
    const totalValueUSD = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

    if (!totalValueUSD) return <div className="mt-8 text-center text-gray-500">No assets to show in allocation.</div>;
    const totalValueDisplay = totalValueUSD * (displaySymbol === "Rp" ? usdIdr : 1); 
    const size = 200, strokeWidth = 20, innerRadius = (size / 2) - strokeWidth; 
    let accumulatedAngle = 0;

    return ( 
        <div className="p-1 max-h-[70vh] overflow-y-auto">
            <div className="flex gap-2 mb-4">
                <button onClick={() => setActiveTab('Asset')} className={`px-4 py-1 text-sm rounded-full ${activeTab === 'Asset' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-gray-400'}`}>By Asset</button>
                <button onClick={() => setActiveTab('Sector')} className={`px-4 py-1 text-sm rounded-full ${activeTab === 'Sector' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-gray-400'}`}>By Sector</button>
            </div> 
            <div className="relative flex justify-center items-center" style={{ width: size, height: size, margin: '0 auto 2rem auto' }}> 
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90"> 
                    {data.map((d) => { 
                        const angle = totalValueUSD > 0 ? (d.value / totalValueUSD) * 360 : 0; 
                        const segment = (<circle key={d.name} cx={size/2} cy={size/2} r={innerRadius} fill="transparent" stroke={d.color} strokeWidth={strokeWidth + (hoveredSegment === d.name ? 4 : 0)} strokeDasharray={`${Math.max(0, (angle - 2)) * Math.PI * innerRadius / 180} ${360 * Math.PI * innerRadius / 180}`} strokeDashoffset={-accumulatedAngle * Math.PI * innerRadius / 180} className="transition-all duration-300" onMouseOver={() => setHoveredSegment(d.name)} onMouseOut={() => setHoveredSegment(null)}/>); 
                        accumulatedAngle += angle; 
                        return segment; 
                    })} 
                </svg> 
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-lg sm:text-xl font-bold text-white max-w-[120px] text-center truncate">{formatCurrencyCompact(totalValueDisplay, false, displaySymbol, 1)}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{data.length} {activeTab === 'Asset' ? 'Items' : 'Sectors'}</div>
                </div> 
            </div> 
            <div className="space-y-3">{data.map((d) => { 
                const percentage = totalValueUSD > 0 ? (d.value / totalValueUSD) * 100 : 0; 
                const valueDisplay = d.value * (displaySymbol === "Rp" ? usdIdr : 1); 
                return (
                    <div key={d.name} className={`p-2 rounded-lg transition-colors duration-300 ${hoveredSegment === d.name ? 'bg-black/20' : ''}`} onMouseOver={() => setHoveredSegment(d.name)} onMouseOut={() => setHoveredSegment(null)}>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-800/80 flex items-center justify-center font-bold text-white text-xs flex-shrink-0 border border-white/5">
                                {d.icon}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex justify-between items-baseline w-full mb-1.5">
                                    <div className="flex items-baseline gap-2 truncate pr-2">
                                        <span className="font-semibold text-white truncate text-sm">{d.name}</span>
                                        <span className="text-[10px] sm:text-xs text-gray-400 truncate">{formatCurrency(valueDisplay, false, displaySymbol, 1)}</span>
                                    </div>
                                    <span className="text-white font-bold text-[10px] sm:text-xs shrink-0">{percentage.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-zinc-700/50 rounded-full h-1.5 sm:h-2 overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%`, backgroundColor: d.color }}></div>
                                </div>
                            </div>
                        </div>
                    </div>); 
            })}</div> 
        </div> 
    );
};

const AssetOptionsPanel = ({ sortBy, setSortBy, displayAs, setDisplayAs, onClose }) => {
    return (
        <div className="space-y-6 text-gray-300">
            <div>
                <h3 className="font-semibold text-white mb-3">Sort Assets By</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="sort" value="default" checked={sortBy === 'default'} onChange={(e) => setSortBy(e.target.value)} className="accent-emerald-500" /> Default</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="sort" value="allocation" checked={sortBy === 'allocation'} onChange={(e) => setSortBy(e.target.value)} className="accent-emerald-500" /> Allocation (High to Low)</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="sort" value="purchaseDate" checked={sortBy === 'purchaseDate'} onChange={(e) => setSortBy(e.target.value)} className="accent-emerald-500" /> Purchase Date (Oldest First)</label>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-white mb-3">Display As</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="display" value="card" checked={displayAs === 'card'} onChange={(e) => setDisplayAs(e.target.value)} className="accent-emerald-500" /> Cards</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="display" value="table" checked={displayAs === 'table'} onChange={(e) => setDisplayAs(e.target.value)} className="accent-emerald-500" /> Table</label>
                </div>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-end">
                <button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded font-semibold text-sm">Done</button>
            </div>
        </div>
    );
};

const AssetTableView = ({ rows, displaySymbol, usdIdr, onRowClick }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-[10px] sm:text-xs text-gray-400 font-normal">
                    <tr>
                        <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3"><div>Code</div><div className="text-[9px] sm:text-[10px] font-normal mt-0.5">Qty</div></th>
                        <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-right"><div>Invested</div><div className="text-[9px] sm:text-[10px] font-normal mt-0.5">Avg Price</div></th>
                        <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-right"><div>Market</div><div className="text-[9px] sm:text-[10px] font-normal mt-0.5">Current</div></th>
                        <th scope="col" className="px-2 sm:px-4 py-2 sm:py-3 text-right"><div>Gain P&L</div><div className="text-[9px] sm:text-[10px] font-normal mt-0.5">%</div></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(r => {
                        const pnlColor = r.pnlUSD >= 0 ? 'text-emerald-400' : 'text-red-400';
                        const pnlPrefix = r.pnlUSD > 0 ? '+' : '';
                        return (
                            <tr key={r.id} onClick={() => onRowClick(r)} className="border-b border-zinc-800 hover:bg-zinc-800/50 cursor-pointer">
                                <td className="px-2 sm:px-4 py-3 align-top min-w-0 max-w-[80px] sm:max-w-none"><div className="font-medium text-white truncate w-full text-[11px] sm:text-sm">{r.symbol}</div><div className="text-[10px] sm:text-xs text-gray-400 truncate">{formatQty(r.shares)}</div></td>
                                <td className="px-2 sm:px-4 py-3 text-right align-top tabular-nums whitespace-nowrap"><div className="font-medium text-white text-[10px] sm:text-xs">{formatCurrencyShort(r.investedUSD, true, displaySymbol, usdIdr)}</div><div className="text-[9px] sm:text-[10px] text-gray-400">{formatCurrencyShort(r.avgPrice, true, displaySymbol, usdIdr)}</div></td>
                                <td className="px-2 sm:px-4 py-3 text-right align-top tabular-nums whitespace-nowrap"><div className="font-medium text-white text-[10px] sm:text-xs">{formatCurrencyShort(r.marketValueUSD, true, displaySymbol, usdIdr)}</div><div className="text-[9px] sm:text-[10px] text-gray-400">{r.type === 'nonliquid' ? '-' : formatCurrencyShort(r.lastPriceUSD, true, displaySymbol, usdIdr)}</div></td>
                                <td className="px-2 sm:px-4 py-3 text-right align-top tabular-nums whitespace-nowrap"><div className={`font-medium ${pnlColor} text-[10px] sm:text-xs`}>{pnlPrefix}{formatCurrencyShort(r.pnlUSD, true, displaySymbol, usdIdr)}</div><div className={`text-[9px] sm:text-[10px] ${pnlColor}`}>{pnlPrefix}{r.pnlPct.toFixed(2)}%</div></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}


