import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex-col min-h-screen w-full">
      <header className="fixed top-0 w-full z-10 bg-gray-200 h-16">
        <Header />
      </header>
      <main className="flex-col flex-grow w-full min-h-screen mt-16">
        <Outlet />
      </main>
      <footer className="bg-gray-200 h-16">
        <Footer />
      </footer>
    </div>
  );
}
