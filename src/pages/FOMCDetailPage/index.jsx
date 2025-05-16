import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Section from "./components/Section";
import SectionItem from "./components/SectionItem";
import dummy from "./dummies/dummy.json";
import { IoChevronBack } from "react-icons/io5";

const labels = {
  laborMarket: "노동 시장",
  consumptionInvestmentExport: "소비 · 투자 · 수출",
  inflation: "물가 및 기대 인플레이션",
  financialMarket: "금융 시장",
  summary: "요약",
  qtComment: "QT 관련 언급",
  dissent: "반대 의견",
  marketReaction: "시장 반응",
};

export default function FOMCDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="flex flex-col">
      {/* 기본 정보 */}

      <span
        onClick={() => navigate("/main/fomcs")}
        className="cursor-pointer flex flex-row items-center"
      >
        ← 목록으로
      </span>
      <div className="items-center  text-4xl font-bold mb-4 text-black">
        {dummy.title}
      </div>

      <div className="flex flex-row justify-between">
        <div className="bg-orange text-white text-xl px-3 py-1 rounded-2xl">
          금리 {dummy.rateChange} ({dummy.rateRange.from.toFixed(2)}% -&gt;{" "}
          {dummy.rateRange.to.toFixed(2)}%)
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-gray-light px-2 rounded-2xl cursor-pointer">
            영상 보기
          </div>
          <div className="bg-gray-light px-2 rounded-2xl cursor-pointer">
            원본 회의록으로 가기
          </div>
        </div>
      </div>
      <div className="pl-3 mt-2 text-gray-md text-sm">
        {dummy.announcement.datetime}
      </div>
      <hr className="my-6" />

      {/* 회의록 요약  */}
      <Section title="경제 여건 진단">
        {Object.entries(dummy.economicAssessment).map(([key, value]) => (
          <SectionItem key={key} title={labels[key] || key} data={value} />
        ))}
      </Section>

      <Section title="통화정책 결정">
        <SectionItem
          title="정책 금리"
          data={dummy.policyDecision.policyRateSummary}
        />
        <SectionItem
          title={dummy.policyDecision.qtPolicyTitle}
          data={dummy.policyDecision.qtPolicyDetails}
        />
      </Section>

      <Section title="투표 결과">
        <SectionItem title="찬성" data={dummy.votes.agreed} />
        <SectionItem title="반대" data={dummy.votes.disagreed} />
        <div className="">반대 이유 : {dummy.votes.note} </div>
      </Section>

      <Section title="추가 언급 및 시장 반응">
        {Object.entries(dummy.remarks).map(([key, value]) => (
          <SectionItem key={key} title={labels[key] || key} data={value} />
        ))}
      </Section>

      <div className="flex justify-between items-center mt-10">
        {dummy.prev ? (
          <button
            onClick={() => navigate(`/main/fomcs/${parseInt(params.id) - 1}`)}
            className="text-sm text-gray-md hover:underline"
          >
            ← 이전 회의록: {dummy.prev.title}
          </button>
        ) : (
          <div />
        )}

        {dummy.next ? (
          <button
            onClick={() => navigate(`/main/fomcs/${parseInt(params.id) + 1}`)}
            className="text-sm text-gray-md hover:underline"
          >
            다음 회의록: {dummy.next.title} →
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
