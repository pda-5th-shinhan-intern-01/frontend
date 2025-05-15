import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full font-medium">
      <header className="max-w-[1280px] mx-auto fixed top-0 w-full z-10 h-16">
        <Header />
      </header>
      <main className="flex flex-col flex-grow max-w-[1280px] w-full min-h-screen mt-16 py-12">
        <Outlet />
      </main>
      <footer className="h-16 w-full">
        <Footer />
      </footer>
    </div>
  );
}
