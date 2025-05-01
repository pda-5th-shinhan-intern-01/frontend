const economicIndicatorMap = {
  CPI: {
    name: "소비자물가지수",
    description:
      "소비자 물가의 평균적인 변동을 측정하여 인플레이션 수준을 파악합니다.",
  },
  PPI: {
    name: "생산자물가지수",
    description:
      "생산자가 판매하는 상품의 평균 가격 변동을 측정해 원가 상승 압력을 확인합니다.",
  },
  "Core PCE": {
    name: "근원 개인소비지출물가지수",
    description:
      "식료품과 에너지를 제외한 소비자 지출 가격의 변화로, 연준이 선호하는 물가 지표입니다.",
  },
  NFP: {
    name: "비농업부문 고용자수",
    description:
      "농업 분야를 제외한 신규 고용자 수로 미국 고용시장의 전반적 건강 상태를 나타냅니다.",
  },
  "Unemployment Rate": {
    name: "실업률",
    description:
      "경제활동인구 중 실업 상태인 비율로, 경기 상황을 반영하는 주요 지표입니다.",
  },
  "Retail Sales": {
    name: "소매판매",
    description:
      "소비자 지출 수준을 측정해 경기 소비 흐름을 판단하는 데 사용됩니다.",
  },
  ISM: {
    name: "ISM 제조업 지수",
    description:
      "미국 제조업 경기 확장/수축을 판단하는 선행 지표로, 50 이상은 확장 국면입니다.",
  },
  "Real GDP YoY": {
    name: "실질 GDP 성장률",
    description:
      "인플레이션을 제외한 연간 국내총생산 증가율로, 경제 성장률을 나타냅니다.",
  },
};
export { economicIndicatorMap };
