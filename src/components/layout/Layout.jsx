import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const isMainPage = location.pathname === "/main";
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOrange = isMainPage && isTop;

  return (
    <div className="flex flex-col items-center min-h-screen w-full font-medium">
      <header
        className={`w-full fixed top-0 z-10 h-16 transition-colors duration-300 ${
          isOrange ? "bg-orange" : "bg-white"
        }`}
      >
        <Header isOrange={isOrange} />
      </header>
      <main className="flex flex-col flex-grow max-w-[1280px] w-full mt-4 min-h-screen py-12">
        <Outlet />
      </main>
      <footer className="h-16 w-full">
        <Footer />
      </footer>
    </div>
  );
}
