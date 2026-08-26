import { useState, useRef, useEffect } from "react";
import {
  Search, Bell, Heart, ShoppingBag, Home, User, Plus, Camera,
  ChevronLeft, ChevronRight, Star, MapPin, Truck, Shield,
  BarChart2, Package, MessageSquare, Upload, ChevronDown,
  Zap, ArrowRight, Check, SlidersHorizontal, X, Eye, EyeOff,
  Mail, Lock, Phone, Fingerprint, Smartphone, Monitor, LogOut, ShieldCheck
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/Minimalist_Black_Line_Logo_with_Orange_Gradient__1_.png";

type Screen =
  | "splash"
  | "onboarding-1"
  | "onboarding-2"
  | "onboarding-3"
  | "role-select"
  | "buyer-auth"
  | "seller-auth"
  | "buyer-home"
  | "buyer-product"
  | "buyer-vto"
  | "buyer-cart"
  | "buyer-profile"
  | "buyer-edit-profile"
  | "buyer-orders"
  | "buyer-wishlist"
  | "buyer-addresses"
  | "buyer-payments"
  | "buyer-notifications"
  | "buyer-privacy"
  | "buyer-search"
  | "seller-dashboard"
  | "seller-listings"
  | "seller-messages"
  | "seller-profile"
  | "seller-edit-profile"
  | "seller-notifications"
  | "seller-privacy"
  | "seller-shop-setting"
  | "seller-add";

type Role = "buyer" | "seller" | null;

const ORANGE = "#FF5722";
const YELLOW = "#FFD600";

const products = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    brand: "Nike",
    price: 2499,
    originalPrice: 8500,
    condition: "Excellent",
    size: "UK 9",
    seller: "SneakerHeadKarachi",
    sellerRating: 4.9,
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop&auto=format",
    liked: false,
    category: "Shoes",
  },
  {
    id: 2,
    name: "Vintage Levi's 501 Jacket",
    brand: "Levi's",
    price: 1199,
    originalPrice: 4000,
    condition: "Good",
    size: "M",
    seller: "VintageLahore",
    sellerRating: 4.7,
    img: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&h=400&fit=crop&auto=format",
    liked: true,
    category: "Vintage",
  },
  {
    id: 3,
    name: "New Balance 550 White",
    brand: "New Balance",
    price: 3299,
    originalPrice: 9000,
    condition: "Excellent",
    size: "UK 8",
    seller: "KicksIslamabad",
    sellerRating: 5.0,
    img: "https://images.unsplash.com/photo-1621315271772-28b1f3a5df87?w=400&h=400&fit=crop&auto=format",
    liked: false,
    category: "Shoes",
  },
  {
    id: 4,
    name: "Floral Oversized Shirt",
    brand: "Vintage",
    price: 549,
    originalPrice: 2200,
    condition: "Good",
    size: "L",
    seller: "RetroRawalpindi",
    sellerRating: 4.6,
    img: "https://images.unsplash.com/photo-1511039912745-8bfa0bc56aeb?w=400&h=400&fit=crop&auto=format",
    liked: false,
    category: "Shirts",
  },
  {
    id: 5,
    name: "Adidas Samba OG Black",
    brand: "Adidas",
    price: 2799,
    originalPrice: 7500,
    condition: "Excellent",
    size: "UK 10",
    seller: "SneakerHeadKarachi",
    sellerRating: 4.9,
    img: "https://images.unsplash.com/photo-1718220130188-428c7dc27fd2?w=400&h=400&fit=crop&auto=format",
    liked: false,
    category: "Shoes",
  },
  {
    id: 6,
    name: "Y2K Denim Mini Skirt",
    brand: "Archive",
    price: 699,
    originalPrice: 2800,
    condition: "Good",
    size: "S",
    seller: "VintageLahore",
    sellerRating: 4.7,
    img: "https://images.unsplash.com/photo-1780566758461-8a2e9287abb2?w=400&h=400&fit=crop&auto=format",
    liked: true,
    category: "Vintage",
  },
];

const categories = ["All", "Shoes", "Vintage", "Shirts", "Jackets", "Bags", "Accessories"];

