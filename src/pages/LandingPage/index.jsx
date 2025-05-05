import { useEffect } from "react";
import { IndicatorProvider } from "../../context/IndicatorContext";
import EventSummaryCards from "./components/EventSummaryCards";
import EconomicCalendar from "./components/EconomicCalendar";
import IndicatorSummary from "./components/IndicatorSummary";
import TopMovers from "./components/TopMovers";
import NewsList from "./components/NewsList";

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <IndicatorProvider>
      <div className="flex px-2 py-2 gap-4">
        <div className="flex-1 flex flex-col gap-6">
          <EventSummaryCards />
          <EconomicCalendar />
          <IndicatorSummary />
        </div>

        <aside className="w-80 flex flex-col gap-6">
          <TopMovers />
          <NewsList />
        </aside>
      </div>
    </IndicatorProvider>
  );
}
