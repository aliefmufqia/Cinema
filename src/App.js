import React, { useState, useEffect } from "react";

// -------------------- Utilities & Icons --------------------

const Icons = {
  CreditCard: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Smartphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  ShieldCheck: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  TrendingUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Film: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Speaker: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><circle cx="12" cy="14" r="4"/><line x1="12" y1="6" x2="12.01" y2="6"/></svg>,
  Armchair: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Tag: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Filter: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
};

function generateSeats(rows = 6, cols = 8) {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r); // A, B, C...
    for (let c = 1; c <= cols; c++) {
      seats.push({ id: rowLetter + c, booked: false });
    }
  }
  return seats;
}

function sampleMovies() {
  const baseMovies = [
    {
      id: "f1",
      title: "Langit Merah",
      genre: "Drama / Petualangan",
      duration: "2j 10m",
      rating: "13+",
      price: 45000,
      image: "https://images.unsplash.com/photo-1533929736458-ca588d080e81?auto=format&fit=crop&q=80&w=800",
      synopsis: "Film Langit Merah menceritakan perjalanan seorang pemuda dalam menghadapi konflik di desanya.",
      schedules: [
        { id: "s1", date: "2025-12-03", time: "12:00", studio: "Studio 1" },
        { id: "s2", date: "2025-12-03", time: "15:00", studio: "Studio 1" },
        { id: "s3", date: "2025-12-03", time: "18:00", studio: "Studio 2" },
      ],
      seats: generateSeats(),
    },
    {
      id: "f2",
      title: "Malam di Kota",
      genre: "Thriller",
      duration: "1j 55m",
      rating: "17+",
      price: 50000,
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80&w=800",
      synopsis: "Seorang detektif mencoba mengungkap misteri pembunuhan yang terjadi di kota besar.",
      schedules: [
        { id: "s4", date: "2025-12-03", time: "13:00", studio: "Studio 2" },
        { id: "s5", date: "2025-12-03", time: "16:30", studio: "Studio 2" },
        { id: "s6", date: "2025-12-03", time: "20:00", studio: "Studio 3" },
      ],
      seats: generateSeats(),
    },
    {
      id: "f3",
      title: "Komedi Cinta",
      genre: "Romcom",
      duration: "2j 05m",
      rating: "SU",
      price: 40000,
      image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&q=80&w=800",
      synopsis: "Kisah romantis lucu antara dua sahabat yang akhirnya saling jatuh cinta.",
      schedules: [
        { id: "s7", date: "2025-12-03", time: "10:00", studio: "Studio 1" },
        { id: "s8", date: "2025-12-03", time: "14:00", studio: "Studio 3" },
        { id: "s9", date: "2025-12-03", time: "19:00", studio: "Studio 4" },
      ],
      seats: generateSeats(),
    },
  ];

  const extraTitles = [
    { t: "Neon Shadows", g: "Sci-Fi / Cyberpunk", i: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80&w=800" },
    { t: "The Last Samurai", g: "Action / History", i: "https://images.unsplash.com/photo-1614184693630-3c22b9f3933c?auto=format&fit=crop&q=80&w=800" },
    { t: "Deep Ocean", g: "Documentary", i: "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?auto=format&fit=crop&q=80&w=800" },
    { t: "Velocity", g: "Action / Racing", i: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800" },
    { t: "Haunted Manor", g: "Horror", i: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80&w=800" },
    { t: "Coffee & Rain", g: "Romance / Drama", i: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" },
    { t: "Cyber Soul", g: "Sci-Fi", i: "https://images.unsplash.com/photo-1535378437323-9555f3e7f6aa?auto=format&fit=crop&q=80&w=800" },
    { t: "Golden Age", g: "Drama / History", i: "https://images.unsplash.com/photo-1551049695-10d628739994?auto=format&fit=crop&q=80&w=800" },
    { t: "Mountain Peak", g: "Adventure", i: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { t: "Jazz Night", g: "Music / Drama", i: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800" },
    { t: "Desert Storm", g: "Action", i: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800" },
    { t: "The Architect", g: "Drama", i: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800" },
    { t: "Silent Space", g: "Sci-Fi / Horror", i: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800" },
    { t: "Wild West", g: "Western", i: "https://images.unsplash.com/photo-1534068590799-09895a701e3e?auto=format&fit=crop&q=80&w=800" },
    { t: "Urban Legend", g: "Thriller", i: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800" },
    { t: "Flower Garden", g: "Animation / Family", i: "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?auto=format&fit=crop&q=80&w=800" },
    { t: "Chess Master", g: "Drama", i: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800" },
    { t: "Midnight Run", g: "Action", i: "https://images.unsplash.com/photo-1495539406979-bf61752d0232?auto=format&fit=crop&q=80&w=800" },
    { t: "Lost City", g: "Adventure", i: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
    { t: "Future War", g: "Sci-Fi / Action", i: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&q=80&w=800" },
    { t: "Solaris Eclipse", g: "Sci-Fi", i: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
    { t: "The Jazz Club", g: "Music / Drama", i: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800" },
    { t: "Midnight Racer", g: "Action", i: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800" },
    { t: "Lost Kingdom", g: "Fantasy", i: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
    { t: "Urban Jungle", g: "Drama", i: "https://images.unsplash.com/photo-1449824913929-2b3a3e3571d5?auto=format&fit=crop&q=80&w=800" },
    { t: "Deep Blue", g: "Documentary", i: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=800" },
    { t: "Cyber Punk 2099", g: "Sci-Fi", i: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800" },
    { t: "The Duel", g: "Action", i: "https://images.unsplash.com/photo-1615672917615-d2436e222d11?auto=format&fit=crop&q=80&w=800" },
    { t: "Silent Hillside", g: "Horror", i: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800" },
    { t: "Love in Venice", g: "Romance", i: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800" },
    { t: "Tech Wars", g: "Sci-Fi", i: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800" },
    { t: "Ancient Secrets", g: "Adventure", i: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800" },
    { t: "Street Food", g: "Documentary", i: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800" },
    { t: "The Comedian", g: "Comedy", i: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=800" },
    { t: "Crimson Sky", g: "Thriller", i: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800" },
    { t: "Forest Spirit", g: "Fantasy", i: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800" },
    { t: "Neon Rider", g: "Action", i: "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&q=80&w=800" },
    { t: "Winter Tale", g: "Drama", i: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&q=80&w=800" },
    { t: "Desert Mirage", g: "Adventure", i: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=800" },
    { t: "Space Odyssey", g: "Sci-Fi", i: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800" }
  ];

  const additionalMovies = extraTitles.map((item, index) => ({
    id: `f${index + 4}`,
    title: item.t,
    genre: item.g,
    duration: "1j 50m",
    rating: index % 2 === 0 ? "13+" : "17+",
    price: 45000 + (index % 3) * 5000,
    image: item.i,
    synopsis: "Sebuah kisah epik yang akan membawa Anda ke dalam petualangan tak terlupakan dengan visual yang memukau dan cerita yang mendalam.",
    schedules: [
      { id: `s_${index}_1`, date: "2025-12-03", time: "14:00", studio: "Studio 1" },
      { id: `s_${index}_2`, date: "2025-12-03", time: "16:30", studio: "Studio 3" },
      { id: `s_${index}_3`, date: "2025-12-03", time: "19:00", studio: "Studio 5" }
    ],
    seats: generateSeats()
  }));

  return [...baseMovies, ...additionalMovies];
}

function generateTicket({ movie, schedule, seats, user }) {
  const code = "CX-" + Math.random().toString(36).substring(2, 9).toUpperCase();
  return { movie, schedule, seats, user, code, timestamp: new Date().toISOString() };
}

function QRCodeSVG({ value = "QR" }) {
  const s = 80;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="inline-block bg-white p-1 rounded shadow-sm">
      <rect x="4" y="4" width="20" height="20" fill="#0f172a" />
      <rect x="56" y="4" width="20" height="20" fill="#0f172a" />
      <rect x="4" y="56" width="20" height="20" fill="#0f172a" />
      <rect x="34" y="34" width="6" height="6" fill="#0f172a" />
      <rect x="44" y="44" width="6" height="6" fill="#0f172a" />
      <rect x="24" y="44" width="6" height="6" fill="#0f172a" />
    </svg>
  );
}

// -------------------- Sub Components --------------------

const Home = ({ movies, onBook, onSeeSchedule, user, onLogin }) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [showMemberPopup, setShowMemberPopup] = useState(false);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies?.length]);

  const handleJoinMember = () => {
    if (!user) {
      if (window.confirm("Anda perlu login untuk bergabung menjadi member. Lanjut ke login?")) {
        onLogin();
      }
    } else {
      setShowMemberPopup(true);
    }
  };

  if (!movies || movies.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // --- Logic Filtering & Sorting ---
  const getProcessedMovies = () => {
      let filtered = movies;
      if (activeTab !== 'All') {
          filtered = movies.filter(m => m.genre.includes(activeTab));
      }
      
      // Clone array to sort without mutating original
      const sorted = [...filtered];
      
      if (sortOrder === 'az') {
          sorted.sort((a,b) => a.title.localeCompare(b.title));
      } else if (sortOrder === 'za') {
          sorted.sort((a,b) => b.title.localeCompare(a.title));
      }
      // 'default' uses original array order (index logic)
      
      return sorted;
  }

  const displayedMovies = getProcessedMovies();
  
  const currentHero = movies[heroIndex] || movies[0];
  const nextHeroIndex = (heroIndex + 1) % movies.length;
  const nextHero = movies[nextHeroIndex];

  if (!currentHero) return null;

  return (
    <div className="animate-fade-in -mt-24 pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Layers */}
        {movies.map((m, idx) => (
          <div 
            key={m.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === heroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          >
             <div className="absolute inset-0 bg-black/40 z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/60 z-20" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent z-20" />
             <img 
               src={m.image} 
               alt={m.title} 
               className="w-full h-full object-cover object-center" 
             />
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute top-0 left-0 w-full h-full z-30 flex flex-col justify-center px-6 md:px-20 pt-20">
           <div className="max-w-4xl space-y-6">
              <div className="flex items-center gap-3 animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <span className="bg-[#D4AF37] text-black px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                    {currentHero.rating} Rated
                  </span>
                  <span className="text-gray-300 text-sm tracking-wide border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                    {currentHero.genre}
                  </span>
                  <span className="text-[#D4AF37] flex items-center gap-1 text-sm font-medium">
                    <Icons.Star /> 9.8/10
                  </span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl animate-slide-up" style={{animationDelay: '0.2s'}}>
                {currentHero.title}
              </h1>

              <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl line-clamp-3 leading-relaxed animate-slide-up" style={{animationDelay: '0.3s'}}>
                 {currentHero.synopsis}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
                 <button 
                   onClick={() => onBook(currentHero)}
                   className="px-8 py-4 bg-[#D4AF37] hover:bg-[#F2D675] text-black font-bold text-lg rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-3"
                 >
                   <span>Beli Tiket</span>
                   <Icons.CreditCard />
                 </button>
                 <button 
                   onClick={onSeeSchedule}
                   className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-bold text-lg rounded-full transition-all flex items-center gap-3"
                 >
                   <Icons.Play />
                   <span>Trailer</span>
                 </button>
              </div>
           </div>
        </div>

        {/* Next Slide Preview */}
        {nextHero && (
          <div className="absolute bottom-12 right-6 md:right-20 z-30 hidden md:flex items-center gap-6">
              <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Selanjutnya</p>
                  <h4 className="text-white font-bold text-lg leading-tight">{nextHero.title}</h4>
              </div>
              <div 
                  className="w-32 h-20 rounded-lg overflow-hidden border-2 border-white/20 cursor-pointer hover:border-[#D4AF37] transition relative group"
                  onClick={() => setHeroIndex(nextHeroIndex)}
              >
                  <img src={nextHero.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" />
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-[#D4AF37] transition">
                          <Icons.ChevronLeft className="rotate-180 w-4 h-4 text-white group-hover:text-black" />
                      </div>
                  </div>
              </div>
          </div>
        )}

        {/* Pagination Dots */}
        <div className="absolute bottom-12 left-6 md:left-20 z-30 flex gap-3">
            {movies.map((_, idx) => (
                <div 
                    key={idx} 
                    onClick={() => setHeroIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${idx === heroIndex ? 'w-12 bg-[#D4AF37]' : 'w-4 bg-gray-600 hover:bg-gray-400'}`}
                />
            ))}
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-40">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-16 mb-20">
              {[
                  { icon: <Icons.Star />, title: "Premium Experience", desc: "Layar IMAX & Dolby Atmos" },
                  { icon: <Icons.CreditCard />, title: "Easy Booking", desc: "Bayar via QRIS & E-Wallet" },
                  { icon: <Icons.Armchair />, title: "Luxury Seats", desc: "Kursi Recliner Kulit" },
                  { icon: <Icons.ShieldCheck />, title: "Safe & Clean", desc: "Protokol Kebersihan Ketat" }
              ].map((item, i) => (
                  <div key={i} className="bg-[#141414]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:border-[#D4AF37]/50 transition group">
                      <div className="w-12 h-12 bg-[#1f1f1f] rounded-full flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition">{item.icon}</div>
                      <h3 className="text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
              ))}
          </div>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div>
                  <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase mb-2 block">Pilihan Penonton</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Film Populer</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-start md:items-center">
                  {/* Category Filter */}
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                      {['All', 'Action', 'Drama', 'Thriller', 'Comedy'].map(cat => (
                          <button 
                            key={cat}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition whitespace-nowrap border border-transparent ${activeTab === cat ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10'}`}
                            onClick={() => setActiveTab(cat)}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative group">
                      <select 
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value)}
                          className="appearance-none bg-[#141414] border border-white/20 text-white py-2 pl-4 pr-10 rounded-full focus:outline-none focus:border-[#D4AF37] cursor-pointer hover:bg-white/5 transition text-sm font-medium"
                      >
                          <option value="default">Terpopuler</option>
                          <option value="az">Judul (A - Z)</option>
                          <option value="za">Judul (Z - A)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Icons.Filter />
                      </div>
                  </div>
              </div>
          </div>

          {/* Movie Grid */}
          {displayedMovies.length === 0 ? (
              <div className="text-center py-20 text-gray-500">Tidak ada film ditemukan untuk kategori ini.</div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                  {displayedMovies.map((m, index) => (
                      <div key={m.id} className="group relative" onClick={() => onBook(m)}>
                          <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-gray-800 relative shadow-2xl cursor-pointer">
                              <img src={m.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-50" loading="lazy" />
                              
                              {/* Rank Badge */}
                              <div className="absolute top-0 left-0 bg-[#D4AF37] text-black font-black text-xl px-4 py-3 rounded-br-2xl shadow-lg z-10 border-b border-r border-white/20">
                                  #{index + 1}
                              </div>

                              {/* Hover Content */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 p-6">
                                  <button className="bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-full hover:bg-white transition translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg mb-4 w-full">
                                      Beli Tiket
                                  </button>
                                  <button className="bg-white/10 backdrop-blur border border-white/20 text-white font-bold px-8 py-3 rounded-full hover:bg-white/20 transition translate-y-4 group-hover:translate-y-0 duration-300 delay-75 w-full">
                                      Detail
                                  </button>
                              </div>

                              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/20">
                                  {m.rating}
                              </div>
                          </div>
                          
                          <div className="mt-4 px-2">
                              <h3 className="text-white text-xl font-bold truncate group-hover:text-[#D4AF37] transition">{m.title}</h3>
                              <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                                  <span>{m.duration}</span>
                                  <span className="flex items-center gap-1"><Icons.Star className="w-3 h-3 text-[#D4AF37]" /> 4.8</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          )}

          {/* Promo Section */}
          <div className="relative rounded-3xl overflow-hidden mb-24 border border-white/10 group">
              <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-40 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
              </div>
              <div className="relative z-10 p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="max-w-2xl">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                          Nikmati Film Terbaik <br/>
                          <span className="text-[#D4AF37]">Tanpa Batas</span>
                      </h2>
                      <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                          Bergabunglah dengan CineX Gold Membership dan dapatkan akses eksklusif ke lounge VIP, diskon tiket hingga 50%, dan popcorn gratis setiap hari Jumat.
                      </p>
                      <button 
                        onClick={handleJoinMember}
                        className="bg-[#D4AF37] text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-[#F2D675] shadow-[0_0_30px_rgba(212,175,55,0.3)] transition"
                      >
                          Gabung Member Sekarang
                      </button>
                  </div>
                  
                  <div className="relative w-80 h-48 md:w-96 md:h-56 perspective-1000 group-hover:rotate-1 transition duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#F6E27A] to-[#B8860B] rounded-2xl shadow-2xl p-6 flex flex-col justify-between transform rotate-[-5deg] group-hover:rotate-0 transition duration-500 border border-white/20">
                          <div className="flex justify-between items-start">
                              <span className="font-black text-2xl tracking-widest text-black/80">GOLD</span>
                              <Icons.Star className="w-8 h-8 text-black/50" />
                          </div>
                          <div>
                              <div className="flex gap-4 mb-2">
                                  <div className="w-10 h-6 bg-black/10 rounded"></div>
                                  <div className="w-10 h-6 bg-black/10 rounded"></div>
                              </div>
                              <p className="font-mono text-xl text-black/80 tracking-widest">**** **** **** 8899</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Newsletter */}
          <div className="text-center py-20 border-t border-white/5">
              <h2 className="text-3xl font-bold text-white mb-4">Jangan Lewatkan Film Terbaru</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">Berlangganan newsletter kami untuk mendapatkan update jadwal film terbaru dan promo eksklusif.</p>
              <div className="flex max-w-md mx-auto bg-white/5 rounded-full p-1 border border-white/10 focus-within:border-[#D4AF37] transition">
                  <input type="email" placeholder="Masukkan email Anda" className="flex-1 bg-transparent px-6 py-3 text-white outline-none placeholder:text-gray-600" />
                  <button className="bg-[#D4AF37] hover:bg-[#F2D675] text-black px-8 py-3 rounded-full font-bold transition">
                      Subscribe
                  </button>
              </div>
          </div>

      </div>

      {/* Member Popup */}
      {showMemberPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#1a1a1a] border border-[#D4AF37] p-8 rounded-3xl max-w-md w-full text-center relative shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                <button 
                    onClick={() => setShowMemberPopup(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                    <Icons.X />
                </button>
                <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.Star className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Selamat Bergabung!</h3>
                <p className="text-gray-300 mb-6">
                    Anda resmi menjadi <span className="text-[#D4AF37] font-bold">CineX Gold Member</span>.
                </p>
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-4 rounded-xl mb-6">
                    <p className="text-xs text-[#D4AF37] uppercase tracking-widest mb-1">Kode Voucher Khusus</p>
                    <p className="text-2xl font-mono font-bold text-white tracking-wider">CINEX25</p>
                    <p className="text-xs text-gray-400 mt-2">Gunakan kode ini untuk potongan Rp25.000</p>
                </div>
                <button 
                    onClick={() => setShowMemberPopup(false)}
                    className="w-full py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#F2D675] transition"
                >
                    Siap Digunakan
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

const NowPlaying = ({ movies, onBook }) => (
  <div className="animate-fade-in">
    <h2 className="text-3xl font-bold mb-8 text-center text-[#D4AF37]">Sedang Tayang</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {movies && movies.map((movie) => (
        <div key={movie.id} className="bg-[#141414] border border-[#D4AF37]/20 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition duration-300 shadow-xl flex flex-col">
          <div className="relative h-48 overflow-hidden">
             <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
             <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#141414] to-transparent"></div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                <span className="bg-[#222] text-[#D4AF37] text-xs px-2 py-1 rounded border border-[#D4AF37]/30">{movie.rating}</span>
             </div>
             <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{movie.synopsis}</p>
             <div className="space-y-3">
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Icons.Clock /> {movie.duration} • {movie.genre}
               </div>
               <button onClick={() => onBook(movie)} className="w-full py-3 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] rounded-xl hover:bg-[#D4AF37] hover:text-black font-bold transition">
                 Pesan Tiket - Rp{movie.price.toLocaleString('id-ID')}
               </button>
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    onLogin(formData.name);
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center py-10">
       <div className="w-full max-w-5xl bg-[#141414] border border-[#333] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row relative animate-fade-in">
          <div className="hidden md:block w-1/2 relative overflow-hidden group">
             <img 
               src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
               alt="Cinema Experience"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 flex flex-col justify-between p-12">
                <div className="text-[#D4AF37] font-bold text-2xl tracking-wider flex items-center gap-2">
                    <span className="text-3xl">⚡</span> CineX GOLD
                </div>
                <div>
                   <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                      Experience <span className="text-[#D4AF37]">Cinema</span> <br/> Like Never Before.
                   </h2>
                   <div className="space-y-4">
                       <div className="flex items-center gap-3 text-gray-300">
                           <div className="bg-[#D4AF37]/20 p-2 rounded-full text-[#D4AF37]"><Icons.Star/></div>
                           <span>Akses ke lounge eksklusif member.</span>
                       </div>
                       <div className="flex items-center gap-3 text-gray-300">
                           <div className="bg-[#D4AF37]/20 p-2 rounded-full text-[#D4AF37]"><Icons.CreditCard/></div>
                           <span>Diskon tiket & makanan setiap hari.</span>
                       </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#0F0F0F]">
             <div className="max-w-sm mx-auto w-full">
                 <div className="text-center mb-8">
                     <h2 className="text-3xl font-bold text-white mb-2">{isSignUp ? "Buat Akun Baru" : "Selamat Datang"}</h2>
                     <p className="text-gray-500 text-sm">
                         {isSignUp ? "Daftar untuk menikmati pengalaman menonton terbaik." : "Silakan masuk dengan akun Anda untuk melanjutkan."}
                     </p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Nama Lengkap</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#D4AF37] transition"><Icons.User/></span>
                            <input 
                                type="text" 
                                required
                                placeholder="Cth: Admin" 
                                className="w-full bg-[#1A1A1A] border border-[#333] pl-12 pr-4 py-3.5 rounded-xl text-white focus:border-[#D4AF37] focus:bg-[#222] outline-none transition-all placeholder:text-gray-600"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    {(isSignUp || !isSignUp) && (
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Email (Opsional)</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#D4AF37] transition"><Icons.Mail/></span>
                                <input 
                                    type="email" 
                                    placeholder="nama@email.com" 
                                    className="w-full bg-[#1A1A1A] border border-[#333] pl-12 pr-4 py-3.5 rounded-xl text-white focus:border-[#D4AF37] focus:bg-[#222] outline-none transition-all placeholder:text-gray-600"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                         </div>
                    )}
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Password (Opsional)</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#D4AF37] transition"><Icons.Lock/></span>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full bg-[#1A1A1A] border border-[#333] pl-12 pr-4 py-3.5 rounded-xl text-white focus:border-[#D4AF37] focus:bg-[#222] outline-none transition-all placeholder:text-gray-600"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4"
                    >
                        {isSignUp ? "Daftar Sekarang" : "Masuk ke Akun"}
                    </button>
                 </form>

                 <div className="mt-8 text-center">
                     <p className="text-gray-500 text-sm">
                         {isSignUp ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
                         <button 
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-[#D4AF37] font-bold hover:underline ml-1"
                         >
                             {isSignUp ? "Login di sini" : "Daftar di sini"}
                         </button>
                     </p>
                 </div>
                 
                 <div className="mt-8 pt-8 border-t border-[#222] text-center">
                     <p className="text-xs text-gray-600">
                         Hint: Gunakan nama <span className="text-[#D4AF37] font-bold">admin</span> untuk masuk ke panel admin.
                     </p>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const Booking = ({ movie, onBack, selectedSchedule, setSelectedSchedule, selectedSeats, setSelectedSeats, proceedToPayment }) => {
    const handleSeatClick = (seatId) => {
        if (selectedSeats.includes(seatId)) {
          setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
          setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition"><Icons.ChevronLeft/> Kembali ke Film</button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#141414] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                        <div className="w-full h-2 bg-[#D4AF37] mb-12 shadow-[0_0_50px_rgba(212,175,55,0.6)] rounded-full opacity-50"></div>
                        <div className="grid grid-cols-8 gap-3 justify-center">
                            {movie.seats.map((seat) => (
                                <button
                                    key={seat.id}
                                    disabled={seat.booked}
                                    onClick={() => handleSeatClick(seat.id)}
                                    className={`
                                        h-10 rounded-lg text-xs font-bold transition-all duration-300
                                        ${seat.booked ? 'bg-red-900/20 text-red-700 cursor-not-allowed border border-red-900/30' : 
                                          selectedSeats.includes(seat.id) ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)] transform scale-110' : 
                                          'bg-[#222] text-gray-500 hover:bg-[#333] hover:text-white border border-[#333]'}
                                    `}
                                >
                                    {seat.id}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center gap-6 mt-12 text-sm text-gray-500">
                             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#222] rounded border border-[#333]"></div> Tersedia</div>
                             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#D4AF37] rounded"></div> Dipilih</div>
                             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-900/20 border border-red-900/30 rounded"></div> Terisi</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 text-white">Pilih Jadwal</h3>
                        <div className="flex flex-wrap gap-4">
                            {movie.schedules.map((sch) => (
                                <button
                                    key={sch.id}
                                    onClick={() => setSelectedSchedule(sch)}
                                    className={`px-6 py-3 rounded-xl border transition-all ${
                                        selectedSchedule?.id === sch.id 
                                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-lg' 
                                        : 'bg-transparent text-gray-400 border-[#333] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                                    }`}
                                >
                                    <div className="text-sm">{sch.time}</div>
                                    <div className="text-xs opacity-70">{sch.studio}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-[#141414] p-6 rounded-3xl border border-[#D4AF37]/20 h-fit sticky top-24">
                    <div className="flex gap-4 mb-6">
                        <img src={movie.image} alt="poster" className="w-20 h-28 object-cover rounded-lg shadow-md" />
                        <div>
                            <h3 className="font-bold text-white text-lg">{movie.title}</h3>
                            <p className="text-sm text-gray-500">{movie.genre}</p>
                            <p className="text-sm text-[#D4AF37] mt-1 font-mono">Rp{movie.price.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <div className="border-t border-dashed border-[#333] py-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Jadwal</span>
                            <span className="text-white">{selectedSchedule ? `${selectedSchedule.time}` : '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Kursi</span>
                            <span className="text-white text-right w-1/2">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Total</span>
                            <span className="text-[#D4AF37] font-bold text-lg">Rp{(selectedSeats.length * movie.price).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <button 
                        onClick={proceedToPayment}
                        disabled={!selectedSchedule || selectedSeats.length === 0}
                        className="w-full mt-4 py-3 bg-[#D4AF37] text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F2D675] transition shadow-lg"
                    >
                        Lanjut Pembayaran
                    </button>
                </div>
            </div>
        </div>
    );
}

const TicketView = ({ ticket, onPrint }) => (
    <div className="max-w-4xl mx-auto animate-fade-in text-center">
        <div className="bg-white text-black rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="bg-[#D4AF37] p-6 text-center border-b-2 border-dashed border-black/10">
                <h2 className="text-2xl font-black tracking-widest uppercase">CineX GOLD TICKET</h2>
                <p className="text-sm font-medium opacity-80">Terima kasih telah memesan, {ticket.user.name}</p>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 text-left space-y-4 border-r border-dashed border-gray-300 pr-8">
                    <h1 className="text-4xl font-bold mb-2">{ticket.movie.title}</h1>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                         <div>
                            <p className="text-gray-500 text-xs uppercase">Tanggal</p>
                            <p className="font-bold">{ticket.schedule.date}</p>
                         </div>
                         <div>
                            <p className="text-gray-500 text-xs uppercase">Jam</p>
                            <p className="font-bold">{ticket.schedule.time}</p>
                         </div>
                         <div>
                            <p className="text-gray-500 text-xs uppercase">Studio</p>
                            <p className="font-bold">{ticket.schedule.studio}</p>
                         </div>
                         <div>
                            <p className="text-gray-500 text-xs uppercase">Kursi</p>
                            <p className="font-bold text-xl">{ticket.seats.join(', ')}</p>
                         </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <QRCodeSVG value={ticket.code} />
                    <div className="font-mono text-xl tracking-widest font-bold text-gray-800">{ticket.code}</div>
                    <p className="text-xs text-center text-gray-500">Tunjukkan QR Code ini kepada petugas bioskop saat masuk.</p>
                </div>
            </div>
            <div className="bg-gray-100 p-4 text-center text-xs text-gray-500 border-t">
                Generated at {new Date(ticket.timestamp).toLocaleString()}
            </div>
            <div className="absolute top-[88px] -left-4 w-8 h-8 bg-[#0A0A0A] rounded-full"></div>
            <div className="absolute top-[88px] -right-4 w-8 h-8 bg-[#0A0A0A] rounded-full"></div>
        </div>
        <button onClick={onPrint} className="mt-8 px-8 py-3 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition">
             Download / Print Tiket
        </button>
    </div>
);

const TicketHistory = ({ tickets, onViewTicket }) => (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Riwayat Tiket</h2>
        {tickets.length === 0 ? (
            <div className="text-center text-gray-500 py-12">Belum ada tiket yang dibeli.</div>
        ) : (
            <div className="space-y-4">
                {tickets.map((t, idx) => (
                    <div key={idx} className="bg-[#141414] border border-[#333] p-4 rounded-xl flex items-center justify-between hover:border-[#D4AF37] transition cursor-pointer" onClick={() => onViewTicket(t)}>
                        <div className="flex gap-4">
                            <div className="w-16 h-20 bg-gray-800 rounded overflow-hidden">
                                <img src={t.movie.image} className="w-full h-full object-cover" alt="mini"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{t.movie.title}</h3>
                                <p className="text-sm text-gray-400">{t.schedule.date} • {t.schedule.time}</p>
                                <p className="text-xs text-[#D4AF37] mt-1">{t.seats.length} Kursi ({t.seats.join(', ')})</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs px-2 py-1 rounded mb-1 inline-block">PAID</div>
                             <p className="font-mono text-sm text-gray-500">{t.code}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

function PaymentProfessional({ movie, schedule, seats, onBack, onPay }) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [eWalletNumber, setEWalletNumber] = useState("");

  const [promoInput, setPromoInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoStatus, setPromoStatus] = useState({ type: "", msg: "" });

  const ticketPrice = movie.price * seats.length;
  const serviceFee = 3000 * seats.length;
  const totalBeforeDiscount = ticketPrice + serviceFee;
  const total = totalBeforeDiscount - discount;

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleApplyPromo = () => {
      const code = promoInput.toUpperCase().trim();
      if (!code) {
          setDiscount(0);
          setPromoStatus({ type: "", msg: "" });
          return;
      }

      if (code === "HEMAT") {
          const val = ticketPrice * 0.1;
          setDiscount(val);
          setPromoStatus({ type: 'success', msg: `Hemat 10% (Rp${val.toLocaleString('id-ID')})` });
      } else if (code === "CINEX25") {
          const val = 25000;
          setDiscount(val > totalBeforeDiscount ? totalBeforeDiscount : val);
          setPromoStatus({ type: 'success', msg: `Potongan Rp25.000` });
      } else {
          setDiscount(0);
          setPromoStatus({ type: 'error', msg: 'Kode promo tidak valid atau kadaluarsa.' });
      }
  };

  const handlePayProcess = () => {
    if (paymentMethod === 'card') {
      if (!cardName || cardNumber.length < 16 || !expiry || !cvv) {
        alert("Mohon lengkapi detail kartu kredit dengan benar.");
        return;
      }
    } else {
      if (!eWalletNumber || eWalletNumber.length < 9) {
        alert("Mohon masukkan nomor HP/Akun yang valid.");
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
        const details = {
            method: paymentMethod.toUpperCase(),
            total: total,
            cardName: paymentMethod === 'card' ? cardName : null,
            accountNumber: paymentMethod !== 'card' ? eWalletNumber : null,
            discount: discount
        };
        onPay(details);
    }, 2000);
  };

  const methods = [
    { id: 'card', label: 'Credit/Debit Card', icon: <Icons.CreditCard />, description: 'Visa, Mastercard, JCB' },
    { id: 'qris', label: 'QRIS', icon: <div className="font-bold text-xs">QR</div>, description: 'Scan with GoPay, OVO, Dana' },
    { id: 'dana', label: 'DANA', icon: <Icons.Smartphone />, description: 'Direct Debit' },
    { id: 'ovo', label: 'OVO', icon: <Icons.Smartphone />, description: 'Direct Debit' },
  ];

  if(isLoading) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
              <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
              <h2 className="text-xl font-bold text-white">Memproses Pembayaran...</h2>
              <p className="text-gray-500">Mohon jangan tutup halaman ini.</p>
          </div>
      )
  }

  return (
    <div className="max-w-6xl mx-auto pt-6 pb-20 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="flex items-center gap-2 text-[#888] hover:text-[#D4AF37] transition">
                <Icons.ChevronLeft /> Kembali
            </button>
            <div className="flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/20">
                <Icons.Clock />
                <span className="text-[#D4AF37] font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                <span className="text-xs text-[#888] ml-1">Selesaikan pembayaran</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Icons.Lock /> Metode Pembayaran
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {methods.map((method) => (
                            <div 
                                key={method.id}
                                className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                                    paymentMethod === method.id 
                                    ? 'bg-[#1A1A1A] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                                    : 'bg-[#0F0F0F] border-white/5 hover:bg-[#1A1A1A] cursor-pointer'
                                }`}
                                onClick={() => setPaymentMethod(method.id)}
                            >
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === method.id ? 'bg-[#D4AF37] text-black' : 'bg-[#222] text-[#666]'}`}>
                                            {method.icon}
                                        </div>
                                        <div>
                                            <div className={`font-semibold ${paymentMethod === method.id ? 'text-white' : 'text-[#888]'}`}>{method.label}</div>
                                            <div className="text-xs text-[#555]">{method.description}</div>
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === method.id ? 'border-[#D4AF37]' : 'border-[#444]'}`}>
                                        {paymentMethod === method.id && <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>}
                                    </div>
                                </div>

                                {paymentMethod === 'card' && method.id === 'card' && (
                                    <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#181818]">
                                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                                <div className="w-full md:w-80 h-48 rounded-xl bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-black border border-[#D4AF37]/30 relative p-6 shadow-2xl flex flex-col justify-between shrink-0">
                                                    <div className="flex justify-between items-start">
                                                        <div className="w-12 h-8 bg-[#D4AF37]/20 rounded border border-[#D4AF37]/40"></div>
                                                        <div className="text-[#D4AF37] font-bold italic tracking-widest">VISA</div>
                                                    </div>
                                                    <div className="font-mono text-xl tracking-widest text-white shadow-black drop-shadow-md">
                                                        {cardNumber || "•••• •••• •••• ••••"}
                                                    </div>
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <div className="text-[10px] text-[#888] uppercase tracking-wider">Card Holder</div>
                                                            <div className="text-sm font-medium text-white tracking-wide uppercase truncate max-w-[150px]">
                                                                {cardName || "YOUR NAME"}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-[#888] uppercase tracking-wider">Expires</div>
                                                            <div className="text-sm font-medium text-white tracking-wide">{expiry || "MM/YY"}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="w-full space-y-4">
                                                    <div>
                                                        <label className="text-xs text-[#888] block mb-1">Nomor Kartu</label>
                                                        <input 
                                                            type="text" 
                                                            maxLength="19"
                                                            value={cardNumber} 
                                                            onChange={(e) => {
                                                                const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                                                setCardNumber(v);
                                                            }}
                                                            placeholder="0000 0000 0000 0000"
                                                            className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none font-mono"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-[#888] block mb-1">Nama Pemilik</label>
                                                        <input 
                                                            type="text" 
                                                            value={cardName} 
                                                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                                            placeholder="NAMA LENGKAP"
                                                            className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <div className="w-1/2">
                                                            <label className="text-xs text-[#888] block mb-1">Masa Berlaku</label>
                                                            <input 
                                                                type="text" 
                                                                maxLength="5"
                                                                value={expiry} 
                                                                onChange={(e) => {
                                                                    let v = e.target.value.replace(/\D/g, '');
                                                                    if(v.length >= 2) v = v.substring(0,2) + '/' + v.substring(2,4);
                                                                    setExpiry(v);
                                                                }}
                                                                placeholder="MM/YY"
                                                                className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none text-center"
                                                            />
                                                        </div>
                                                        <div className="w-1/2">
                                                            <label className="text-xs text-[#888] block mb-1">CVV</label>
                                                            <input 
                                                                type="password" 
                                                                maxLength="3"
                                                                value={cvv}
                                                                onChange={(e) => setCvv(e.target.value.replace(/\D/g,''))}
                                                                placeholder="123"
                                                                className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none text-center"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                )}

                                {paymentMethod === method.id && ['dana', 'ovo', 'gopay'].includes(method.id) && (
                                     <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#181818]">
                                         <label className="text-xs text-[#888] block mb-1">Nomor HP Terdaftar</label>
                                         <div className="flex gap-2">
                                             <span className="bg-[#222] border border-[#333] rounded p-3 text-[#888]">+62</span>
                                             <input 
                                                 type="tel"
                                                 value={eWalletNumber}
                                                 onChange={(e) => setEWalletNumber(e.target.value.replace(/\D/g,''))}
                                                 placeholder="812 3456 7890"
                                                 className="flex-1 bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none"
                                             />
                                         </div>
                                         <p className="text-xs text-[#666] mt-2 flex items-center gap-1">
                                             <Icons.ShieldCheck /> Pembayaran aman & terenkripsi.
                                         </p>
                                      </div>
                                )}
                                
                                {paymentMethod === 'qris' && method.id === 'qris' && (
                                    <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#181818] flex flex-col items-center text-center">
                                            <div className="bg-white p-4 rounded-xl mt-4">
                                                <QRCodeSVG value="PAYMENT-QRIS" />
                                            </div>
                                            <p className="text-sm text-[#888] mt-4">Scan QR di atas menggunakan aplikasi pembayaran favorit Anda.</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-24 bg-[#141414] border border-[#D4AF37]/20 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="relative h-48">
                        <img src={movie.image} alt="poster" className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-2xl font-bold text-white leading-tight shadow-black drop-shadow-md">{movie.title}</h3>
                            <div className="text-sm text-[#D4AF37] font-medium mt-1">{movie.genre}</div>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex items-start gap-3 pb-4 border-b border-white/5">
                            <Icons.Calendar />
                            <div>
                                <div className="text-sm text-[#888]">Jadwal Tayang</div>
                                <div className="text-white font-medium">{schedule.date}, {schedule.time}</div>
                                <div className="text-xs text-[#666]">{schedule.studio}</div>
                            </div>
                        </div>
                         <div className="flex items-start gap-3 pb-4 border-b border-white/5">
                            <Icons.MapPin />
                            <div>
                                <div className="text-sm text-[#888]">Kursi Dipilih ({seats.length})</div>
                                <div className="text-[#D4AF37] font-bold tracking-wide">{seats.join(', ')}</div>
                            </div>
                        </div>

                        <div className="pb-4 border-b border-white/5">
                            <label className="text-xs text-[#888] block mb-2">Kode Promo / Voucher</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="HEMAT / CINEX25" 
                                    className="w-full bg-[#0a0a0a] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none uppercase"
                                    value={promoInput}
                                    onChange={(e) => setPromoInput(e.target.value)}
                                />
                                <button 
                                    onClick={handleApplyPromo}
                                    className="bg-[#333] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition"
                                >
                                    APPLY
                                </button>
                            </div>
                            {promoStatus.msg && (
                                <p className={`text-xs mt-2 ${promoStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                    {promoStatus.msg}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#888]">Tiket ({seats.length}x)</span>
                                <span className="text-white">Rp{ticketPrice.toLocaleString('id-ID')}</span>
                            </div>
                             <div className="flex justify-between text-sm">
                                <span className="text-[#888]">Biaya Layanan</span>
                                <span className="text-white">Rp{serviceFee.toLocaleString('id-ID')}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-sm text-green-500">
                                    <span>Diskon</span>
                                    <span>-Rp{discount.toLocaleString('id-ID')}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center pt-4 border-t border-[#333] mt-2">
                                <span className="text-lg font-bold text-white">Total</span>
                                <div className="text-right">
                                    {discount > 0 && <span className="block text-xs text-[#888] line-through">Rp{totalBeforeDiscount.toLocaleString('id-ID')}</span>}
                                    <span className="text-xl font-bold text-[#D4AF37]">Rp{total.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        <button onClick={handlePayProcess} className="w-full py-4 mt-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#F2D675] shadow-lg transition">
                            Bayar Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

const AdminDashboard = ({ movies, setMovies, tickets, onLogout }) => {
  const [tab, setTab] = useState("overview");
  
  const [newMovie, setNewMovie] = useState({
     title: "", genre: "", duration: "", price: 45000, 
     image: "", synopsis: "", rating: "13+"
  });

  const totalRevenue = tickets.reduce((acc, t) => {
      const ticketTotal = (t.movie.price * t.seats.length) + (3000 * t.seats.length);
      return acc + ticketTotal;
  }, 0);

  const handleAddMovie = (e) => {
    e.preventDefault();
    const movieObj = {
        ...newMovie,
        id: "f" + Date.now(),
        schedules: [
            { id: "s" + Date.now() + "1", date: "2025-12-05", time: "12:00", studio: "Studio 1" },
            { id: "s" + Date.now() + "2", date: "2025-12-05", time: "15:00", studio: "Studio 2" }
        ],
        seats: generateSeats()
    };
    const updatedMovies = [...movies, movieObj];
    setMovies(updatedMovies);
    localStorage.setItem("cinex_movies", JSON.stringify(updatedMovies));
    setNewMovie({ title: "", genre: "", duration: "", price: 45000, image: "", synopsis: "", rating: "13+" });
    alert("Film berhasil ditambahkan!");
  };

  const handleDeleteMovie = (id) => {
    if(window.confirm("Hapus film ini?")) {
        const updatedMovies = movies.filter(m => m.id !== id);
        setMovies(updatedMovies);
        localStorage.setItem("cinex_movies", JSON.stringify(updatedMovies));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100">
        <div className="bg-[#111] border-b border-[#333] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
             <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xl">
                 <Icons.Lock /> ADMIN PANEL
             </div>
             <button onClick={onLogout} className="text-sm text-gray-400 hover:text-white">Keluar</button>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex gap-4 mb-8">
                <button onClick={() => setTab("overview")} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${tab === 'overview' ? 'bg-[#D4AF37] text-black' : 'bg-[#222] text-gray-400'}`}>Dashboard</button>
                <button onClick={() => setTab("movies")} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${tab === 'movies' ? 'bg-[#D4AF37] text-black' : 'bg-[#222] text-gray-400'}`}>Manajemen Film</button>
                <button onClick={() => setTab("transactions")} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${tab === 'transactions' ? 'bg-[#D4AF37] text-black' : 'bg-[#222] text-gray-400'}`}>Transaksi ({tickets.length})</button>
            </div>

            {tab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                    <div className="bg-[#141414] p-6 rounded-2xl border border-[#333]">
                        <div className="flex items-center gap-3 text-gray-400 mb-2">
                            <Icons.TrendingUp /> Total Pendapatan
                        </div>
                        <div className="text-3xl font-bold text-[#D4AF37]">Rp{totalRevenue.toLocaleString('id-ID')}</div>
                        <div className="text-xs text-gray-500 mt-2">Termasuk biaya layanan</div>
                    </div>
                    <div className="bg-[#141414] p-6 rounded-2xl border border-[#333]">
                        <div className="flex items-center gap-3 text-gray-400 mb-2">
                            <Icons.Film /> Tiket Terjual
                        </div>
                        <div className="text-3xl font-bold text-white">{tickets.length}</div>
                        <div className="text-xs text-gray-500 mt-2">Transaksi sukses</div>
                    </div>
                     <div className="bg-[#141414] p-6 rounded-2xl border border-[#333]">
                        <div className="flex items-center gap-3 text-gray-400 mb-2">
                            <Icons.Film /> Film Aktif
                        </div>
                        <div className="text-3xl font-bold text-white">{movies.length}</div>
                        <div className="text-xs text-gray-500 mt-2">Tayang sekarang</div>
                    </div>
                </div>
            )}

            {tab === "movies" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                    <div className="bg-[#141414] p-6 rounded-2xl border border-[#333] h-fit">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-[#333] pb-2">Tambah Film Baru</h3>
                        <form onSubmit={handleAddMovie} className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500">Judul Film</label>
                                <input required className="w-full bg-[#0a0a0a] border border-[#333] p-2 rounded text-white text-sm focus:border-[#D4AF37] outline-none" 
                                    value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-gray-500">Genre</label>
                                    <input required className="w-full bg-[#0a0a0a] border border-[#333] p-2 rounded text-white text-sm" 
                                        value={newMovie.genre} onChange={e => setNewMovie({...newMovie, genre: e.target.value})} />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Durasi</label>
                                    <input required placeholder="2j 30m" className="w-full bg-[#0a0a0a] border border-[#333] p-2 rounded text-white text-sm" 
                                        value={newMovie.duration} onChange={e => setNewMovie({...newMovie, duration: e.target.value})} />
                                </div>
                            </div>
                             <div>
                                <label className="text-xs text-gray-500">URL Gambar Poster</label>
                                <input required type="url" placeholder="https://..." className="w-full bg-[#0a0a0a] border border-[#333] p-2 rounded text-white text-sm" 
                                    value={newMovie.image} onChange={e => setNewMovie({...newMovie, image: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Harga (Rp)</label>
                                <input required type="number" className="w-full bg-[#0a0a0a] border border-[#333] p-2 rounded text-white text-sm" 
                                    value={newMovie.price} onChange={e => setNewMovie({...newMovie, price: parseInt(e.target.value)})} />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Sinopsis</label>
                                <textarea required rows="3" className="w-full bg-[#0a0a0a] border border-[#333] p-2 rounded text-white text-sm" 
                                    value={newMovie.synopsis} onChange={e => setNewMovie({...newMovie, synopsis: e.target.value})} />
                            </div>
                            <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded hover:bg-[#F2D675] flex items-center justify-center gap-2">
                                <Icons.Plus /> Tambah Film
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                         <h3 className="text-lg font-bold text-white mb-4">Daftar Film ({movies.length})</h3>
                         {movies.map(m => (
                             <div key={m.id} className="bg-[#141414] border border-[#333] p-4 rounded-xl flex gap-4 items-start">
                                 <img src={m.image} alt={m.title} className="w-16 h-24 object-cover rounded bg-gray-800" />
                                 <div className="flex-1">
                                     <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-white">{m.title}</h4>
                                        <button onClick={() => handleDeleteMovie(m.id)} className="text-red-500 hover:text-red-400 p-1"><Icons.Trash /></button>
                                     </div>
                                     <p className="text-xs text-gray-500 mb-1">{m.genre} • {m.duration}</p>
                                     <p className="text-sm text-[#D4AF37]">Rp{m.price.toLocaleString('id-ID')}</p>
                                     <div className="mt-2 text-xs text-gray-600 truncate w-3/4">{m.synopsis}</div>
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>
            )}

            {tab === "transactions" && (
                <div className="bg-[#141414] border border-[#333] rounded-2xl overflow-hidden animate-fade-in">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#0a0a0a] text-xs uppercase font-bold text-[#D4AF37]">
                            <tr>
                                <th className="p-4">Kode Tiket</th>
                                <th className="p-4">User</th>
                                <th className="p-4">Film</th>
                                <th className="p-4">Kursi</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Waktu</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                            {tickets.map((t, i) => (
                                <tr key={i} className="hover:bg-white/5">
                                    <td className="p-4 font-mono text-white">{t.code}</td>
                                    <td className="p-4">{t.user.name}</td>
                                    <td className="p-4">{t.movie.title}</td>
                                    <td className="p-4">{t.seats.join(', ')}</td>
                                    <td className="p-4 text-white">Rp{((t.movie.price * t.seats.length) + (3000 * t.seats.length)).toLocaleString('id-ID')}</td>
                                    <td className="p-4 text-xs">{new Date(t.timestamp).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {tickets.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-600">Belum ada data transaksi.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
  );
};

// -------------------- Main App --------------------

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")) || null; } catch { return null; }
  });

  const [page, setPage] = useState("home");
  
  const [movies, setMovies] = useState(() => {
     try {
         const saved = localStorage.getItem("cinex_movies");
         if (!saved) return sampleMovies();
         const parsed = JSON.parse(saved);
         if (Array.isArray(parsed) && parsed.length > 0) return parsed;
         return sampleMovies();
     } catch {
         return sampleMovies();
     }
  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [ticket, setTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => { 
      if (!user) setPage("home"); 
      else if (user.name && user.name.toLowerCase() === 'admin') setPage("admin_dashboard");
  }, [user]);

  const login = (name) => {
    const u = { name };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
    if(name.toLowerCase() === 'admin') {
        setPage("admin_dashboard");
    } else {
        setPage("home");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("home");
    setSelectedMovie(null);
    setSelectedSchedule(null);
    setSelectedSeats([]);
    setTicket(null);
  };

  const startBooking = (movie) => {
    setSelectedMovie(movie);
    setSelectedSchedule(null);
    setSelectedSeats([]);
    setTicket(null);
    setPage("book");
  };

  const proceedToPayment = () => {
    if (!user) { setPage("login"); return; }
    if (!selectedSchedule || selectedSeats.length === 0) { alert("Pilih jadwal dan kursi terlebih dahulu."); return; }
    setPage("payment");
  };

  const completePayment = (paymentDetails) => {
    const newTicket = generateTicket({ movie: selectedMovie, schedule: selectedSchedule, seats: selectedSeats, user });
    newTicket.payment = paymentDetails;
    setTickets((prevTickets) => [...prevTickets, newTicket]);
    setTicket(newTicket);
    setPage("ticket");
  };

  // If Admin Logged In
  if (user && user.name.toLowerCase() === 'admin' && page === 'admin_dashboard') {
      return <AdminDashboard movies={movies} setMovies={setMovies} tickets={tickets} onLogout={logout} />;
  }

  // Regular User Layout
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F8F8F8] font-sans selection:bg-[#D4AF37] selection:text-black">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${page === 'home' ? 'bg-gradient-to-b from-black/90 to-transparent backdrop-blur-[2px]' : 'bg-[#111]/90 backdrop-blur-md border-b border-[#D4AF37]/20'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#D4AF37] font-bold text-xl tracking-wider flex items-center gap-2 cursor-pointer group" onClick={() => setPage("home")}>
              <span className="text-2xl group-hover:rotate-12 transition-transform">⚡</span> CineX GOLD
            </div>
            <nav className="hidden md:flex gap-1 text-sm text-gray-300 ml-6">
              <button onClick={() => setPage("home")} className={`px-4 py-2 rounded-full transition ${page === 'home' ? 'text-white font-bold bg-white/10' : 'hover:text-[#D4AF37]'}`}>Beranda</button>
              <button onClick={() => setPage("now_playing")} className={`px-4 py-2 rounded-full transition ${page === 'now_playing' ? 'text-black bg-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>Sedang Tayang</button>
              {user && <button onClick={() => setPage("history")} className={`px-4 py-2 rounded-full transition ${page === 'history' ? 'text-black bg-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'}`}>Tiket Saya</button>}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-sm text-gray-300 hidden md:block">Hai, <span className="font-semibold text-[#D4AF37]">{user.name}</span></div>
                <button onClick={logout} className="px-5 py-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition">Logout</button>
              </>
            ) : (
              <button onClick={() => setPage("login")} className="px-6 py-2 bg-[#D4AF37] text-black rounded-full font-bold hover:bg-[#F2D675] shadow-[0_0_15px_rgba(212,175,55,0.4)] transition">Login</button>
            )}
          </div>
        </div>
      </header>

      <main className={`${page === 'home' ? '' : 'pt-24'} pb-12`}>
        {page === "home" && <Home movies={movies} onBook={startBooking} onSeeSchedule={() => setPage("now_playing")} user={user} onLogin={() => setPage("login")} />}
        
        {page !== "home" && (
            <div className="max-w-7xl mx-auto px-4">
                {page === "now_playing" && <NowPlaying movies={movies} onBook={startBooking} />}
                {page === "history" && <TicketHistory tickets={tickets.filter(t => t.user.name === user?.name)} onViewTicket={(t) => { setTicket(t); setPage("ticket"); }} />}
                {page === "login" && <Login onLogin={(name) => login(name)} />}
                {page === "book" && selectedMovie && <Booking movie={selectedMovie} onBack={() => setPage("now_playing")} selectedSchedule={selectedSchedule} setSelectedSchedule={setSelectedSchedule} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} proceedToPayment={proceedToPayment} />}
                
                {page === "payment" && selectedMovie && (
                  <PaymentProfessional
                    movie={selectedMovie}
                    schedule={selectedSchedule}
                    seats={selectedSeats}
                    onBack={() => setPage("book")}
                    onPay={(details) => completePayment(details)}
                  />
                )}
                
                {page === "ticket" && ticket && <TicketView ticket={ticket} onPrint={() => window.print()} />}
            </div>
        )}
      </main>

      <footer className="py-16 bg-[#050505] border-t border-[#222]">
        <div className="max-w-6xl mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-center mb-8">
               <div className="text-[#D4AF37] font-bold text-3xl tracking-wider mb-4 md:mb-0">CineX GOLD</div>
               <div className="flex gap-6 text-gray-500">
                   <a href="#" className="hover:text-[#D4AF37] transition">Instagram</a>
                   <a href="#" className="hover:text-[#D4AF37] transition">Twitter</a>
                   <a href="#" className="hover:text-[#D4AF37] transition">Facebook</a>
               </div>
           </div>
           <div className="border-t border-[#222] pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
              <p>© {new Date().getFullYear()} CineX GOLD — Tasikmalaya. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                  <span className="cursor-pointer hover:text-gray-400">Privacy Policy</span>
                  <span className="cursor-pointer hover:text-gray-400">Terms of Service</span>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}