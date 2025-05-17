import { useEffect } from "react";
import { IndicatorProvider } from "../../context/IndicatorContext";
import EventSummaryCards from "./components/EventSummaryCards";
import EconomicCalendar from "./components/EconomicCalendar";
import IndicatorSummary from "./components/IndicatorSummary";
import TopMovers from "./components/TopMovers";
import ScrollBackBtn from "../../components/ScrollBackBtn";
import HeroSection from "./components/HeroSection";
export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <IndicatorProvider>
        <div className="relative flex gap-4">
          <div className="flex-1 flex flex-col gap-6 md:pr-0 xl:pr-[38%]">
            <EventSummaryCards />
            <EconomicCalendar />
            <IndicatorSummary />
          </div>

          <TopMovers />
          <ScrollBackBtn />
        </div>
      </IndicatorProvider>
    </>
  );
}