const vtoShoes = [
  { id: 1, name: "Jordan 1", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format" },
  { id: 2, name: "NB 550", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=120&h=120&fit=crop&auto=format" },
  { id: 3, name: "Samba OG", img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=120&h=120&fit=crop&auto=format" },
];

const sellerListings = [
  { id: 1, name: "Air Force 1 '07 White", price: 1899, views: 234, status: "Active", img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=120&h=120&fit=crop&auto=format" },
  { id: 2, name: "Vintage Band Tee – Metallica", price: 799, views: 118, status: "Active", img: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=120&h=120&fit=crop&auto=format" },
  { id: 3, name: "Puma Suede Classic", price: 1299, views: 67, status: "Pending", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState<Role>(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifReturn, setNotifReturn] = useState<Screen>("buyer-profile");
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set([2, 6]));
  const [activeVtoShoe, setActiveVtoShoe] = useState(0);
  const [buyerTab, setBuyerTab] = useState<"home" | "search" | "vto" | "cart" | "profile">("home");
  const [sellerTab, setSellerTab] = useState<"dashboard" | "listings" | "add" | "messages" | "profile">("dashboard");
  // keep sellerTab in sync when navigating by screen directly

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [cartItems, setCartItems] = useState<typeof products>([]);
  const [slideX, setSlideX] = useState(0);
  const [purchased, setPurchased] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<typeof products>([]);
  const [conditionOpen, setConditionOpen] = useState(false);
  const [condition, setCondition] = useState("Excellent");
  const [published, setPublished] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  // Dual-account & role-switch
  const [unlockedRoles, setUnlockedRoles] = useState<Set<Role>>(new Set());
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);

  // Seller inventory: product id → stock count
  const [sellerStock, setSellerStock] = useState<Record<number, number>>({
    1: 3, 2: 1, 3: 2, 4: 5, 5: 2, 6: 3,
    101: 2, 102: 4, 103: 1, 104: 3, 105: 2,
  });
  // Seller notifications
  const [sellerNotifs, setSellerNotifs] = useState<{ id: number; msg: string; type: "sold" | "low" | "oos" }[]>([]);

  // Editable seller profile + shop settings
  const [sellerProfile, setSellerProfile] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+92 300 1234567",
    bio: "Curating the best pre-loved kicks & vintage finds in Lahore ✨",
    shopName: "Priya's Closet",
    location: "Lahore, Punjab",
    shipping: "Standard · 2-3 days",
  });
  const [activeShopField, setActiveShopField] = useState<"shopName" | "location" | "shipping">("shopName");

  // Notification preference toggles
  const [notifPrefs, setNotifPrefs] = useState({
    newOrders: true, messages: true, lowStock: true, priceOffers: true, promotions: false, weeklyReport: true,
  });
  // Privacy & security toggles
  const [privacyPrefs, setPrivacyPrefs] = useState({
    twoFactor: false, showOnlineStatus: true, publicProfile: true, dataSharing: false,
  });

  // Security flows (shared by buyer + seller privacy screens)
  const [securityFlow, setSecurityFlow] = useState<{ type: "change-password" | "manage-devices" | "login-activity" | "biometric" | "2fa"; onDone?: () => void } | null>(null);
  const [devices, setDevices] = useState([
    { id: 1, name: "iPhone 15 Pro", info: "Lahore, PK · This device", current: true, time: "Active now", os: "ios" },
    { id: 2, name: "Chrome · Windows 11", info: "Karachi, PK", current: false, time: "2 days ago", os: "desktop" },
    { id: 3, name: "iPad Air", info: "Islamabad, PK", current: false, time: "1 week ago", os: "ios" },
  ]);

  // Lightweight toast confirmation
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 2200);
  };

  // Authenticated role switching — go through the target role's login screen
  const requestRoleSwitch = (target: "buyer" | "seller") => {
    setShowRoleSwitch(false);
    setAuthMode("login");
    setScreen(target === "buyer" ? "buyer-auth" : "seller-auth");
  };

  // ─── Buyer account state ──────────────────────────────────────────────────────
  const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&auto=format";
  const [buyerProfile, setBuyerProfile] = useState<{ name: string; email: string; phone: string; gender: string; avatar: string | null }>({
    name: "Aryan Kapoor",
    email: "aryan.kapoor@gmail.com",
    phone: "+92 301 2345678",
    gender: "Prefer not to say",
    avatar: DEFAULT_AVATAR,
  });

  // Saved addresses (permanent / temporary)
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", kind: "permanent" as "permanent" | "temporary", line: "House 4B, DHA Phase 6, Lahore, Punjab – 54000", isDefault: true },
    { id: 2, label: "Office", kind: "temporary" as "permanent" | "temporary", line: "Plot 12, Gulberg III, Lahore, Punjab – 54660", isDefault: false },
  ]);

  // Saved payment methods
  const [cards, setCards] = useState([
    { id: 1, brand: "Visa", last4: "4291", exp: "08/27", isDefault: true },
    { id: 2, brand: "Mastercard", last4: "7733", exp: "11/26", isDefault: false },
  ]);

  // Buyer notification & privacy preferences
  const [buyerNotifPrefs, setBuyerNotifPrefs] = useState({
    orderUpdates: true, priceDrops: true, newArrivals: true, messages: true, promotions: false,
  });
  const [buyerPrivacyPrefs, setBuyerPrivacyPrefs] = useState({
    twoFactor: false, biometric: true, hideActivity: false, dataSharing: false, savePayment: true,
  });

  // Mock buyer orders
  const buyerOrders = [
    { id: "TK-10293", name: "Air Jordan 1 Retro High", img: products[0].img, price: 2499, status: "Delivered", date: "12 Jun 2026" },
    { id: "TK-10288", name: "New Balance 550 White", img: products[2].img, price: 3299, status: "In Transit", date: "24 Jun 2026" },
    { id: "TK-10271", name: "Floral Oversized Shirt", img: products[3].img, price: 549, status: "Processing", date: "26 Jun 2026" },
  ];

  const handlePurchaseComplete = (items: typeof products) => {
    setPurchasedItems(items);
    setShowSuccessPopup(true);
    setCartItems([]);
    setPurchased(false);
    // Update seller stock for each purchased item
    setSellerStock(prev => {
      const next = { ...prev };
      items.forEach(item => {
        if (next[item.id] !== undefined) next[item.id] = Math.max(0, next[item.id] - 1);
      });
      return next;
    });
    // Generate seller notifications
    const newNotifs = items.map(item => {
      const remaining = Math.max(0, (sellerStock[item.id] ?? 1) - 1);
      if (remaining === 0) return { id: Date.now() + item.id, msg: `"${item.name}" sold out! Remove or restock it.`, type: "oos" as const };
      if (remaining === 1) return { id: Date.now() + item.id, msg: `"${item.name}" — only 1 left! Consider restocking.`, type: "low" as const };
      return { id: Date.now() + item.id, msg: `"${item.name}" sold. ${remaining} remaining in stock.`, type: "sold" as const };
    });
    setSellerNotifs(prev => [...newNotifs, ...prev].slice(0, 10));
  };

  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchQuery = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const toggleLike = (id: number) => {
    setLikedProducts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const goBack = () => {
    if (screen === "buyer-product") setScreen("buyer-home");
    else if (screen === "buyer-vto") setScreen("buyer-product");
    else if (screen === "buyer-cart") setScreen("buyer-home");
    else if (screen === "seller-add") { setScreen("seller-listings"); setSellerTab("listings"); }
  };

  function navigateBuyer(tab: typeof buyerTab) {
    setBuyerTab(tab);
    if (tab === "home") setScreen("buyer-home");
    else if (tab === "vto") setScreen("buyer-vto");
    else if (tab === "cart") setScreen("buyer-cart");
    else if (tab === "search") setScreen("buyer-search");
    else if (tab === "profile") setScreen("buyer-profile");
  }

  function navigateSeller(tab: typeof sellerTab) {
    setSellerTab(tab);
    if (tab === "dashboard") setScreen("seller-dashboard");
    else if (tab === "add") { setScreen("seller-add"); setPublished(false); }
    else if (tab === "listings") setScreen("seller-listings");
    else if (tab === "messages") setScreen("seller-messages");
    else if (tab === "profile") setScreen("seller-profile");
  }

  // ─── Screens ────────────────────────────────────────────────────────────────

  const SplashScreen = () => (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">

      {/* Subtle orange arc decoration top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 320, height: 320, top: -140, right: -100,
          borderRadius: "4px",
          border: `40px solid ${ORANGE}`,
          opacity: 0.07,
        }}
      />
      {/* Small yellow circle bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 180, height: 180, bottom: -60, left: -60,
          borderRadius: "4px",
          background: YELLOW,
          opacity: 0.12,
        }}
      />

      {/* ── Top brand strip ── */}
      <div className="flex items-center justify-between px-6 pt-8 pb-2">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: "'DM Mono', monospace", color: ORANGE }}
        >
          Thrift Kro™
        </span>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-[4px]"
          style={{ background: `${ORANGE}15`, color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          🇵🇰 Pakistan
        </span>
      </div>

      {/* ── Hero section ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">

        {/* Logo on white — natural orange gradient shows perfectly */}
        <div
          className="rounded-[4px] overflow-hidden"
          style={{
            width: 120, height: 120,
            boxShadow: `0 16px 48px rgba(255,87,34,0.28), 0 2px 8px rgba(0,0,0,0.06)`,
          }}
        >
          <ImageWithFallback
            src={logoImg}
            alt="Thrift Kro logo — hanger with infinity symbol"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Wordmark */}
        <div className="text-center" style={{ lineHeight: 0.95 }}>
          <p
            className="font-extrabold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 68,
              letterSpacing: "-3px",
              color: "#1A1108",
            }}
          >
            Thrift
          </p>
          <p
            className="font-extrabold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 68,
              letterSpacing: "-3px",
              color: ORANGE,
            }}
          >
            Kro.
          </p>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2">
          {["Try Kro", "Buy Kro", "Thrift Kro"].map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: i === 2 ? ORANGE : "#8A7E72" }}
              >
                {t}
              </span>
              {i < 2 && <span style={{ color: "#D0CAC3", fontSize: 10 }}>·</span>}
            </span>
          ))}
        </div>

        {/* Swipe hint dots */}
        <div className="flex gap-2 items-center mt-2">
          {[0,1,2,3].map(i => (
            <div
              key={i}
              className="rounded-[4px] transition-all"
              style={{ width: i === 0 ? 20 : 7, height: 7, background: i === 0 ? ORANGE : "rgba(26,17,8,0.12)" }}
            />
          ))}
        </div>

        {/* Stats row */}
        <div
          className="flex gap-0 rounded-[4px] overflow-hidden border mt-2 w-full"
          style={{ borderColor: "rgba(26,17,8,0.08)" }}
        >
          {[["10K+", "Items Listed"], ["4.9★", "Avg Rating"], ["Free", "Delivery"]].map(([v, l], i) => (
            <div
              key={l}
              className="flex-1 flex flex-col items-center py-3"
              style={{ borderRight: i < 2 ? "1px solid rgba(26,17,8,0.08)" : "none", background: i === 0 ? `${ORANGE}06` : "white" }}
            >
              <p className="text-sm font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: i === 0 ? ORANGE : "#1A1108" }}>{v}</p>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="px-6 pb-10 flex flex-col gap-3">
        <button
          onClick={() => setScreen("onboarding-1")}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-[4px] font-extrabold text-base transition-transform active:scale-[0.97]"
          style={{
            background: ORANGE,
            color: "white",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: `0 8px 24px rgba(255,87,34,0.35)`,
          }}
        >
          Get Started <ArrowRight size={18} />
        </button>
        <p
          className="text-center text-xs text-muted-foreground"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Pre-loved fashion, authentically yours.
        </p>
      </div>
    </div>
  );

  // ─── Onboarding pages ──────────────────────────────────────────────────────

  const onboardingPages = [
    {
      screen: "onboarding-1" as const,
      next: "onboarding-2" as const,
      index: 1,
      accent: ORANGE,
      accentLight: `${ORANGE}12`,
      accentBorder: `${ORANGE}30`,
      emoji: "♻️",
      emojiLabel: "Circular Fashion",
      headline: "Fashion\nWithout Waste",
      body: "Every item you buy or sell on Thrift Kro gives clothes a second life. Shop pre-loved pieces, reduce textile waste, and keep fashion circular — one outfit at a time.",
      visual: (
        <div className="relative flex items-center justify-center w-full" style={{ height: 220 }}>
          {/* Circular arrows illustration */}
          <div className="absolute w-44 h-44 rounded-[4px] border-8 border-dashed opacity-10" style={{ borderColor: ORANGE }} />
          <div className="absolute w-32 h-32 rounded-[4px] border-4 opacity-20" style={{ borderColor: ORANGE }} />
          {/* Centre icon */}
          <div className="w-24 h-24 rounded-[4px] flex items-center justify-center" style={{ background: `${ORANGE}15`, border: `2px solid ${ORANGE}25` }}>
            <span style={{ fontSize: 44 }}>♻️</span>
          </div>
          {/* Orbit items */}
          {[
            { emoji: "👟", angle: 0 },
            { emoji: "👗", angle: 120 },
            { emoji: "🧥", angle: 240 },
          ].map(({ emoji: e, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const r = 84;
            return (
              <div
                key={angle}
                className="absolute w-11 h-11 rounded-[4px] flex items-center justify-center text-lg"
                style={{
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  left: `calc(50% + ${Math.cos(rad) * r}px - 22px)`,
                  top: `calc(50% + ${Math.sin(rad) * r}px - 22px)`,
                }}
              >
                {e}
              </div>
            );
          })}
        </div>
      ),
    },
    {
      screen: "onboarding-2" as const,
      next: "onboarding-3" as const,
      index: 2,
      accent: "#2E7D32",
      accentLight: "#E8F5E9",
      accentBorder: "#A5D6A7",
      emoji: "🌿",
      emojiLabel: "Sustainable",
      headline: "Good for You.\nGood for Earth.",
      body: "Fast fashion produces 10% of global carbon emissions. By choosing pre-loved on Thrift Kro, you save water, cut emissions, and help Pakistan build a more sustainable wardrobe.",
      visual: (
        <div className="relative flex items-center justify-center w-full" style={{ height: 220 }}>
          {/* Earth/leaf backdrop */}
          <div className="absolute w-48 h-48 rounded-[4px] opacity-[0.07]" style={{ background: "#2E7D32" }} />
          <div className="absolute w-36 h-36 rounded-[4px] opacity-[0.10]" style={{ background: "#2E7D32" }} />
          {/* Centre */}
          <div className="w-24 h-24 rounded-[4px] flex items-center justify-center" style={{ background: "#E8F5E9", border: "2px solid #A5D6A7" }}>
            <span style={{ fontSize: 44 }}>🌿</span>
          </div>
          {/* Stat chips */}
          {[
            { label: "–73%", sub: "water saved", top: 16, left: 20 },
            { label: "–60%", sub: "emissions", top: 16, right: 20 },
            { label: "2nd life", sub: "for every item", bottom: 8, left: "50%", transform: "translateX(-50%)" },
          ].map(({ label, sub, ...pos }) => (
            <div
              key={label}
              className="absolute px-3 py-1.5 rounded-[4px]"
              style={{ background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", ...pos as any }}
            >
              <p className="text-sm font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#2E7D32" }}>{label}</p>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sub}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      screen: "onboarding-3" as const,
      next: "role-select" as const,
      index: 3,
      accent: "#C47A00",
      accentLight: `${YELLOW}30`,
      accentBorder: `${YELLOW}80`,
      emoji: "⚡",
      emojiLabel: "GenZ Approved",
      headline: "Thrift Is the\nNew Flex.",
      body: "Cop rare kicks, vintage Y2K fits, and one-of-a-kind pieces before anyone else. Use Virtual Try-On to see how they look — no guessing, no returns.",
      visual: (
        <div className="relative flex items-center justify-center w-full" style={{ height: 220 }}>
          {/* Product card grid preview */}
          <div className="flex gap-3 items-end">
            {[
              { img: products[0].img, name: "Jordan 1", price: "PKR 2,499", big: true },
              { img: products[4].img, name: "Samba OG", price: "PKR 2,799", big: false },
            ].map(card => (
              <div
                key={card.name}
                className="rounded-[4px] overflow-hidden bg-white"
                style={{
                  width: card.big ? 140 : 120,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                  transform: card.big ? "none" : "translateY(16px)",
                }}
              >
                <img src={card.img} alt={card.name} style={{ width: "100%", height: card.big ? 130 : 110, objectFit: "cover" }} />
                <div className="p-2">
                  <p className="text-xs font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{card.name}</p>
                  <p className="text-xs font-extrabold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{card.price}</p>
                </div>
              </div>
            ))}
          </div>
          {/* VTO badge */}
          <div
            className="absolute top-2 right-6 px-3 py-1.5 rounded-[4px] flex items-center gap-1.5"
            style={{ background: ORANGE, boxShadow: "0 4px 12px rgba(255,87,34,0.4)" }}
          >
            <span style={{ fontSize: 12 }}>⚡</span>
            <p className="text-xs font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Virtual Try-On</p>
          </div>
        </div>
      ),
    },
  ];

  const OnboardingScreen = ({ pageIndex }: { pageIndex: 1 | 2 | 3 }) => {
    const page = onboardingPages[pageIndex - 1];
    const isLast = pageIndex === 3;

    return (
      <div className="flex flex-col h-full bg-white relative overflow-hidden">
        {/* Subtle background tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${page.accentLight} 0%, transparent 70%)` }}
        />

        {/* Header row */}
        <div className="flex items-center justify-between px-6 pt-8 pb-2 relative z-10">
          <button
            onClick={() => setScreen(pageIndex === 1 ? "splash" : onboardingPages[pageIndex - 2].screen)}
            className="w-9 h-9 rounded-[4px] border border-border flex items-center justify-center bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          {/* Progress dots */}
          <div className="flex gap-2 items-center">
            {[0,1,2,3].map(i => (
              <div
                key={i}
                className="rounded-[4px] transition-all"
                style={{
                  width: i === pageIndex ? 20 : 7,
                  height: 7,
                  background: i === pageIndex ? page.accent : "rgba(26,17,8,0.12)",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setScreen("role-select")}
            className="text-xs font-bold"
            style={{ color: "#8A7E72", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Skip
          </button>
        </div>

        {/* Visual illustration */}
        <div className="px-6 mt-4 relative z-10">
          {page.visual}
        </div>

        {/* Text content */}
        <div className="px-6 mt-6 flex-1 relative z-10">
          {/* Feature label */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] mb-4"
            style={{ background: page.accentLight, border: `1px solid ${page.accentBorder}` }}
          >
            <span style={{ fontSize: 13 }}>{page.emoji}</span>
            <span
              className="text-xs font-bold"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: page.accent }}
            >
              {page.emojiLabel}
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-extrabold leading-tight mb-3"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 32,
              letterSpacing: "-1px",
              color: "#1A1108",
              whiteSpace: "pre-line",
            }}
          >
            {page.headline}
          </h2>

          {/* Body */}
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#8A7E72" }}
          >
            {page.body}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="px-6 pb-10 pt-4 flex flex-col gap-3 relative z-10">
          <button
            onClick={() => setScreen(page.next)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-[4px] font-extrabold text-base transition-transform active:scale-[0.97]"
            style={{
              background: isLast ? ORANGE : page.accent,
              color: "white",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: `0 8px 24px ${page.accent}40`,
            }}
          >
            {isLast ? <>Get Started <ArrowRight size={18} /></> : <>Next <ArrowRight size={18} /></>}
          </button>
        </div>
      </div>
    );
  };

  const RoleSelectScreen = () => (
    <div className="flex flex-col h-full bg-background px-6 py-8">
      <div className="mb-8">
        {/* Mini logo */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-9 h-9 rounded-[4px] overflow-hidden flex-shrink-0"
            style={{ background: ORANGE }}
          >
            <ImageWithFallback
              src={logoImg}
              alt="Thrift Kro logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="font-extrabold text-base"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: ORANGE, letterSpacing: "-0.5px" }}
          >
            Thrift Kro
          </span>
        </div>
        <p className="text-muted-foreground text-sm font-medium mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Welcome 👋
        </p>
        <h2
          className="text-3xl font-extrabold text-foreground"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-1px" }}
        >
          Who are you here as?
        </h2>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {/* Buyer Card */}
        <button
          onClick={() => { setRole("buyer"); setScreen("buyer-auth"); }}
          className="flex-1 rounded-[4px] p-6 flex flex-col justify-between text-left border-2 transition-all active:scale-[0.98]"
          style={{ background: "#FFF3E0", borderColor: ORANGE }}
        >
          <div>
            <div
              className="w-14 h-14 rounded-[4px] flex items-center justify-center mb-4"
              style={{ background: ORANGE }}
            >
              <ShoppingBag size={28} color="white" />
            </div>
            <h3
              className="text-2xl font-extrabold mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: ORANGE }}
            >
              Shop Unique Finds
            </h3>
            <p className="text-sm text-muted-foreground font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Browse thousands of curated thrifted pieces. Try on virtually before you buy.
            </p>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <span className="text-sm font-bold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Enter as Buyer
            </span>
            <ArrowRight size={16} color={ORANGE} />
          </div>
        </button>

        {/* Seller Card */}
        <button
          onClick={() => { setRole("seller"); setScreen("seller-auth"); }}
          className="flex-1 rounded-[4px] p-6 flex flex-col justify-between text-left border-2 border-foreground/10 transition-all active:scale-[0.98]"
          style={{ background: "#1A1108" }}
        >
          <div>
            <div
              className="w-14 h-14 rounded-[4px] flex items-center justify-center mb-4"
              style={{ background: YELLOW }}
            >
              <Package size={28} color="#1A1108" />
            </div>
            <h3
              className="text-2xl font-extrabold mb-1 text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Start Selling
            </h3>
            <p className="text-sm text-white/60 font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              List your pre-loved items. Reach thousands of conscious buyers across Pakistan.
            </p>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Enter as Shopkeeper
            </span>
            <ArrowRight size={16} color="white" />
          </div>
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        By continuing you agree to our Terms & Privacy Policy
      </p>
    </div>
  );

  const BuyerHomeScreen = () => (
    <div className="flex flex-col h-full bg-background overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScreen("splash")}
              className="w-8 h-8 rounded-[4px] overflow-hidden flex-shrink-0"
              style={{ background: ORANGE }}
              title="Back to welcome"
            >
              <ImageWithFallback
                src={logoImg}
                alt="Thrift Kro logo"
                className="w-full h-full object-cover"
              />
            </button>
            <div>
              <p className="text-xs text-muted-foreground font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Good morning, {buyerProfile.name.split(" ")[0]} 👋
              </p>
              <h2
                className="text-xl font-extrabold text-foreground"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Discover Thrifts
              </h2>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {unlockedRoles.has("seller") && (
              <button
                onClick={() => setShowRoleSwitch(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-[4px] text-xs font-bold border border-border bg-card"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <Package size={11} style={{ color: ORANGE }} /> Sell
              </button>
            )}
            <button
              onClick={() => { setNotifReturn("buyer-home"); setScreen("buyer-notifications"); }}
              className="relative w-9 h-9 rounded-[4px] bg-card border border-border flex items-center justify-center"
            >
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-[4px] border-2 border-background" style={{ background: ORANGE }} />
            </button>
            <button
              onClick={() => { setBuyerTab("profile"); setScreen("buyer-profile"); }}
              className="w-9 h-9 rounded-[4px] overflow-hidden border border-border"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-[4px] bg-card border border-border">
          <Search size={18} className="text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search brands, styles, sizes…"
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          />
          {searchQuery ? (
            <button onClick={() => setSearchQuery("")} className="w-8 h-8 rounded-[4px] flex items-center justify-center bg-muted">
              <X size={14} className="text-muted-foreground" />
            </button>
          ) : (
            <button className="w-8 h-8 rounded-[4px] flex items-center justify-center" style={{ background: ORANGE }}>
              <SlidersHorizontal size={14} color="white" />
            </button>
          )}
        </div>
      </div>

      {/* Category carousel */}
      <div className="flex gap-3 px-5 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-4 py-2 rounded-[4px] text-sm font-semibold transition-all"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: activeCategory === cat ? ORANGE : "white",
              color: activeCategory === cat ? "white" : "#8A7E72",
              border: activeCategory === cat ? "none" : "1.5px solid rgba(26,17,8,0.1)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Banner */}
      <div
        className="mx-5 mt-4 rounded-[4px] p-4 flex items-center justify-between overflow-hidden cursor-pointer"
        style={{ background: `linear-gradient(120deg, #1A1108 60%, #FF5722)` }}
        onClick={() => { setBuyerTab("search"); setScreen("buyer-search"); }}
      >
        <div>
          <p className="text-white/70 text-xs font-medium mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            🔥 New drops just landed
          </p>
          <p className="text-white text-base font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Up to 75% off retail
          </p>
          <p className="text-white/60 text-xs mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Verified pre-loved finds
          </p>
        </div>
        <div
          className="px-3 py-2 rounded-[4px] text-xs font-bold"
          style={{ background: YELLOW, color: "#1A1108", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Shop Now
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {activeCategory === "All" ? "Trending Now" : activeCategory}
          </h3>
          <button onClick={() => { setBuyerTab("search"); setScreen("buyer-search"); }} className="text-xs font-semibold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            See All
          </button>
        </div>
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <Search size={32} className="text-muted-foreground" />
            <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No results found</p>
            <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Try a different search or category
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 pb-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="text-left cursor-pointer"
              onClick={() => { setSelectedProduct(product); setGalleryIndex(0); setScreen("buyer-product"); }}
            >
              <div className="rounded-[4px] bg-card overflow-hidden border border-border">
                <div className="relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-36 object-cover"
                  />
                  <button
                    onClick={e => { e.stopPropagation(); toggleLike(product.id); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-[4px] flex items-center justify-center bg-white/90"
                  >
                    <Heart
                      size={14}
                      fill={likedProducts.has(product.id) ? ORANGE : "none"}
                      color={likedProducts.has(product.id) ? ORANGE : "#8A7E72"}
                    />
                  </button>
                  <div
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded-[4px] text-xs font-bold"
                    style={{
                      background: product.condition === "Excellent" ? "#E8F5E9" : "#FFF3E0",
                      color: product.condition === "Excellent" ? "#2E7D32" : "#E65100",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {product.condition}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {product.brand}
                  </p>
                  <p className="text-sm font-bold leading-tight mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {product.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-sm" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        PKR {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground line-through ml-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                        PKR {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star size={10} fill={YELLOW} color={YELLOW} />
                      <span className="text-xs font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
                        {product.sellerRating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductDetailScreen = () => {
    const imgs = [selectedProduct.img, selectedProduct.img.replace("w=400", "w=401"), selectedProduct.img.replace("w=400", "w=402")];
    const savings = Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100);

    return (
      <div className="flex flex-col h-full bg-background overflow-y-auto relative" style={{ scrollbarWidth: "none" }}>
        {/* Gallery */}
        <div className="relative">
          <img
            src={imgs[galleryIndex]}
            alt={selectedProduct.name}
            className="w-full h-72 object-cover"
          />
          <button
            onClick={goBack}
            className="absolute top-4 left-4 w-9 h-9 rounded-[4px] bg-white/90 flex items-center justify-center shadow"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => toggleLike(selectedProduct.id)}
            className="absolute top-4 right-4 w-9 h-9 rounded-[4px] bg-white/90 flex items-center justify-center shadow"
          >
            <Heart
              size={18}
              fill={likedProducts.has(selectedProduct.id) ? ORANGE : "none"}
              color={likedProducts.has(selectedProduct.id) ? ORANGE : "#1A1108"}
            />
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className="rounded-[4px] transition-all"
                style={{
                  width: galleryIndex === i ? 20 : 6,
                  height: 6,
                  background: galleryIndex === i ? ORANGE : "rgba(255,255,255,0.7)",
                }}
              />
            ))}
          </div>
          {/* Savings badge */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-[4px] text-xs font-bold"
            style={{ background: YELLOW, color: "#1A1108", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {savings}% off retail
          </div>
        </div>

        {/* Details */}
        <div className="px-5 py-4 pb-28">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {selectedProduct.brand}
              </p>
              <h2 className="text-xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {selectedProduct.name}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                PKR {selectedProduct.price.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground line-through" style={{ fontFamily: "'DM Mono', monospace" }}>
                PKR {selectedProduct.originalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {[`Size: ${selectedProduct.size}`, selectedProduct.condition, "Authenticated"].map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-[4px] text-xs font-semibold border"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  borderColor: "rgba(26,17,8,0.12)",
                  background: "white",
                  color: "#1A1108",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Seller */}
          <div className="flex items-center gap-3 p-3 rounded-[4px] bg-card border border-border mb-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format"
              alt="Seller"
              className="w-10 h-10 rounded-[4px] object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {selectedProduct.seller}
              </p>
              <div className="flex items-center gap-1">
                <Star size={11} fill={YELLOW} color={YELLOW} />
                <span className="text-xs font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {selectedProduct.sellerRating} · 148 sold
                </span>
              </div>
            </div>
            <button onClick={() => showToast(`Viewing ${selectedProduct.seller}'s shop`)} className="text-xs font-bold px-3 py-1.5 rounded-[4px] border" style={{ borderColor: ORANGE, color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              View Shop
            </button>
          </div>

          {/* Info rows */}
          <div className="space-y-2 mb-4">
            {[
              { icon: <Shield size={15} />, text: "Buyer Protection · 7-day return guaranteed" },
              { icon: <Truck size={15} />, text: "Free delivery on orders above PKR 999" },
              { icon: <MapPin size={15} />, text: "Ships from Karachi within 24 hrs" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span style={{ color: ORANGE }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Lightly worn, cleaned, and authenticated by our team. No creases on the sole. Original box not included. Perfect for everyday drip.
          </p>
        </div>

        {/* Floating CTAs */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border flex gap-2">
          <button
            onClick={() => {
              if (!cartItems.find(i => i.id === selectedProduct.id)) setCartItems(prev => [...prev, selectedProduct]);
              showToast("Added to cart ✓");
            }}
            className="w-14 flex-shrink-0 rounded-[4px] flex items-center justify-center border-2 transition-transform active:scale-95"
            style={{ borderColor: ORANGE }}
            title="Add to cart"
          >
            <ShoppingBag size={22} style={{ color: ORANGE }} />
          </button>
          <button
            onClick={() => { setActiveVtoShoe(0); setScreen("buyer-vto"); }}
            className="flex-1 py-4 rounded-[4px] font-extrabold text-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <Zap size={20} /> Virtual Try-On
          </button>
        </div>
      </div>
    );
  };

  const VTOScreen = () => {
    const isShoe = selectedProduct.category === "Shoes";

    // Carousel items — shoes get the shoe list, clothing gets same-category alternates
    const clothingAlts = products.filter(p => p.category !== "Shoes").slice(0, 3);
    const carouselItems = isShoe ? vtoShoes : clothingAlts.map(p => ({ id: p.id, name: p.name.split(" ").slice(0, 2).join(" "), img: p.img }));

    const cameraFeed = isShoe
      ? "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=900&fit=crop&auto=format"
      : "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=900&fit=crop&auto=format";

    const instruction = isShoe
      ? "Point camera at your feet to try on"
      : "Point camera at your upper body to try on";

    return (
      <div className="flex flex-col h-full relative overflow-hidden" style={{ background: "#0D0D0D" }}>
        {/* Camera feed */}
        <img
          src={cameraFeed}
          alt="Camera view"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-6 pb-4">
          <button
            onClick={goBack}
            className="w-9 h-9 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20"
          >
            <ChevronLeft size={20} color="white" />
          </button>
          <span className="text-white text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Virtual Try-On — {isShoe ? "Footwear" : "Clothing"}
          </span>
          <button className="w-9 h-9 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20">
            <Camera size={18} color="white" />
          </button>
        </div>

        {/* AR overlay */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          {isShoe ? (
            /* Feet oval */
            <div
              className="w-48 h-32 rounded-[4px] border-4 flex items-center justify-center"
              style={{ borderColor: ORANGE, borderStyle: "dashed" }}
            >
              <div className="w-36 h-20 rounded-[4px] border-2" style={{ borderColor: `${ORANGE}55` }} />
            </div>
          ) : (
            /* Torso silhouette — rounded rectangle */
            <div
              className="border-4 flex items-center justify-center"
              style={{
                width: 140,
                height: 200,
                borderRadius: "4px",
                borderColor: ORANGE,
                borderStyle: "dashed",
              }}
            >
              <div
                className="border-2"
                style={{
                  width: 100,
                  height: 160,
                  borderRadius: "4px",
                  borderColor: `${ORANGE}55`,
                }}
              />
            </div>
          )}

          {/* Item overlay */}
          <img
            src={carouselItems[activeVtoShoe % carouselItems.length]?.img}
            alt="Try-on item"
            className="absolute object-contain opacity-70"
            style={{
              width: isShoe ? 140 : 130,
              height: isShoe ? 140 : 190,
              filter: "drop-shadow(0 8px 20px rgba(255,87,34,0.5))",
            }}
          />

          {/* Instruction bubble */}
          <div
            className="absolute top-6 left-4 right-4 px-4 py-2 rounded-[4px] text-xs font-semibold text-white flex items-center justify-center gap-2"
            style={{ background: "rgba(255,87,34,0.85)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <Camera size={13} />
            {instruction}
          </div>

          {/* Category badge */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-[4px] text-xs font-bold"
            style={{ background: YELLOW, color: "#1A1108", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {isShoe ? "👟 Footwear Mode" : "👕 Clothing Mode"}
          </div>
        </div>

        {/* Bottom panel */}
        <div className="relative z-10 px-5 pb-6">
          <p className="text-white/60 text-xs font-semibold mb-3 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            SWAP STYLE
          </p>
          <div className="flex gap-3 justify-center mb-4">
            {carouselItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveVtoShoe(i)}
                className="rounded-[4px] p-1.5 transition-all flex flex-col items-center"
                style={{
                  border: activeVtoShoe === i ? `2.5px solid ${ORANGE}` : "2px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-[4px]" />
                <p className="text-white text-xs mt-1 text-center font-medium leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 56 }}>
                  {item.name}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (!cartItems.find(i => i.id === selectedProduct.id)) {
                setCartItems(prev => [...prev, selectedProduct]);
              }
              setBuyerTab("cart");
              setScreen("buyer-cart");
            }}
            className="w-full py-4 rounded-[4px] font-extrabold text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <ShoppingBag size={18} /> Add to Cart
          </button>
        </div>
      </div>
    );
  };

  const CartScreen = () => {
    const itemTotal = cartItems.reduce((s, i) => s + i.price, 0);
    const grandTotal = itemTotal + (cartItems.length > 0 ? 78 : 0);

    const removeFromCart = (id: number) => {
      setCartItems(prev => prev.filter(i => i.id !== id));
      setPurchased(false);
    };

    return (
    <div className="flex flex-col h-full bg-background overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-3 border-b border-border flex-shrink-0">
        <button
          onClick={() => { setScreen("buyer-home"); setBuyerTab("home"); }}
          className="w-9 h-9 rounded-[4px] flex items-center justify-center border border-border bg-card"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-extrabold flex-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          My Cart
        </h2>
        {cartItems.length > 0 && (
          <button
            onClick={() => { setCartItems([]); setPurchased(false); showToast("Cart cleared"); }}
            className="text-xs font-bold mr-1"
            style={{ color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Clear all
          </button>
        )}
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-[4px]"
          style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
        </span>
      </div>

      {cartItems.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4">
          <div
            className="w-20 h-20 rounded-[4px] flex items-center justify-center"
            style={{ background: "#FFF3E0" }}
          >
            <ShoppingBag size={36} style={{ color: ORANGE }} />
          </div>
          <div className="text-center">
            <p className="text-lg font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Looks like you haven't added anything yet. Go find something you love!
            </p>
          </div>
          <button
            onClick={() => { setScreen("buyer-home"); setBuyerTab("home"); }}
            className="px-6 py-3 rounded-[4px] font-bold text-sm flex items-center gap-2 mt-2 transition-transform active:scale-95"
            style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Browse Thrifts <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <>
          <div className="px-5 flex-1 overflow-y-auto py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
            {/* Cart items */}
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-3 p-3 bg-card rounded-[4px] border border-border items-start">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 rounded-[4px] object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {item.brand}
                  </p>
                  <p className="text-sm font-bold leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                    Size: {item.size} · {item.condition}
                  </p>
                  <p className="font-extrabold text-sm mb-2" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    PKR {item.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => { setLikedProducts(prev => new Set([...prev, item.id])); removeFromCart(item.id); showToast("Moved to wishlist ♥"); }}
                    className="flex items-center gap-1 text-xs font-bold"
                    style={{ color: "#8A7E72", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <Heart size={12} /> Move to Wishlist
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-[4px] flex items-center justify-center flex-shrink-0 transition-colors active:scale-90"
                  style={{ background: "#FEE2E2" }}
                  title="Remove item"
                >
                  <X size={14} color="#DC2626" />
                </button>
              </div>
            ))}

            {/* Delivery */}
            <div className="p-4 bg-card rounded-[4px] border border-border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={15} style={{ color: ORANGE }} />
                <p className="text-sm font-bold flex-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Delivery Address</p>
                <button onClick={() => setScreen("buyer-addresses")} className="text-xs font-bold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Change</button>
              </div>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {buyerProfile.name} · {(addresses.find(a => a.isDefault) ?? addresses[0])?.line ?? "No address saved"}
              </p>
              <button className="text-xs font-bold mt-2" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Change Address
              </button>
            </div>

            {/* Order summary */}
            <div className="p-4 bg-card rounded-[4px] border border-border">
              <p className="text-sm font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Order Summary
              </p>
              {[
                ["Item Total", `PKR ${itemTotal.toLocaleString()}`],
                ["Delivery", "FREE"],
                ["Platform Fee", "PKR 29"],
                ["Buyer Protection", "PKR 49"],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between mb-2">
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
                  <span className="text-xs font-semibold" style={{ fontFamily: "'DM Mono', monospace", color: val === "FREE" ? "#2E7D32" : undefined }}>
                    {val}
                  </span>
                </div>
              ))}
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Total</span>
                <span className="text-sm font-extrabold" style={{ color: ORANGE, fontFamily: "'DM Mono', monospace" }}>
                  PKR {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Slide to purchase */}
          <div className="px-5 pb-6 pt-3 border-t border-border flex-shrink-0">
            {purchased ? (
              <div
                className="w-full py-4 rounded-[4px] font-extrabold text-base flex items-center justify-center gap-2"
                style={{ background: "#2E7D32", color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <Check size={20} /> Order Placed! 🎉
              </div>
            ) : (
              <div
                className="relative w-full h-14 rounded-[4px] overflow-hidden flex items-center"
                style={{ background: "#F0EDE8" }}
              >
                <div
                  className="absolute left-0 h-full rounded-[4px] transition-all"
                  style={{ width: `${Math.max(56, slideX + 56)}px`, background: ORANGE }}
                />
                <div
                  className="absolute left-1 w-12 h-12 rounded-[4px] flex items-center justify-center cursor-grab z-10 select-none"
                  style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                  onMouseDown={e => {
                    const startX = e.clientX;
                    const max = (slideRef.current?.offsetWidth ?? 300) - 56;
                const onMove = (ev: MouseEvent) => {
                  const d = Math.min(max, Math.max(0, ev.clientX - startX));
                  setSlideX(d);
                  if (d >= max - 10) { handlePurchaseComplete(cartItems); setSlideX(0); }
                };
                const onUp = () => { setSlideX(0); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
                window.addEventListener("mousemove", onMove);
                window.addEventListener("mouseup", onUp);
              }}
              onTouchStart={e => {
                const startX = e.touches[0].clientX;
                const max = (slideRef.current?.offsetWidth ?? 300) - 56;
                const onMove = (ev: TouchEvent) => {
                  const d = Math.min(max, Math.max(0, ev.touches[0].clientX - startX));
                  setSlideX(d);
                  if (d >= max - 10) { handlePurchaseComplete(cartItems); setSlideX(0); }
                };
                const onEnd = () => { setSlideX(0); window.removeEventListener("touchmove", onMove as any); window.removeEventListener("touchend", onEnd); };
                window.addEventListener("touchmove", onMove as any);
                window.addEventListener("touchend", onEnd);
              }}
            >
              <ChevronRight size={22} style={{ color: ORANGE }} />
            </div>
            <span
              className="absolute left-0 right-0 text-center text-sm font-bold text-muted-foreground pointer-events-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Slide to Purchase →
            </span>
                <div ref={slideRef} className="absolute inset-0" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
    );
  };

  const SellerDashboardScreen = () => (
    <div className="flex flex-col h-full bg-background overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Welcome back, Priya 👋
          </p>
          <h2 className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Your Shop
          </h2>
        </div>
        {unlockedRoles.has("buyer") && (
          <button
            onClick={() => setShowRoleSwitch(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] text-xs font-bold border border-border bg-card"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <ShoppingBag size={13} style={{ color: ORANGE }} /> Switch Role
          </button>
        )}
      </div>

      {/* Inventory notifications */}
      {sellerNotifs.length > 0 && (
        <div className="px-5 mb-2 space-y-2">
          {sellerNotifs.slice(0, 2).map(n => (
            <div
              key={n.id}
              className="flex items-start gap-2 px-3 py-2.5 rounded-[4px] text-xs font-medium"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: n.type === "oos" ? "#FEE2E2" : n.type === "low" ? "#FFF3E0" : "#E8F5E9",
                color: n.type === "oos" ? "#DC2626" : n.type === "low" ? "#E65100" : "#2E7D32",
              }}
            >
              <span className="mt-0.5 flex-shrink-0">{n.type === "oos" ? "🚫" : n.type === "low" ? "⚠️" : "✅"}</span>
              <span className="flex-1">{n.msg}</span>
              <button onClick={() => setSellerNotifs(prev => prev.filter(x => x.id !== n.id))}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}


      {/* Stats row */}
      <div className="px-5 mb-4 grid grid-cols-3 gap-3">
        {[
          { label: "Total Sales", value: "PKR 42,800", icon: <BarChart2 size={18} />, bg: "#FFF3E0" },
          { label: "Active Listings", value: "12", icon: <Package size={18} />, bg: "#E8F5E9" },
          { label: "Avg. Rating", value: "4.9 ★", icon: <Star size={18} />, bg: "#EDE7F6" },
        ].map(s => (
          <div key={s.label} className="rounded-[4px] p-3 flex flex-col gap-1 bg-card border border-border">
            <span style={{ color: ORANGE }}>{s.icon}</span>
            <p className="text-lg font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue mini chart */}
      <div className="mx-5 mb-4 p-4 rounded-[4px] bg-card border border-border">
        <div className="flex justify-between mb-3">
          <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Revenue This Week</p>
          <p className="text-sm font-extrabold" style={{ color: ORANGE, fontFamily: "'DM Mono', monospace" }}>PKR 8,340</p>
        </div>
        <div className="flex items-end gap-1 h-14">
          {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${h}%`, background: i === 5 ? ORANGE : "#F0EDE8" }}
            />
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <p key={i} className="flex-1 text-center text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
              {d}
            </p>
          ))}
        </div>
      </div>

      {/* Active listings */}
      <div className="px-5">
        <div className="flex justify-between mb-3">
          <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Active Listings</p>
          <button onClick={() => { setSellerTab("listings"); setScreen("seller-listings"); }} className="text-xs font-semibold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            See All
          </button>
        </div>
        <div className="space-y-3 pb-24">
          {sellerListings.map(item => (
            <div key={item.id} className="flex gap-3 p-3 bg-card rounded-[4px] border border-border items-center">
              <img src={item.img} alt={item.name} className="w-14 h-14 rounded-[4px] object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.name}</p>
                <p className="text-xs font-extrabold mt-0.5" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  PKR {item.price.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {item.views} views
                </p>
              </div>
              <span
                className="text-xs font-semibold px-2 py-1 rounded-[4px]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: item.status === "Active" ? "#E8F5E9" : "#FFF3E0",
                  color: item.status === "Active" ? "#2E7D32" : "#E65100",
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => { setScreen("seller-add"); setPublished(false); }}
        className="absolute bottom-24 right-5 w-14 h-14 rounded-[4px] flex items-center justify-center shadow-lg transition-transform active:scale-95"
        style={{ background: ORANGE }}
      >
        <Plus size={28} color="white" />
      </button>
    </div>
  );

  const SellerAddScreen = () => (
    <div className="flex flex-col h-full bg-background overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 pt-6 pb-4">
        <button onClick={goBack} className="mb-4">
          <ChevronLeft size={22} />
        </button>
        <h2 className="text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Add New Item
        </h2>
        <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Great photos = 3x more sales. Follow the guide below.
        </p>
      </div>

      <div className="px-5 pb-28">
        {/* Photo grid */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "Front View", primary: true },
            { label: "Side View", primary: false },
            { label: "Sole", primary: false },
            { label: "Label / Tags", primary: false },
            { label: "Any Flaws", primary: false },
            { label: "On Feet", primary: false },
          ].map((slot, i) => (
            <div
              key={i}
              className="aspect-square rounded-[4px] flex flex-col items-center justify-center gap-1 border-2 border-dashed"
              style={{
                borderColor: slot.primary ? ORANGE : "rgba(26,17,8,0.15)",
                background: slot.primary ? "#FFF3E0" : "#F8F6F3",
              }}
            >
              <Upload size={18} style={{ color: slot.primary ? ORANGE : "#8A7E72" }} />
              <p
                className="text-xs font-semibold text-center leading-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: slot.primary ? ORANGE : "#8A7E72",
                }}
              >
                {slot.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div
          className="p-3 rounded-[4px] mb-5 flex gap-2 items-start"
          style={{ background: "#FFF3E0" }}
        >
          <Zap size={15} style={{ color: ORANGE, flexShrink: 0, marginTop: 1 }} />
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <strong style={{ color: ORANGE }}>VTO Tip:</strong> Shoot front & on-feet photos in natural light on a plain floor for the best Virtual Try-On experience.
          </p>
        </div>

        {/* Form fields */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Item Title
            </label>
            <input
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              placeholder="e.g. Nike Air Force 1 – White UK9"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Size
              </label>
              <input
                className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                placeholder="e.g. UK 9"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Price (PKR)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                placeholder="e.g. 2500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Condition
            </label>
            <div className="relative">
              <button
                onClick={() => setConditionOpen(!conditionOpen)}
                className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm flex items-center justify-between"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>{condition}</span>
                <ChevronDown size={16} className="text-muted-foreground" />
              </button>
              {conditionOpen && (
                <div className="absolute left-0 right-0 mt-1 rounded-[4px] bg-card border border-border shadow-lg z-10 overflow-hidden">
                  {["Excellent", "Good", "Fair"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setCondition(opt); setConditionOpen(false); }}
                      className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-muted transition-colors flex items-center justify-between"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {opt}
                      {condition === opt && <Check size={14} style={{ color: ORANGE }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors resize-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              placeholder="Describe wear, any flaws, or styling notes…"
            />
          </div>
        </div>

        {/* Publish */}
        <button
          onClick={() => setPublished(true)}
          className="w-full mt-5 py-4 rounded-[4px] font-extrabold text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          style={{ background: published ? "#2E7D32" : ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {published ? <><Check size={20} /> Published!</> : <><Zap size={20} /> Publish Listing</>}
        </button>
      </div>
    </div>
  );

  // ─── Modals ─────────────────────────────────────────────────────────────────

  const RoleSwitchModal = () => (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
      <div className="bg-background rounded-t-[4px] px-6 pt-6 pb-10" style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
        {/* Handle */}
        <div className="w-10 h-1 rounded-[4px] bg-border mx-auto mb-5" />

        {/* Logo + heading */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-[4px] overflow-hidden flex-shrink-0" style={{ background: ORANGE }}>
            <ImageWithFallback src={logoImg} alt="Thrift Kro" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-base font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Switch Account</p>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>You have both Buyer & Seller accounts</p>
          </div>
        </div>

        <div className="h-px bg-border my-4" />

        {/* Buyer option */}
        <button
          onClick={() => requestRoleSwitch("buyer")}
          className="w-full flex items-center gap-4 p-4 rounded-[4px] mb-3 border-2 transition-all active:scale-[0.98]"
          style={{ borderColor: role === "buyer" ? "rgba(26,17,8,0.1)" : ORANGE, background: "#FFF3E0", opacity: role === "buyer" ? 0.55 : 1 }}
          disabled={role === "buyer"}
        >
          <div className="w-12 h-12 rounded-[4px] flex items-center justify-center flex-shrink-0" style={{ background: ORANGE }}>
            <ShoppingBag size={22} color="white" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-extrabold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: ORANGE }}>
              Continue as Buyer {role === "buyer" && "(current)"}
            </p>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Browse, try-on & shop · log in to continue</p>
          </div>
          <ArrowRight size={18} style={{ color: ORANGE }} />
        </button>

        {/* Seller option */}
        <button
          onClick={() => requestRoleSwitch("seller")}
          className="w-full flex items-center gap-4 p-4 rounded-[4px] mb-4 transition-all active:scale-[0.98]"
          style={{ background: "#1A1108", opacity: role === "seller" ? 0.55 : 1 }}
          disabled={role === "seller"}
        >
          <div className="w-12 h-12 rounded-[4px] flex items-center justify-center flex-shrink-0" style={{ background: YELLOW }}>
            <Package size={22} color="#1A1108" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-extrabold text-sm text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Continue as Seller {role === "seller" && "(current)"}
            </p>
            <p className="text-xs text-white/50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage listings & orders · log in to continue</p>
          </div>
          <ArrowRight size={18} color="white" />
        </button>

        <button
          onClick={() => setShowRoleSwitch(false)}
          className="w-full py-3 rounded-[4px] text-sm font-semibold text-muted-foreground border border-border"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const PurchaseSuccessModal = () => {
    const item = purchasedItems[0];
    if (!item) return null;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const dateStr = deliveryDate.toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" });

    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}>
        <div className="bg-background rounded-[4px] w-full overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
          {/* Orange top band */}
          <div className="px-6 pt-8 pb-6 flex flex-col items-center" style={{ background: `linear-gradient(160deg, #FF5722, #FF8A50)` }}>
            {/* Animated check */}
            <div className="w-20 h-20 rounded-[4px] bg-white flex items-center justify-center mb-4" style={{ boxShadow: "0 4px 20px rgba(255,87,34,0.4)" }}>
              <Check size={36} style={{ color: ORANGE }} strokeWidth={3} />
            </div>
            <p className="text-white text-xl font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Order Placed! 🎉</p>
            <p className="text-white/80 text-sm text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Your item is on its way. Get hyped!
            </p>
          </div>

          {/* Order card */}
          <div className="px-5 py-4">
            <div className="flex gap-3 p-3 bg-muted rounded-[4px] mb-4">
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded-[4px] object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.brand}</p>
                <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.name}</p>
                <p className="text-xs font-extrabold mt-1" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PKR {item.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              {[
                { icon: <Truck size={14} />, label: "Est. Delivery", value: dateStr },
                { icon: <Star size={14} />, label: "Seller", value: item.seller },
                { icon: <Shield size={14} />, label: "Buyer Protection", value: "Active for 7 days" },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-2">
                  <span style={{ color: ORANGE }}>{row.icon}</span>
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}:</span>
                  <span className="text-xs font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.value}</span>
                </div>
              ))}
            </div>

            {purchasedItems.length > 1 && (
              <p className="text-xs text-muted-foreground mb-3 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                +{purchasedItems.length - 1} more item{purchasedItems.length > 2 ? "s" : ""} in this order
              </p>
            )}

            <div className="flex gap-2">
              <button
                className="flex-1 py-3 rounded-[4px] text-xs font-bold border border-border"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                onClick={() => { setShowSuccessPopup(false); setScreen("buyer-orders"); setBuyerTab("profile"); }}
              >
                Track Order
              </button>
              <button
                onClick={() => { setShowSuccessPopup(false); setScreen("buyer-home"); setBuyerTab("home"); }}
                className="flex-1 py-3 rounded-[4px] text-xs font-extrabold"
                style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Security Flow Modal (Change Password / Devices / Activity / Biometric / 2FA) ─

  const ChangePasswordFlow = () => {
    const [cur, setCur] = useState("");
    const [next, setNext] = useState("");
    const [conf, setConf] = useState("");
    const [show, setShow] = useState(false);
    const strong = next.length >= 8;
    const match = next.length > 0 && next === conf;
    const inputCls = "flex-1 bg-transparent text-sm outline-none";
    const wrapCls = "flex items-center gap-3 px-4 py-3 rounded-[4px] border";
    const wrapStyle = { background: "#F8F6F3", borderColor: "rgba(26,17,8,0.1)" } as const;
    return (
      <div className="space-y-3">
        <div className={wrapCls} style={wrapStyle}>
          <Lock size={16} className="text-muted-foreground flex-shrink-0" />
          <input type={show ? "text" : "password"} value={cur} onChange={e => setCur(e.target.value)} placeholder="Current password" className={inputCls} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
        </div>
        <div className={wrapCls} style={wrapStyle}>
          <Lock size={16} className="text-muted-foreground flex-shrink-0" />
          <input type={show ? "text" : "password"} value={next} onChange={e => setNext(e.target.value)} placeholder="New password" className={inputCls} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
        </div>
        <div className={wrapCls} style={wrapStyle}>
          <Lock size={16} className="text-muted-foreground flex-shrink-0" />
          <input type={show ? "text" : "password"} value={conf} onChange={e => setConf(e.target.value)} placeholder="Confirm new password" className={inputCls} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
        </div>
        <button onClick={() => setShow(s => !s)} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {show ? <EyeOff size={13} /> : <Eye size={13} />} {show ? "Hide" : "Show"} passwords
        </button>
        {/* Requirements */}
        <div className="space-y-1">
          {[["At least 8 characters", strong], ["New passwords match", match]].map(([label, ok]) => (
            <div key={label as string} className="flex items-center gap-2 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: ok ? "#2E7D32" : "#8A7E72" }}>
              <Check size={12} style={{ opacity: ok ? 1 : 0.3 }} /> {label}
            </div>
          ))}
        </div>
        <button
          disabled={!cur || !strong || !match}
          onClick={() => { setSecurityFlow(null); showToast("Password changed ✓"); }}
          className="w-full py-3.5 rounded-[4px] font-extrabold text-sm transition-all"
          style={{ background: (!cur || !strong || !match) ? "#E0DCD5" : ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Update Password
        </button>
      </div>
    );
  };

  const BiometricFlow = () => {
    const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
    useEffect(() => {
      if (phase === "scanning") {
        const t = setTimeout(() => setPhase("done"), 1800);
        return () => clearTimeout(t);
      }
      if (phase === "done") {
        const t = setTimeout(() => { securityFlow?.onDone?.(); setSecurityFlow(null); showToast("Biometric enabled ✓"); }, 900);
        return () => clearTimeout(t);
      }
    }, [phase]);
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        <div
          className="w-28 h-28 rounded-[4px] flex items-center justify-center transition-all"
          style={{ background: phase === "done" ? "#E8F5E9" : "#FFF3E0", border: `3px solid ${phase === "done" ? "#2E7D32" : ORANGE}` }}
        >
          {phase === "done"
            ? <Check size={48} style={{ color: "#2E7D32" }} strokeWidth={3} />
            : <Fingerprint size={56} style={{ color: ORANGE }} className={phase === "scanning" ? "animate-pulse" : ""} />}
        </div>
        <p className="text-sm font-bold text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {phase === "idle" && "Place your finger on the sensor to enroll"}
          {phase === "scanning" && "Scanning your fingerprint…"}
          {phase === "done" && "Fingerprint authenticated!"}
        </p>
        {phase === "idle" && (
          <button onClick={() => setPhase("scanning")} className="w-full py-3.5 rounded-[4px] font-extrabold text-sm" style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Start Scan
          </button>
        )}
      </div>
    );
  };

  const TwoFactorFlow = () => {
    const [step, setStep] = useState<"phone" | "otp" | "done">("phone");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const phone = role === "seller" ? sellerProfile.phone : buyerProfile.phone;
    useEffect(() => {
      if (step === "done") {
        const t = setTimeout(() => { securityFlow?.onDone?.(); setSecurityFlow(null); showToast("2FA enabled ✓"); }, 900);
        return () => clearTimeout(t);
      }
    }, [step]);
    return (
      <div className="space-y-4">
        {step === "phone" && (
          <>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              We'll send a 6-digit code to your registered number to confirm it's you.
            </p>
            <div className="flex items-center gap-3 px-4 py-3 rounded-[4px] border" style={{ background: "#F8F6F3", borderColor: "rgba(26,17,8,0.1)" }}>
              <Phone size={16} className="text-muted-foreground" />
              <span className="text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{phone}</span>
            </div>
            <button onClick={() => setStep("otp")} className="w-full py-3.5 rounded-[4px] font-extrabold text-sm" style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Send Code
            </button>
          </>
        )}
        {step === "otp" && (
          <>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Enter the code sent to {phone}. (Demo: type any 4 digits)
            </p>
            <div className="flex gap-2 justify-center">
              {otp.map((d, i) => (
                <input
                  key={i}
                  value={d}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={e => setOtp(prev => prev.map((x, ix) => ix === i ? e.target.value.replace(/\D/g, "") : x))}
                  className="w-12 h-14 rounded-[4px] bg-card border text-center text-lg font-bold outline-none focus:border-primary"
                  style={{ fontFamily: "'DM Mono', monospace", borderColor: "rgba(26,17,8,0.15)" }}
                />
              ))}
            </div>
            <button
              disabled={otp.some(d => !d)}
              onClick={() => setStep("done")}
              className="w-full py-3.5 rounded-[4px] font-extrabold text-sm"
              style={{ background: otp.some(d => !d) ? "#E0DCD5" : ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Verify & Enable
            </button>
            <button onClick={() => setStep("phone")} className="w-full text-xs font-bold text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Resend code</button>
          </>
        )}
        {step === "done" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-20 h-20 rounded-[4px] flex items-center justify-center" style={{ background: "#E8F5E9", border: "3px solid #2E7D32" }}>
              <ShieldCheck size={40} style={{ color: "#2E7D32" }} />
            </div>
            <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Two-factor authentication on!</p>
          </div>
        )}
      </div>
    );
  };

  const ManageDevicesFlow = () => (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        These devices are currently signed in to your account.
      </p>
      {devices.map(d => (
        <div key={d.id} className="flex items-center gap-3 p-3 rounded-[4px] border border-border bg-card">
          <div className="w-10 h-10 rounded-[4px] flex items-center justify-center flex-shrink-0" style={{ background: "#FFF3E0" }}>
            {d.os === "desktop" ? <Monitor size={18} style={{ color: ORANGE }} /> : <Smartphone size={18} style={{ color: ORANGE }} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{d.name}</p>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{d.info} · {d.time}</p>
          </div>
          {d.current ? (
            <span className="text-xs font-bold px-2 py-1 rounded-[4px]" style={{ background: "#E8F5E9", color: "#2E7D32", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>This device</span>
          ) : (
            <button
              onClick={() => { setDevices(prev => prev.filter(x => x.id !== d.id)); showToast("Device signed out"); }}
              className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-[4px] border"
              style={{ borderColor: "#DC2626", color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <LogOut size={12} /> Log out
            </button>
          )}
        </div>
      ))}
      <button onClick={() => { setDevices(prev => prev.filter(d => d.current)); showToast("Signed out everywhere else"); }}
        className="w-full py-3 rounded-[4px] font-bold text-sm border-2 mt-1"
        style={{ borderColor: "#DC2626", color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Log out all other devices
      </button>
    </div>
  );

  const LoginActivityFlow = () => {
    const events = [
      { icon: <Smartphone size={16} />, label: "iPhone 15 Pro", loc: "Lahore, PK", time: "Today, 9:41 AM", ok: true },
      { icon: <Monitor size={16} />, label: "Chrome · Windows", loc: "Karachi, PK", time: "24 Jun, 6:12 PM", ok: true },
      { icon: <Smartphone size={16} />, label: "Unknown device", loc: "Multan, PK", time: "20 Jun, 2:03 AM", ok: false },
      { icon: <Monitor size={16} />, label: "Safari · macOS", loc: "Islamabad, PK", time: "18 Jun, 11:20 AM", ok: true },
    ];
    return (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent sign-in activity on your account.</p>
        {events.map((e, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-[4px] border border-border bg-card">
            <span style={{ color: e.ok ? ORANGE : "#DC2626" }}>{e.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{e.label}</p>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{e.loc} · {e.time}</p>
            </div>
            {!e.ok && <span className="text-xs font-bold" style={{ color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Suspicious</span>}
          </div>
        ))}
      </div>
    );
  };

  const SecurityFlowModal = () => {
    if (!securityFlow) return null;
    const titles = {
      "change-password": "Change Password",
      "manage-devices": "Manage Devices",
      "login-activity": "Login Activity",
      "biometric": "Enable Biometric Login",
      "2fa": "Two-Factor Authentication",
    };
    return (
      <div className="absolute inset-0 z-50 flex flex-col justify-end" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
        <div className="bg-background rounded-t-[4px] px-5 pt-4 pb-8 max-h-[88%] overflow-y-auto" style={{ scrollbarWidth: "none", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
          <div className="w-10 h-1 rounded-[4px] bg-border mx-auto mb-4" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{titles[securityFlow.type]}</h3>
            <button onClick={() => setSecurityFlow(null)} className="w-8 h-8 rounded-[4px] border border-border flex items-center justify-center">
              <X size={16} />
            </button>
          </div>
          {securityFlow.type === "change-password" && <ChangePasswordFlow />}
          {securityFlow.type === "manage-devices" && <ManageDevicesFlow />}
          {securityFlow.type === "login-activity" && <LoginActivityFlow />}
          {securityFlow.type === "biometric" && <BiometricFlow />}
          {securityFlow.type === "2fa" && <TwoFactorFlow />}
        </div>
      </div>
    );
  };

  // ─── Seller Sub-Pages ───────────────────────────────────────────────────────

  const SellerListingsScreen = () => {
    const allListings = [
      ...sellerListings,
      { id: 4, name: "Corduroy Blazer – Brown", price: 1750, views: 43, status: "Active", img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=120&h=120&fit=crop&auto=format" },
      { id: 5, name: "Converse Chuck 70 – Off White", price: 2100, views: 91, status: "Pending", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format" },
    ];
    const [filter, setFilter] = useState<"All" | "Active" | "Pending">("All");
    const filtered = filter === "All" ? allListings : allListings.filter(l => l.status === filter);

    return (
      <div className="flex flex-col h-full bg-background" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>My Listings</h2>
          <div className="flex gap-2">
            {(["All", "Active", "Pending"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-[4px] text-xs font-bold transition-all"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: filter === f ? ORANGE : "white",
                  color: filter === f ? "white" : "#8A7E72",
                  border: filter === f ? "none" : "1.5px solid rgba(26,17,8,0.1)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 pb-6" style={{ scrollbarWidth: "none" }}>
          {filtered.map(item => (
            <div key={item.id} className="flex gap-3 p-3 bg-card rounded-[4px] border border-border items-center">
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded-[4px] object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.name}</p>
                <p className="text-xs font-extrabold mt-0.5" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  PKR {item.price.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{item.views} views</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-[4px]"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: sellerStock[item.id] === 0 ? "#FEE2E2" : item.status === "Active" ? "#E8F5E9" : "#FFF3E0",
                    color: sellerStock[item.id] === 0 ? "#DC2626" : item.status === "Active" ? "#2E7D32" : "#E65100",
                  }}
                >
                  {sellerStock[item.id] === 0 ? "Out of Stock" : item.status}
                </span>
                <p className="text-xs font-bold" style={{ fontFamily: "'DM Mono', monospace", color: sellerStock[item.id] === 0 ? "#DC2626" : sellerStock[item.id] === 1 ? "#E65100" : "#8A7E72" }}>
                  {sellerStock[item.id] !== undefined ? `${sellerStock[item.id]} left` : "—"}
                </p>
                <button className="text-xs font-semibold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {sellerStock[item.id] === 0 ? "Remove" : "Edit"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        <div className="px-5 pb-4 flex-shrink-0">
          <button
            onClick={() => { setSellerTab("add"); setScreen("seller-add"); setPublished(false); }}
            className="w-full py-3.5 rounded-[4px] font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <Plus size={16} /> Add New Listing
          </button>
        </div>
      </div>
    );
  };

  const messages = [
    { id: 1, name: "Bilal Chaudhry", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", last: "Is the Jordan 1 still available?", time: "2m ago", unread: 2, item: "Air Jordan 1 Retro High" },
    { id: 2, name: "Sana Mirza", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", last: "Can you do PKR 1,800?", time: "18m ago", unread: 1, item: "Air Force 1 '07 White" },
    { id: 3, name: "Hamza Iqbal", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format", last: "Thanks! I'll place the order now 🙌", time: "1h ago", unread: 0, item: "Vintage Band Tee" },
    { id: 4, name: "Aisha Khan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", last: "What's the condition of the sole?", time: "3h ago", unread: 0, item: "Puma Suede Classic" },
  ];

  const SellerMessagesScreen = () => {
    const [activeChat, setActiveChat] = useState<number | null>(null);
    const activeMsg = messages.find(m => m.id === activeChat);

    if (activeChat && activeMsg) {
      return (
        <div className="flex flex-col h-full bg-background">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border flex-shrink-0 bg-card">
            <button onClick={() => setActiveChat(null)} className="w-8 h-8 rounded-[4px] border border-border flex items-center justify-center">
              <ChevronLeft size={18} />
            </button>
            <img src={activeMsg.avatar} alt={activeMsg.name} className="w-9 h-9 rounded-[4px] object-cover" />
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{activeMsg.name}</p>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>re: {activeMsg.item}</p>
            </div>
            <div className="w-2 h-2 rounded-[4px] bg-green-500" />
          </div>

          {/* Chat bubbles */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
            {[
              { from: "them", text: `Hi! I'm interested in your ${activeMsg.item}. Is it still available?`, t: "10:22 AM" },
              { from: "me", text: "Yes it's available! Just cleaned and ready to ship.", t: "10:24 AM" },
              { from: "them", text: activeMsg.last, t: "10:25 AM" },
            ].map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[75%] px-4 py-2.5 rounded-[4px] text-sm"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: msg.from === "me" ? ORANGE : "white",
                    color: msg.from === "me" ? "white" : "#1A1108",
                    borderRadius: msg.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    border: msg.from === "me" ? "none" : "1px solid rgba(26,17,8,0.08)",
                  }}
                >
                  {msg.text}
                  <p className="text-xs mt-1 opacity-60">{msg.t}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex gap-2 flex-shrink-0">
            <input
              placeholder="Type a message…"
              className="flex-1 px-4 py-2.5 rounded-[4px] bg-muted border border-border text-sm outline-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
            <button
              className="w-10 h-10 rounded-[4px] flex items-center justify-center flex-shrink-0"
              style={{ background: ORANGE }}
            >
              <ArrowRight size={18} color="white" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-background" style={{ scrollbarWidth: "none" }}>
        <div className="px-5 pt-5 pb-3 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Messages</h2>
          <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {messages.filter(m => m.unread > 0).length} unread conversations
          </p>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {messages.map(msg => (
            <button
              key={msg.id}
              onClick={() => setActiveChat(msg.id)}
              className="w-full flex items-center gap-3 px-5 py-4 border-b border-border text-left hover:bg-muted/50 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <img src={msg.avatar} alt={msg.name} className="w-12 h-12 rounded-[4px] object-cover" />
                {msg.unread > 0 && (
                  <div
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-[4px] flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: ORANGE, fontSize: 10 }}
                  >
                    {msg.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{msg.name}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>{msg.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  re: <span style={{ color: ORANGE }}>{msg.item}</span>
                </p>
                <p className={`text-xs truncate mt-0.5 ${msg.unread > 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {msg.last}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const SellerProfileScreen = () => (
    <div className="flex flex-col h-full bg-background overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Profile hero */}
      <div
        className="px-5 pt-8 pb-6 flex flex-col items-center"
        style={{ background: "linear-gradient(160deg, #1A1108 0%, #2D1F0E 100%)" }}
      >
        <div className="relative mb-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&auto=format"
            alt="Profile"
            className="w-20 h-20 rounded-[4px] object-cover border-4 border-white/20"
          />
          <button
            onClick={() => setScreen("seller-edit-profile")}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-[4px] flex items-center justify-center"
            style={{ background: ORANGE }}
          >
            <Upload size={12} color="white" />
          </button>
        </div>
        <p className="text-white text-lg font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sellerProfile.name}</p>
        <p className="text-white/60 text-xs mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sellerProfile.email} · {sellerProfile.location}</p>
        <div className="flex gap-4 text-center">
          {[["12", "Listings"], ["148", "Sales"], ["4.9★", "Rating"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-white font-extrabold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v}</p>
              <p className="text-white/50 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings sections */}
      <div className="px-5 py-4 space-y-3">
        {/* Switch to buyer (only if buyer account exists) */}
        {unlockedRoles.has("buyer") && (
          <button
            onClick={() => setShowRoleSwitch(true)}
            className="w-full flex items-center gap-3 p-3.5 rounded-[4px] border-2 transition-all active:scale-[0.98]"
            style={{ borderColor: ORANGE, background: "#FFF3E0" }}
          >
            <ShoppingBag size={18} style={{ color: ORANGE }} />
            <p className="flex-1 text-left text-sm font-bold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Switch to Buyer Account</p>
            <ArrowRight size={16} style={{ color: ORANGE }} />
          </button>
        )}

        {/* Shop settings */}
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Shop Settings</p>
        {([
          { icon: <Package size={18} />, label: "Shop Name", value: sellerProfile.shopName, field: "shopName" as const },
          { icon: <MapPin size={18} />, label: "Location", value: sellerProfile.location, field: "location" as const },
          { icon: <Truck size={18} />, label: "Shipping Policy", value: sellerProfile.shipping, field: "shipping" as const },
        ]).map(row => (
          <button
            key={row.label}
            onClick={() => { setActiveShopField(row.field); setScreen("seller-shop-setting"); }}
            className="w-full flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border text-left transition-colors active:bg-muted"
          >
            <span style={{ color: ORANGE }}>{row.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
              <p className="text-sm font-semibold truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.value}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </button>
        ))}

        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider pt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Account</p>
        {([
          { icon: <User size={18} />, label: "Edit Profile", to: "seller-edit-profile" as const },
          { icon: <Bell size={18} />, label: "Notifications", to: "seller-notifications" as const },
          { icon: <Shield size={18} />, label: "Privacy & Security", to: "seller-privacy" as const },
        ]).map(row => (
          <button
            key={row.label}
            onClick={() => setScreen(row.to)}
            className="w-full flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border text-left transition-colors active:bg-muted"
          >
            <span style={{ color: ORANGE }}>{row.icon}</span>
            <p className="flex-1 text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={() => { setRole(null); setUnlockedRoles(new Set()); setScreen("role-select"); setSellerTab("dashboard"); }}
          className="w-full py-3.5 rounded-[4px] font-bold text-sm flex items-center justify-center gap-2 mt-2 border-2 transition-transform active:scale-[0.98]"
          style={{ borderColor: "#DC2626", color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );

  // ─── Reusable settings primitives ────────────────────────────────────────────

  const SettingsHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <div className="px-4 pt-5 pb-3 flex items-center gap-3 border-b border-border flex-shrink-0 bg-card">
      <button onClick={onBack} className="w-9 h-9 rounded-[4px] border border-border flex items-center justify-center bg-background">
        <ChevronLeft size={20} />
      </button>
      <h2 className="text-lg font-extrabold flex-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h2>
    </div>
  );

  const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="w-11 h-6 rounded-[4px] flex-shrink-0 transition-colors relative"
      style={{ background: on ? ORANGE : "#CBCED4" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-[4px] bg-white transition-all"
        style={{ left: on ? 22 : 2, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
      />
    </button>
  );

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {children}
    </label>
  );

  // ─── Seller Edit Profile ──────────────────────────────────────────────────────

  const SellerEditProfileScreen = () => {
    const [draft, setDraft] = useState(sellerProfile);
    const set = (k: keyof typeof draft, v: string) => setDraft(d => ({ ...d, [k]: v }));

    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Edit Profile" onBack={() => setScreen("seller-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4" style={{ scrollbarWidth: "none" }}>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&auto=format"
                alt="Profile"
                className="w-24 h-24 rounded-[4px] object-cover border-2 border-border"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-[4px] flex items-center justify-center" style={{ background: ORANGE }}>
                <Camera size={14} color="white" />
              </button>
            </div>
            <button className="text-xs font-bold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Change Photo</button>
          </div>

          <div>
            <FieldLabel>Full Name</FieldLabel>
            <input value={draft.name} onChange={e => set("name", e.target.value)}
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
          </div>
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <input value={draft.email} onChange={e => set("email", e.target.value)} type="email"
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
          </div>
          <div>
            <FieldLabel>Phone Number</FieldLabel>
            <input value={draft.phone} onChange={e => set("phone", e.target.value)} type="tel"
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
          </div>
          <div>
            <FieldLabel>Bio</FieldLabel>
            <textarea value={draft.bio} onChange={e => set("bio", e.target.value)} rows={3}
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors resize-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
          </div>
        </div>
        <div className="px-5 py-4 border-t border-border flex-shrink-0">
          <button
            onClick={() => { setSellerProfile(draft); showToast("Profile updated ✓"); setScreen("seller-profile"); }}
            className="w-full py-4 rounded-[4px] font-extrabold text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <Check size={18} /> Save Changes
          </button>
        </div>
      </div>
    );
  };

  // ─── Seller Notifications ─────────────────────────────────────────────────────

  const SellerNotificationsScreen = () => {
    const rows: { key: keyof typeof notifPrefs; label: string; desc: string }[] = [
      { key: "newOrders", label: "New Orders", desc: "When a buyer purchases your item" },
      { key: "messages", label: "Messages", desc: "Replies and new chats from buyers" },
      { key: "lowStock", label: "Low Stock Alerts", desc: "When an item is running low or sold out" },
      { key: "priceOffers", label: "Price Offers", desc: "When a buyer negotiates a price" },
      { key: "promotions", label: "Promotions & Tips", desc: "Selling tips and platform offers" },
      { key: "weeklyReport", label: "Weekly Sales Report", desc: "A summary of your shop performance" },
    ];
    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Notifications" onBack={() => setScreen("seller-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Choose what you want to be notified about.</p>
          {rows.map(row => (
            <div key={row.key} className="flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border">
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.desc}</p>
              </div>
              <Toggle on={notifPrefs[row.key]} onChange={() => setNotifPrefs(p => ({ ...p, [row.key]: !p[row.key] }))} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Seller Privacy & Security ────────────────────────────────────────────────

  const SellerPrivacyScreen = () => {
    const toggles: { key: keyof typeof privacyPrefs; label: string; desc: string }[] = [
      { key: "twoFactor", label: "Two-Factor Authentication", desc: "Add an extra layer of security at login" },
      { key: "showOnlineStatus", label: "Show Online Status", desc: "Let buyers see when you're active" },
      { key: "publicProfile", label: "Public Shop Profile", desc: "Allow anyone to view your shop page" },
      { key: "dataSharing", label: "Personalized Ads", desc: "Use my activity to tailor recommendations" },
    ];
    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Privacy & Security" onBack={() => setScreen("seller-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          {/* Security actions */}
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Security</p>
          {([
            { label: "Change Password", flow: "change-password" as const },
            { label: "Login Activity", flow: "login-activity" as const },
            { label: "Connected Devices", flow: "manage-devices" as const },
          ]).map(row => (
            <button
              key={row.label}
              onClick={() => setSecurityFlow({ type: row.flow })}
              className="w-full flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border text-left transition-colors active:bg-muted"
            >
              <Lock size={17} style={{ color: ORANGE }} />
              <p className="flex-1 text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}

          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider pt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Preferences</p>
          {toggles.map(row => {
            const handle = () => {
              const turningOn = !privacyPrefs[row.key];
              if (turningOn && row.key === "twoFactor") { setSecurityFlow({ type: "2fa", onDone: () => setPrivacyPrefs(p => ({ ...p, twoFactor: true })) }); return; }
              setPrivacyPrefs(p => ({ ...p, [row.key]: !p[row.key] }));
            };
            return (
              <div key={row.key} className="flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border">
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.desc}</p>
                </div>
                <Toggle on={privacyPrefs[row.key]} onChange={handle} />
              </div>
            );
          })}

          <button
            onClick={() => showToast("Account deletion requested")}
            className="w-full py-3.5 rounded-[4px] font-bold text-sm mt-2 border-2"
            style={{ borderColor: "#DC2626", color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Delete Account
          </button>
        </div>
      </div>
    );
  };

  // ─── Seller Shop Setting (Shop Name / Location / Shipping) ─────────────────────

  const SellerShopSettingScreen = () => {
    const meta = {
      shopName: { title: "Shop Name", label: "Shop Name", hint: "This is how buyers will find your store.", options: null as string[] | null },
      location: { title: "Location", label: "Shop Location", hint: "Where your items ship from.", options: ["Karachi, Sindh", "Lahore, Punjab", "Islamabad, ICT", "Rawalpindi, Punjab", "Faisalabad, Punjab", "Peshawar, KPK"] },
      shipping: { title: "Shipping Policy", label: "Delivery Option", hint: "Set buyer expectations for delivery.", options: ["Standard · 2-3 days", "Express · 1 day", "Economy · 4-6 days", "Free Pickup Only"] },
    }[activeShopField];

    const [draft, setDraft] = useState(sellerProfile[activeShopField]);

    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title={meta.title} onBack={() => setScreen("seller-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4" style={{ scrollbarWidth: "none" }}>
          <FieldLabel>{meta.label}</FieldLabel>
          {meta.options ? (
            <div className="space-y-2">
              {meta.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setDraft(opt)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-[4px] border text-left transition-all"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    borderColor: draft === opt ? ORANGE : "rgba(26,17,8,0.1)",
                    background: draft === opt ? "#FFF3E0" : "white",
                  }}
                >
                  <span className="text-sm font-semibold">{opt}</span>
                  {draft === opt && <Check size={16} style={{ color: ORANGE }} />}
                </button>
              ))}
            </div>
          ) : (
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
          )}
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{meta.hint}</p>
        </div>
        <div className="px-5 py-4 border-t border-border flex-shrink-0">
          <button
            onClick={() => { setSellerProfile(p => ({ ...p, [activeShopField]: draft })); showToast(`${meta.title} saved ✓`); setScreen("seller-profile"); }}
            className="w-full py-4 rounded-[4px] font-extrabold text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <Check size={18} /> Save
          </button>
        </div>
      </div>
    );
  };

  // ─── Buyer Profile ────────────────────────────────────────────────────────────

  const BuyerProfileScreen = () => (
    <div className="flex flex-col h-full bg-background overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Hero */}
      <div className="px-5 pt-8 pb-6 flex flex-col items-center" style={{ background: `linear-gradient(160deg, #FF5722 0%, #FF8A50 100%)` }}>
        {buyerProfile.avatar ? (
          <img
            src={buyerProfile.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-[4px] object-cover border-4 border-white/30 mb-3"
          />
        ) : (
          <div className="w-20 h-20 rounded-[4px] border-4 border-white/30 mb-3 flex items-center justify-center bg-white/20">
            <span className="text-white text-2xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {buyerProfile.name.charAt(0)}
            </span>
          </div>
        )}
        <p className="text-white text-lg font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{buyerProfile.name}</p>
        <p className="text-white/80 text-xs mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{buyerProfile.email}</p>
        <div className="flex gap-4 text-center">
          {[[`${buyerOrders.length}`, "Orders"], [`${likedProducts.size}`, "Wishlist"], ["4.8★", "Buyer Rating"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-white font-extrabold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v}</p>
              <p className="text-white/70 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 space-y-3">
        {/* Become a / Switch to Seller */}
        {unlockedRoles.has("seller") ? (
          <button
            onClick={() => setShowRoleSwitch(true)}
            className="w-full flex items-center gap-3 p-3.5 rounded-[4px] border-2 transition-all active:scale-[0.98]"
            style={{ borderColor: "#1A1108", background: "#1A1108" }}
          >
            <Package size={18} color={YELLOW} />
            <p className="flex-1 text-left text-sm font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Switch to Seller Account</p>
            <ArrowRight size={16} color="white" />
          </button>
        ) : (
          <button
            onClick={() => { setAuthMode("signup"); setScreen("seller-auth"); }}
            className="w-full flex items-center gap-3 p-3.5 rounded-[4px] border-2 transition-all active:scale-[0.98]"
            style={{ borderColor: "#1A1108", background: "#1A1108" }}
          >
            <Package size={18} color={YELLOW} />
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Become a Seller</p>
              <p className="text-xs text-white/50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Open a shop & start earning</p>
            </div>
            <ArrowRight size={16} color="white" />
          </button>
        )}

        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Shopping</p>
        {([
          { icon: <Package size={18} />, label: "My Orders", to: "buyer-orders" as const, badge: `${buyerOrders.length}` },
          { icon: <Heart size={18} />, label: "Wishlist", to: "buyer-wishlist" as const, badge: `${likedProducts.size}` },
          { icon: <MapPin size={18} />, label: "Saved Addresses", to: "buyer-addresses" as const, badge: `${addresses.length}` },
          { icon: <ShoppingBag size={18} />, label: "Payment Methods", to: "buyer-payments" as const, badge: `${cards.length}` },
        ]).map(row => (
          <button
            key={row.label}
            onClick={() => setScreen(row.to)}
            className="w-full flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border text-left transition-colors active:bg-muted"
          >
            <span style={{ color: ORANGE }}>{row.icon}</span>
            <p className="flex-1 text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-[4px] bg-muted text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{row.badge}</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}

        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider pt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Account</p>
        {([
          { icon: <User size={18} />, label: "Edit Profile", to: "buyer-edit-profile" as const },
          { icon: <Bell size={18} />, label: "Notifications", to: "buyer-notifications" as const },
          { icon: <Shield size={18} />, label: "Privacy & Security", to: "buyer-privacy" as const },
        ]).map(row => (
          <button
            key={row.label}
            onClick={() => { if (row.to === "buyer-notifications") setNotifReturn("buyer-profile"); setScreen(row.to); }}
            className="w-full flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border text-left transition-colors active:bg-muted"
          >
            <span style={{ color: ORANGE }}>{row.icon}</span>
            <p className="flex-1 text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}

        <button
          onClick={() => { setRole(null); setUnlockedRoles(new Set()); setScreen("role-select"); setBuyerTab("home"); }}
          className="w-full py-3.5 rounded-[4px] font-bold text-sm mt-2 border-2 transition-transform active:scale-[0.98]"
          style={{ borderColor: "#DC2626", color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );

  // ─── Buyer Edit Profile (with avatar upload / remove) ──────────────────────────

  const BuyerEditProfileScreen = () => {
    const [draft, setDraft] = useState(buyerProfile);
    const set = (k: keyof typeof draft, v: string | null) => setDraft(d => ({ ...d, [k]: v }));
    const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Edit Profile" onBack={() => setScreen("buyer-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4" style={{ scrollbarWidth: "none" }}>
          {/* Avatar with upload / remove */}
          <div className="flex flex-col items-center gap-3">
            {draft.avatar ? (
              <img src={draft.avatar} alt="Profile" className="w-24 h-24 rounded-[4px] object-cover border-2 border-border" />
            ) : (
              <div className="w-24 h-24 rounded-[4px] border-2 border-dashed flex items-center justify-center" style={{ borderColor: ORANGE, background: "#FFF3E0" }}>
                <User size={34} style={{ color: ORANGE }} />
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => set("avatar", DEFAULT_AVATAR)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] text-xs font-bold"
                style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <Camera size={13} /> {draft.avatar ? "Change Photo" : "Upload Photo"}
              </button>
              {draft.avatar && (
                <button
                  onClick={() => set("avatar", null)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] text-xs font-bold border"
                  style={{ borderColor: "#DC2626", color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <X size={13} /> Remove
                </button>
              )}
            </div>
          </div>

          <div>
            <FieldLabel>Full Name</FieldLabel>
            <input value={draft.name} onChange={e => set("name", e.target.value)}
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
          </div>
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <input value={draft.email} onChange={e => set("email", e.target.value)} type="email"
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
          </div>
          <div>
            <FieldLabel>Phone Number</FieldLabel>
            <input value={draft.phone} onChange={e => set("phone", e.target.value)} type="tel"
              className="w-full px-4 py-3 rounded-[4px] bg-card border border-border text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
          </div>
          <div>
            <FieldLabel>Gender</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {genders.map(g => (
                <button
                  key={g}
                  onClick={() => set("gender", g)}
                  className="px-3 py-2 rounded-[4px] text-xs font-semibold transition-all"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: draft.gender === g ? ORANGE : "white",
                    color: draft.gender === g ? "white" : "#8A7E72",
                    border: draft.gender === g ? "none" : "1.5px solid rgba(26,17,8,0.1)",
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-border flex-shrink-0">
          <button
            onClick={() => { setBuyerProfile(draft); showToast("Profile updated ✓"); setScreen("buyer-profile"); }}
            className="w-full py-4 rounded-[4px] font-extrabold text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <Check size={18} /> Save Changes
          </button>
        </div>
      </div>
    );
  };

  // ─── Buyer Orders ──────────────────────────────────────────────────────────────

  const BuyerOrdersScreen = () => {
    const statusColor = (s: string) =>
      s === "Delivered" ? { bg: "#E8F5E9", fg: "#2E7D32" } :
      s === "In Transit" ? { bg: "#FFF3E0", fg: "#E65100" } :
      { bg: "#E3F2FD", fg: "#1565C0" };
    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="My Orders" onBack={() => setScreen("buyer-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          {buyerOrders.map(o => {
            const c = statusColor(o.status);
            return (
              <div key={o.id} className="p-3 bg-card rounded-[4px] border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>#{o.id}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-[4px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: c.bg, color: c.fg }}>{o.status}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <img src={o.img} alt={o.name} className="w-14 h-14 rounded-[4px] object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{o.name}</p>
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Ordered {o.date}</p>
                    <p className="text-xs font-extrabold mt-0.5" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PKR {o.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => showToast("Tracking opened")} className="flex-1 py-2 rounded-[4px] text-xs font-bold border border-border" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Track</button>
                  <button onClick={() => showToast("Reorder added to cart")} className="flex-1 py-2 rounded-[4px] text-xs font-bold" style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Buy Again</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── Buyer Wishlist ────────────────────────────────────────────────────────────

  const BuyerWishlistScreen = () => {
    const wishItems = products.filter(p => likedProducts.has(p.id));
    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Wishlist" onBack={() => setScreen("buyer-profile")} />
        {wishItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-3">
            <div className="w-20 h-20 rounded-[4px] flex items-center justify-center" style={{ background: "#FFF3E0" }}>
              <Heart size={34} style={{ color: ORANGE }} />
            </div>
            <p className="text-base font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No saved items yet</p>
            <p className="text-sm text-muted-foreground text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tap the heart on any item to save it here.</p>
            <button onClick={() => { setScreen("buyer-home"); setBuyerTab("home"); }} className="px-6 py-3 rounded-[4px] font-bold text-sm" style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Browse Thrifts</button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4 grid grid-cols-2 gap-3" style={{ scrollbarWidth: "none" }}>
            {wishItems.map(p => (
              <div key={p.id} className="rounded-[4px] bg-card overflow-hidden border border-border cursor-pointer" onClick={() => { setSelectedProduct(p); setGalleryIndex(0); setScreen("buyer-product"); }}>
                <div className="relative">
                  <img src={p.img} alt={p.name} className="w-full h-32 object-cover" />
                  <button
                    onClick={e => { e.stopPropagation(); toggleLike(p.id); }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-[4px] flex items-center justify-center bg-white/90"
                  >
                    <Heart size={14} fill={ORANGE} color={ORANGE} />
                  </button>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.name}</p>
                  <p className="text-sm font-extrabold mt-1" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PKR {p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Buyer Saved Addresses ─────────────────────────────────────────────────────

  const BuyerAddressesScreen = () => {
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState({ label: "", line: "", kind: "permanent" as "permanent" | "temporary" });

    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Saved Addresses" onBack={() => setScreen("buyer-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          {addresses.map(a => (
            <div key={a.id} className="p-3.5 bg-card rounded-[4px] border border-border" style={{ borderColor: a.isDefault ? ORANGE : undefined }}>
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={15} style={{ color: ORANGE }} />
                <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{a.label}</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-[4px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: a.kind === "permanent" ? "#E8F5E9" : "#FFF3E0", color: a.kind === "permanent" ? "#2E7D32" : "#E65100" }}>
                  {a.kind === "permanent" ? "Permanent" : "Temporary"}
                </span>
                {a.isDefault && <span className="text-xs font-bold ml-auto" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Default</span>}
              </div>
              <p className="text-xs text-muted-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{a.line}</p>
              <div className="flex gap-2">
                {!a.isDefault && (
                  <button onClick={() => setAddresses(prev => prev.map(x => ({ ...x, isDefault: x.id === a.id })))} className="text-xs font-bold" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Set Default</button>
                )}
                <button
                  onClick={() => setAddresses(prev => prev.map(x => x.id === a.id ? { ...x, kind: x.kind === "permanent" ? "temporary" : "permanent" } : x))}
                  className="text-xs font-bold text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Mark {a.kind === "permanent" ? "Temporary" : "Permanent"}
                </button>
                <button onClick={() => setAddresses(prev => prev.filter(x => x.id !== a.id))} className="text-xs font-bold ml-auto" style={{ color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Remove</button>
              </div>
            </div>
          ))}

          {adding ? (
            <div className="p-3.5 bg-card rounded-[4px] border border-border space-y-3">
              <FieldLabel>Label (e.g. Home, Office)</FieldLabel>
              <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="Home"
                className="w-full px-4 py-3 rounded-[4px] bg-background border border-border text-sm outline-none focus:border-primary" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
              <FieldLabel>Full Address</FieldLabel>
              <textarea value={form.line} onChange={e => setForm(f => ({ ...f, line: e.target.value }))} rows={2} placeholder="House #, Area, City, Province – Postal"
                className="w-full px-4 py-3 rounded-[4px] bg-background border border-border text-sm outline-none focus:border-primary resize-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
              <div className="flex gap-2">
                {(["permanent", "temporary"] as const).map(k => (
                  <button key={k} onClick={() => setForm(f => ({ ...f, kind: k }))} className="flex-1 py-2 rounded-[4px] text-xs font-bold capitalize"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: form.kind === k ? ORANGE : "white", color: form.kind === k ? "white" : "#8A7E72", border: form.kind === k ? "none" : "1.5px solid rgba(26,17,8,0.1)" }}>
                    {k}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setAdding(false)} className="flex-1 py-2.5 rounded-[4px] text-xs font-bold border border-border" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Cancel</button>
                <button
                  onClick={() => {
                    if (!form.label || !form.line) { showToast("Fill all fields"); return; }
                    setAddresses(prev => [...prev, { id: Date.now(), label: form.label, line: form.line, kind: form.kind, isDefault: prev.length === 0 }]);
                    setForm({ label: "", line: "", kind: "permanent" });
                    setAdding(false);
                    showToast("Address added ✓");
                  }}
                  className="flex-1 py-2.5 rounded-[4px] text-xs font-extrabold" style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Save Address
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAdding(true)} className="w-full py-3.5 rounded-[4px] font-bold text-sm flex items-center justify-center gap-2 border-2 border-dashed" style={{ borderColor: ORANGE, color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <Plus size={16} /> Add New Address
            </button>
          )}
        </div>
      </div>
    );
  };

  // ─── Buyer Payment Methods ─────────────────────────────────────────────────────

  const BuyerPaymentsScreen = () => {
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState({ number: "", exp: "", cvv: "", name: "" });

    const detectBrand = (num: string) => {
      const n = num.replace(/\s/g, "");
      if (n.startsWith("4")) return "Visa";
      if (n.startsWith("5")) return "Mastercard";
      return "Card";
    };

    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Payment Methods" onBack={() => setScreen("buyer-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Saved cards are encrypted. You won't need to re-enter details at checkout.
          </p>
          {cards.map(c => (
            <div key={c.id} className="p-4 rounded-[4px] text-white relative overflow-hidden" style={{ background: c.brand === "Visa" ? "linear-gradient(135deg,#1A1108,#FF5722)" : "linear-gradient(135deg,#1A1108,#E65100)" }}>
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.brand}</span>
                {c.isDefault && <span className="text-xs font-bold px-2 py-0.5 rounded-[4px] bg-white/20" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Default</span>}
              </div>
              <p className="text-base tracking-widest mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>•••• •••• •••• {c.last4}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70" style={{ fontFamily: "'DM Mono', monospace" }}>Exp {c.exp}</span>
                <div className="flex gap-3">
                  {!c.isDefault && <button onClick={() => setCards(prev => prev.map(x => ({ ...x, isDefault: x.id === c.id })))} className="text-xs font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Set Default</button>}
                  <button onClick={() => setCards(prev => prev.filter(x => x.id !== c.id))} className="text-xs font-bold text-white/90" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          {adding ? (
            <div className="p-3.5 bg-card rounded-[4px] border border-border space-y-3">
              <FieldLabel>Card Number</FieldLabel>
              <input value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} placeholder="4242 4242 4242 4242" inputMode="numeric"
                className="w-full px-4 py-3 rounded-[4px] bg-background border border-border text-sm outline-none focus:border-primary" style={{ fontFamily: "'DM Mono', monospace" }} />
              <div className="flex gap-2">
                <div className="flex-1">
                  <FieldLabel>Expiry</FieldLabel>
                  <input value={form.exp} onChange={e => setForm(f => ({ ...f, exp: e.target.value }))} placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-[4px] bg-background border border-border text-sm outline-none focus:border-primary" style={{ fontFamily: "'DM Mono', monospace" }} />
                </div>
                <div className="flex-1">
                  <FieldLabel>CVV</FieldLabel>
                  <input value={form.cvv} onChange={e => setForm(f => ({ ...f, cvv: e.target.value }))} placeholder="123" type="password" inputMode="numeric"
                    className="w-full px-4 py-3 rounded-[4px] bg-background border border-border text-sm outline-none focus:border-primary" style={{ fontFamily: "'DM Mono', monospace" }} />
                </div>
              </div>
              <FieldLabel>Name on Card</FieldLabel>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Aryan Kapoor"
                className="w-full px-4 py-3 rounded-[4px] bg-background border border-border text-sm outline-none focus:border-primary" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} />
              <div className="flex gap-2">
                <button onClick={() => setAdding(false)} className="flex-1 py-2.5 rounded-[4px] text-xs font-bold border border-border" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Cancel</button>
                <button
                  onClick={() => {
                    const digits = form.number.replace(/\s/g, "");
                    if (digits.length < 12 || !form.exp) { showToast("Enter valid card details"); return; }
                    setCards(prev => [...prev, { id: Date.now(), brand: detectBrand(form.number), last4: digits.slice(-4), exp: form.exp, isDefault: prev.length === 0 }]);
                    setForm({ number: "", exp: "", cvv: "", name: "" });
                    setAdding(false);
                    showToast("Card saved securely ✓");
                  }}
                  className="flex-1 py-2.5 rounded-[4px] text-xs font-extrabold" style={{ background: ORANGE, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Save Card
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAdding(true)} className="w-full py-3.5 rounded-[4px] font-bold text-sm flex items-center justify-center gap-2 border-2 border-dashed" style={{ borderColor: ORANGE, color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <Plus size={16} /> Add New Card
            </button>
          )}
        </div>
      </div>
    );
  };

  // ─── Buyer Notifications ───────────────────────────────────────────────────────

  const BuyerNotificationsScreen = () => {
    const feed = [
      { id: 1, icon: "📦", title: "Your order is on the way!", body: "New Balance 550 · Out for delivery", time: "10m ago", unread: true },
      { id: 2, icon: "💸", title: "Price drop on your wishlist", body: "Vintage Levi's Jacket dropped to PKR 1,199", time: "1h ago", unread: true },
      { id: 3, icon: "🔥", title: "New drops in Shoes", body: "12 fresh thrifted kicks just landed", time: "5h ago", unread: false },
      { id: 4, icon: "✅", title: "Order delivered", body: "Air Jordan 1 Retro High · Rate your purchase", time: "2d ago", unread: false },
    ];
    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Notifications" onBack={() => setScreen(notifReturn)} />

        {/* Preferences */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <div className="px-5 pt-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent</p>
          </div>
          {feed.map(n => (
            <div key={n.id} className="flex gap-3 px-5 py-3 border-b border-border" style={{ background: n.unread ? "#FFF8F3" : "transparent" }}>
              <div className="w-9 h-9 rounded-[4px] flex items-center justify-center flex-shrink-0" style={{ background: "#FFF3E0" }}>
                <span style={{ fontSize: 16 }}>{n.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold flex-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{n.title}</p>
                  {n.unread && <span className="w-2 h-2 rounded-[4px] flex-shrink-0" style={{ background: ORANGE }} />}
                </div>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{n.body}</p>
                <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>{n.time}</p>
              </div>
            </div>
          ))}

          {/* Toggles */}
          <div className="px-5 py-4 space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Preferences</p>
            {([
              { key: "orderUpdates" as const, label: "Order Updates" },
              { key: "priceDrops" as const, label: "Price Drops" },
              { key: "newArrivals" as const, label: "New Arrivals" },
              { key: "messages" as const, label: "Seller Messages" },
              { key: "promotions" as const, label: "Promotions" },
            ]).map(row => (
              <div key={row.key} className="flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border">
                <p className="flex-1 text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
                <Toggle on={buyerNotifPrefs[row.key]} onChange={() => setBuyerNotifPrefs(p => ({ ...p, [row.key]: !p[row.key] }))} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── Buyer Privacy & Security ──────────────────────────────────────────────────

  const BuyerPrivacyScreen = () => {
    const toggles: { key: keyof typeof buyerPrivacyPrefs; label: string; desc: string }[] = [
      { key: "twoFactor", label: "Two-Factor Authentication", desc: "Require an OTP code every time you log in" },
      { key: "biometric", label: "Biometric Login", desc: "Unlock with Face ID / fingerprint" },
      { key: "hideActivity", label: "Hide Shopping Activity", desc: "Keep your purchases & likes private" },
      { key: "savePayment", label: "Save Payment Securely", desc: "Encrypt & remember cards for faster checkout" },
      { key: "dataSharing", label: "Personalized Ads", desc: "Use my data to tailor recommendations" },
    ];
    return (
      <div className="flex flex-col h-full bg-background">
        <SettingsHeader title="Privacy & Security" onBack={() => setScreen("buyer-profile")} />
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          {/* Reassurance banner */}
          <div className="flex gap-2 p-3 rounded-[4px] items-start" style={{ background: "#E8F5E9" }}>
            <Shield size={16} style={{ color: "#2E7D32", flexShrink: 0, marginTop: 1 }} />
            <p className="text-xs" style={{ color: "#2E7D32", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Your privacy is our priority. All payments and personal data are encrypted end-to-end.
            </p>
          </div>

          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Security</p>
          {([
            { label: "Change Password", flow: "change-password" as const },
            { label: "Manage Devices", flow: "manage-devices" as const },
            { label: "Login Activity", flow: "login-activity" as const },
          ]).map(row => (
            <button key={row.label} onClick={() => setSecurityFlow({ type: row.flow })} className="w-full flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border text-left transition-colors active:bg-muted">
              <Lock size={17} style={{ color: ORANGE }} />
              <p className="flex-1 text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}

          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider pt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Preferences</p>
          {toggles.map(row => {
            const handle = () => {
              const turningOn = !buyerPrivacyPrefs[row.key];
              if (turningOn && row.key === "biometric") { setSecurityFlow({ type: "biometric", onDone: () => setBuyerPrivacyPrefs(p => ({ ...p, biometric: true })) }); return; }
              if (turningOn && row.key === "twoFactor") { setSecurityFlow({ type: "2fa", onDone: () => setBuyerPrivacyPrefs(p => ({ ...p, twoFactor: true })) }); return; }
              setBuyerPrivacyPrefs(p => ({ ...p, [row.key]: !p[row.key] }));
            };
            return (
              <div key={row.key} className="flex items-center gap-3 p-3.5 bg-card rounded-[4px] border border-border">
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.desc}</p>
                </div>
                <Toggle on={buyerPrivacyPrefs[row.key]} onChange={handle} />
              </div>
            );
          })}

          <button onClick={() => showToast("Account deletion requested")} className="w-full py-3.5 rounded-[4px] font-bold text-sm mt-2 border-2" style={{ borderColor: "#DC2626", color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Delete My Account
          </button>
        </div>
      </div>
    );
  };

  // ─── Buyer Search (dedicated) ──────────────────────────────────────────────────

  const BuyerSearchScreen = () => {
    const trending = ["Air Jordan", "Vintage Levi's", "Samba", "Y2K", "New Balance", "Floral Shirt"];
    const q = searchQuery.trim().toLowerCase();
    const results = q ? products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : [];

    return (
      <div className="flex flex-col h-full bg-background">
        {/* Search header */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-2 border-b border-border flex-shrink-0">
          <button onClick={() => { setBuyerTab("home"); setScreen("buyer-home"); }} className="w-9 h-9 rounded-[4px] border border-border flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-[4px] bg-card border border-border">
            <Search size={16} className="text-muted-foreground" />
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search brands, styles, sizes…"
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
            {searchQuery && <button onClick={() => setSearchQuery("")}><X size={15} className="text-muted-foreground" /></button>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
          {!q ? (
            <>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Trending Searches</p>
              <div className="flex flex-wrap gap-2">
                {trending.map(t => (
                  <button key={t} onClick={() => setSearchQuery(t)} className="px-3 py-2 rounded-[4px] text-sm font-semibold bg-card border border-border" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <Search size={32} className="text-muted-foreground" />
              <p className="text-sm font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No results for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {results.map(p => (
                <div key={p.id} className="rounded-[4px] bg-card overflow-hidden border border-border cursor-pointer" onClick={() => { setSelectedProduct(p); setGalleryIndex(0); setScreen("buyer-product"); }}>
                  <img src={p.img} alt={p.name} className="w-full h-32 object-cover" />
                  <div className="p-2.5">
                    <p className="text-xs font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.name}</p>
                    <p className="text-sm font-extrabold mt-1" style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PKR {p.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Navigation Bars ────────────────────────────────────────────────────────

  const BuyerNav = () => {
    const tabs = [
      { id: "home", label: "Home", icon: <Home size={20} /> },
      { id: "search", label: "Search", icon: <Search size={20} /> },
      { id: "vto", label: "Try-On", icon: <Camera size={20} /> },
      { id: "cart", label: "Cart", icon: <ShoppingBag size={20} /> },
      { id: "profile", label: "Me", icon: <User size={20} /> },
    ] as const;

    return (
      <div className="flex items-center bg-card border-t border-border px-2 py-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => navigateBuyer(tab.id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-1"
          >
            <span style={{ color: buyerTab === tab.id ? ORANGE : "#8A7E72" }}>{tab.icon}</span>
            <span
              className="text-xs font-semibold"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: buyerTab === tab.id ? ORANGE : "#8A7E72",
              }}
            >
              {tab.label}
            </span>
            {buyerTab === tab.id && (
              <div className="w-1 h-1 rounded-[4px]" style={{ background: ORANGE }} />
            )}
          </button>
        ))}
      </div>
    );
  };

  const SellerNav = () => {
    const tabs = [
      { id: "dashboard", label: "Dashboard", icon: <BarChart2 size={20} /> },
      { id: "listings", label: "Listings", icon: <Package size={20} /> },
      { id: "add", label: "Add", icon: <Plus size={22} />, special: true },
      { id: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
      { id: "profile", label: "Profile", icon: <User size={20} /> },
    ] as const;

    return (
      <div className="flex items-center bg-card border-t border-border px-2 py-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => navigateSeller(tab.id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-1"
          >
            {tab.special ? (
              <div
                className="w-11 h-11 rounded-[4px] flex items-center justify-center -mt-4 shadow-lg"
                style={{ background: ORANGE }}
              >
                <Plus size={22} color="white" />
              </div>
            ) : (
              <>
                <span style={{ color: sellerTab === tab.id ? ORANGE : "#8A7E72" }}>{tab.icon}</span>
                <span
                  className="text-xs font-semibold"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: sellerTab === tab.id ? ORANGE : "#8A7E72",
                  }}
                >
                  {tab.label}
                </span>
                {sellerTab === tab.id && (
                  <div className="w-1 h-1 rounded-[4px]" style={{ background: ORANGE }} />
                )}
              </>
            )}
          </button>
        ))}
      </div>
    );
  };

  // ─── Layout ─────────────────────────────────────────────────────────────────

  const showBuyerNav = role === "buyer" && !["splash", "role-select", "buyer-auth", "seller-auth", "buyer-vto", "buyer-edit-profile", "buyer-addresses", "buyer-payments", "buyer-notifications", "buyer-privacy"].includes(screen);
  const showSellerNav = role === "seller" && !["splash", "role-select", "buyer-auth", "seller-auth", "seller-edit-profile", "seller-notifications", "seller-privacy", "seller-shop-setting"].includes(screen);
  const isFullscreen = ["splash", "buyer-vto"].includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen />;
      case "onboarding-1": return <OnboardingScreen pageIndex={1} />;
      case "onboarding-2": return <OnboardingScreen pageIndex={2} />;
      case "onboarding-3": return <OnboardingScreen pageIndex={3} />;
      case "role-select": return <RoleSelectScreen />;
      case "buyer-auth": return <AuthScreen forRole="buyer" />;
      case "seller-auth": return <AuthScreen forRole="seller" />;
      case "buyer-home": return <BuyerHomeScreen />;
      case "buyer-product": return <ProductDetailScreen />;
      case "buyer-vto": return <VTOScreen />;
      case "buyer-cart": return <CartScreen />;
      case "buyer-profile": return <BuyerProfileScreen />;
      case "buyer-edit-profile": return <BuyerEditProfileScreen />;
      case "buyer-orders": return <BuyerOrdersScreen />;
      case "buyer-wishlist": return <BuyerWishlistScreen />;
      case "buyer-addresses": return <BuyerAddressesScreen />;
      case "buyer-payments": return <BuyerPaymentsScreen />;
      case "buyer-notifications": return <BuyerNotificationsScreen />;
      case "buyer-privacy": return <BuyerPrivacyScreen />;
      case "buyer-search": return <BuyerSearchScreen />;
      case "seller-dashboard": return <SellerDashboardScreen />;
      case "seller-listings": return <SellerListingsScreen />;
      case "seller-messages": return <SellerMessagesScreen />;
      case "seller-profile": return <SellerProfileScreen />;
      case "seller-edit-profile": return <SellerEditProfileScreen />;
      case "seller-notifications": return <SellerNotificationsScreen />;
      case "seller-privacy": return <SellerPrivacyScreen />;
      case "seller-shop-setting": return <SellerShopSettingScreen />;
      case "seller-add": return <SellerAddScreen />;
      default: return <BuyerHomeScreen />;
    }
  };

  // ─── Auth state ─────────────────────────────────────────────────────────────
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const AuthScreen = ({ forRole }: { forRole: "buyer" | "seller" }) => {
    const isBuyer = forRole === "buyer";
    const accentBg = isBuyer ? ORANGE : "#1A1108";
    const destination: Screen = isBuyer ? "buyer-home" : "seller-dashboard";

    const InputRow = ({
      icon,
      placeholder,
      type = "text",
      rightEl,
    }: {
      icon: React.ReactNode;
      placeholder: string;
      type?: string;
      rightEl?: React.ReactNode;
    }) => (
      <div
        className="flex items-center gap-3 px-4 py-3.5 rounded-[4px] border"
        style={{ background: "#F8F6F3", borderColor: "rgba(26,17,8,0.1)" }}
      >
        <span className="text-muted-foreground flex-shrink-0">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        />
        {rightEl}
      </div>
    );

    return (
      <div className="flex flex-col h-full bg-background overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Hero header */}
        <div
          className="relative px-6 pt-12 pb-10 flex flex-col items-center"
          style={{ background: `linear-gradient(160deg, ${isBuyer ? "#FF5722" : "#1A1108"} 0%, ${isBuyer ? "#FF8A50" : "#2D1F0E"} 100%)` }}
        >
          <button
            onClick={() => setScreen("role-select")}
            className="absolute top-5 left-5 w-9 h-9 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20"
          >
            <ChevronLeft size={20} color="white" />
          </button>

          {/* Logo */}
          <div className="w-16 h-16 rounded-[4px] overflow-hidden mb-4" style={{ background: "rgba(255,255,255,0.15)" }}>
            <ImageWithFallback
              src={logoImg}
              alt="Thrift Kro logo"
              className="w-full h-full object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          <h2
            className="text-2xl font-extrabold text-white mb-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {authMode === "login" ? "Welcome back!" : isBuyer ? "Join as a Buyer" : "Start Selling Today"}
          </h2>
          <p className="text-white/70 text-sm text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {authMode === "login"
              ? `Sign in to your ${isBuyer ? "buyer" : "seller"} account`
              : isBuyer
                ? "Find unique pre-loved pieces"
                : "List your items & earn money"}
          </p>

          {/* Login / Signup toggle pills */}
          <div className="flex mt-5 p-1 rounded-[4px] bg-white/10 gap-1">
            {(["login", "signup"] as const).map(m => (
              <button
                key={m}
                onClick={() => { setAuthMode(m); setShowPass(false); setShowConfirmPass(false); }}
                className="px-5 py-1.5 rounded-[4px] text-sm font-bold transition-all"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: authMode === m ? "white" : "transparent",
                  color: authMode === m ? accentBg : "rgba(255,255,255,0.7)",
                }}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 px-6 py-6 flex flex-col gap-4">
          {authMode === "signup" && (
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Full Name
              </label>
              <InputRow icon={<User size={16} />} placeholder={isBuyer ? "e.g. Aryan Kapoor" : "e.g. Priya Sharma"} />
            </div>
          )}

          {authMode === "signup" && (
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Phone Number
              </label>
              <InputRow icon={<Phone size={16} />} placeholder="+92 3XX XXXXXXX" type="tel" />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Email Address
            </label>
            <InputRow icon={<Mail size={16} />} placeholder="you@example.com" type="email" />
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Password
            </label>
            <InputRow
              icon={<Lock size={16} />}
              placeholder="Enter password"
              type={showPass ? "text" : "password"}
              rightEl={
                <button onClick={() => setShowPass(p => !p)}>
                  {showPass ? <EyeOff size={16} className="text-muted-foreground" /> : <Eye size={16} className="text-muted-foreground" />}
                </button>
              }
            />
          </div>

          {authMode === "signup" && (
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Confirm Password
              </label>
              <InputRow
                icon={<Lock size={16} />}
                placeholder="Re-enter password"
                type={showConfirmPass ? "text" : "password"}
                rightEl={
                  <button onClick={() => setShowConfirmPass(p => !p)}>
                    {showConfirmPass ? <EyeOff size={16} className="text-muted-foreground" /> : <Eye size={16} className="text-muted-foreground" />}
                  </button>
                }
              />
            </div>
          )}

          {authMode === "login" && (
            <button
              onClick={() => showToast("Password reset link sent to your email")}
              className="text-xs font-semibold text-right w-full"
              style={{ color: ORANGE, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Forgot Password?
            </button>
          )}

          {/* CTA */}
          <button
            onClick={() => {
              setRole(forRole);
              setScreen(destination);
              setUnlockedRoles(prev => new Set([...prev, forRole]));
            }}
            className="w-full py-4 rounded-[4px] font-extrabold text-base flex items-center justify-center gap-2 mt-1 transition-transform active:scale-[0.98]"
            style={{ background: accentBg, color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {authMode === "login" ? "Log In" : "Create Account"} <ArrowRight size={18} />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(26,17,8,0.1)" }} />
            <span className="text-xs text-muted-foreground font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              or continue with
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(26,17,8,0.1)" }} />
          </div>

          {/* Google */}
          <button
            onClick={() => {
              setRole(forRole);
              setScreen(destination);
              setUnlockedRoles(prev => new Set([...prev, forRole]));
            }}
            className="w-full py-3.5 rounded-[4px] font-semibold text-sm flex items-center justify-center gap-3 border transition-transform active:scale-[0.98]"
            style={{
              background: "white",
              borderColor: "rgba(26,17,8,0.12)",
              color: "#1A1108",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-muted-foreground pb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setShowPass(false); setShowConfirmPass(false); }}
              className="font-bold"
              style={{ color: ORANGE }}
            >
              {authMode === "login" ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    );
  };

  const [phoneScale, setPhoneScale] = useState(1);
  const PHONE_W = 390;
  const PHONE_H = 844;

  useEffect(() => {
    const calc = () => {
      const scaleX = (window.innerWidth - 32) / PHONE_W;
      const scaleY = (window.innerHeight - 32) / PHONE_H;
      setPhoneScale(Math.min(scaleX, scaleY, 1));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div
      className="w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #1A1108 0%, #2D1F0E 60%, #3D1F00 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Phone frame — scaled to fit viewport */}
      <div
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${phoneScale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
        className="relative flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Outer shell */}
        <div
          className="absolute inset-0 rounded-[8px] pointer-events-none"
          style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 1.5px rgba(255,255,255,0.15)" }}
        />
        <div className="absolute inset-0 rounded-[8px] overflow-hidden" style={{ background: "#F8F6F3" }}>
          {/* Status bar */}
          {!isFullscreen && (
            <div className="flex items-center justify-between px-7 py-3 flex-shrink-0">
              <span className="text-xs font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>9:41</span>
              <div className="w-24 h-6 rounded-[4px]" style={{ background: "#1A1108" }} />
              <div className="flex gap-1 items-center">
                <div className="flex gap-0.5 items-end">
                  {[3, 5, 7, 9].map(h => (
                    <div key={h} className="w-0.5 rounded-sm" style={{ height: h, background: "#1A1108" }} />
                  ))}
                </div>
                <div className="w-5 h-2.5 rounded-sm border border-foreground/70 relative ml-0.5">
                  <div className="absolute left-0.5 top-0.5 bottom-0.5 w-3 rounded-sm" style={{ background: "#1A1108" }} />
                  <div className="absolute -right-0.5 top-1 bottom-1 w-0.5 rounded-[4px]" style={{ background: "#1A1108" }} />
                </div>
              </div>
            </div>
          )}

          {/* Screen content */}
          <div className="absolute left-0 right-0 bottom-0" style={{ top: isFullscreen ? 0 : 44 }}>
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-hidden relative">
                {renderScreen()}
                {showRoleSwitch && <RoleSwitchModal />}
                {showSuccessPopup && <PurchaseSuccessModal />}
                {securityFlow && <SecurityFlowModal />}
                {toastMsg && (
                  <div className="absolute top-4 left-0 right-0 flex justify-center z-50 px-5 pointer-events-none">
                    <div
                      className="px-4 py-2.5 rounded-[4px] text-sm font-bold text-white flex items-center gap-2"
                      style={{ background: "#1A1108", fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
                    >
                      <Check size={15} style={{ color: YELLOW }} /> {toastMsg}
                    </div>
                  </div>
                )}
              </div>
              {showBuyerNav && <BuyerNav />}
              {showSellerNav && <SellerNav />}
              <div className="flex justify-center py-2 bg-background flex-shrink-0">
                <div className="w-32 h-1 rounded-[4px]" style={{ background: "rgba(26,17,8,0.2)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
