import { useEffect } from "react";
import { IndicatorProvider } from "../../context/IndicatorContext";
import EventSummaryCards from "./components/EventSummaryCards";
import EconomicCalendar from "./components/EconomicCalendar";
import IndicatorSummary from "./components/IndicatorSummary";
import TopMovers from "./components/TopMovers";
import ScrollBackBtn from "../../components/ScrollBackBtn";

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <IndicatorProvider>
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-6">
          <EventSummaryCards />
          <EconomicCalendar />
          <IndicatorSummary />
        </div>
        <aside className="hidden xl:flex w-80 flex-col gap-6">
          <TopMovers />
        </aside>
        <ScrollBackBtn />
      </div>
    </IndicatorProvider>
  );
}
