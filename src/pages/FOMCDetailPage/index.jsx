import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PolicyDecision from "./components/PolicyDecision";
import Votes from "./components/Votes";
import CommonSection from "./components/CommonSection";
import miniLogo from "../../assets/miniLogo.png";
import { fomcApi } from "../../api/fomcApi";

const economicLabel = {
  labor_market: "노동 시장",
  consumption_investment_trade: "소비 · 투자 · 무역",
  inflation_trend: "인플레이션 추세",
  other_macro: "기타 거시 지표",
};

const futureLabel = {
  rationale: "정책 근거",
  factors_to_watch: "주요 관찰 요소",
  change_conditions: "변화 조건",
};

export default function FOMCDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [fomc, setFomc] = useState();
  const [parsedFomc, setParsedFomc] = useState();
  const location = useLocation();
  const fomcStart = location.state ? location.state.start : 0;
  const fomcEnd = location.state ? location.state.end : 0;

  // fomc 디테일
  useEffect(() => {
    fomcApi.getFomcList(params.id).then((res) => {
      console.log(res.data);
      setFomc(res.data[0]);
      setParsedFomc(JSON.parse(res.data[0].summary));
    });
  }, [params.id]);
  // 로딩 중 처리
  if (!fomc || !parsedFomc) return <div className="mt-20">로딩 중...</div>;

  return (
    <div className="flex flex-col mt-20">
      {/* 기본 정보 */}
      <span
        onClick={() => navigate("/main/fomcs")}
        className="cursor-pointer flex flex-row items-center mb-3 hover:underline"
      >
        ← 목록으로
      </span>
      <div className="items-center  text-4xl font-bold mb-4 text-black">
        {parsedFomc.announcement.datetime.split(" ")[0]}&nbsp;
        {parsedFomc.announcement.datetime.split(" ")[1]} FOMC 회의 요약
      </div>
      <div className="flex flex-row justify-between">
        <div
          className={`${
            parsedFomc.policy_decision.rate_policy.direction == "raise"
              ? "bg-orange"
              : parsedFomc.policy_decision.rate_policy.direction == "lower"
              ? "bg-blue-md"
              : "bg-gray-md"
          } text-white text-xl px-5 py-1 rounded-2xl shadow-sm`}
        >
          금리 {parsedFomc.policy_decision.rate_policy.change} ({" "}
          {parsedFomc.policy_decision.rate_policy.range} )
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div
            className="bg-ivory px-2 rounded-2xl cursor-pointer shadow-sm hover:bg-gray-light"
            onClick={() => window.open(fomc.videoUrl)}
          >
            영상 보기
          </div>
          <div
            className="bg-ivory px-2 rounded-2xl cursor-pointer shadow-sm hover:bg-gray-light"
            onClick={() => window.open(fomc.sourceUrl)}
          >
            원본 회의록으로 가기
          </div>
        </div>
      </div>
      <div className="pl-5 mt-2 text-gray-md text-sm">
        {parsedFomc.announcement.datetime}
      </div>
      <hr className="my-6" />
      <div className="bg-ivory p-7 shadow-sm rounded-2xl">
        {" "}
        <div className="text-black-md flex flex-row">
          <img src={miniLogo} className="w-5 h-5 mr-1" /> Hot Signal 한눈에 보기{" "}
        </div>
        <div>
          <div className="font-bold  text-lg ">| {parsedFomc.title} </div>
          <div className="text-orange font-semibold">
            {parsedFomc.additional_insight}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 my-5">
        <CommonSection
          title={"경제 상황"}
          data={parsedFomc.economic_conditions}
          label={economicLabel}
        />
        <PolicyDecision data={parsedFomc.policy_decision} />
        <CommonSection
          title={"향후 계획"}
          data={parsedFomc.future_guidance}
          label={futureLabel}
        />
        <Votes data={parsedFomc.votes} />
      </div>
      <div className="flex justify-between items-center mt-10">
        {Number(params.id) - 1 >= fomcStart ? (
          <button
            onClick={() =>
              navigate(`/main/fomcs/${Number(params.id) - 1}`, {
                state: {
                  start: fomcStart,
                  end: fomcEnd,
                },
              })
            }
            className="text-sm text-gray-md hover:underline"
          >
            ← 이전 회의록
          </button>
        ) : (
          <div></div>
        )}

        {Number(params.id) + 1 <= fomcEnd ? (
          <button
            onClick={() =>
              navigate(`/main/fomcs/${Number(params.id) + 1}`, {
                state: {
                  start: fomcStart,
                  end: fomcEnd,
                },
              })
            }
            className="text-sm text-gray-md hover:underline"
          >
            다음 회의록 →
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
