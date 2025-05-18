const economicIndicatorMap = {
  CORE_CPI: {
    name: "근원 소비자물가지수",
    description:
      "식료품과 에너지를 제외한 소비자 물가의 변동을 측정하여 인플레이션의 기초 흐름을 파악합니다.",
  },
  CORE_PPI: {
    name: "근원 생산자물가지수",
    description:
      "식료품과 에너지를 제외한 생산자 가격의 변동을 측정해 원가 상승 압력을 확인합니다.",
  },
  CORE_PCE: {
    name: "근원 개인소비지출물가지수",
    description:
      "식료품과 에너지를 제외한 소비자 지출 가격의 변화로, 연준이 선호하는 물가 지표입니다.",
  },
  NFP: {
    name: "비농업부문 고용자수",
    description:
      "농업 분야를 제외한 신규 고용자 수로 미국 고용시장의 전반적 건강 상태를 나타냅니다.",
  },
  UNEMPLOYMENT: {
    name: "실업률",
    description:
      "경제활동인구 중 실업 상태인 비율로, 경기 상황을 반영하는 주요 지표입니다.",
  },
  RETAIL_SALES: {
    name: "소매판매",
    description:
      "소비자 지출 수준을 측정해 경기 소비 흐름을 판단하는 데 사용됩니다.",
  },
  INDUSTRIAL_PRODUCTION: {
    name: "산업생산",
    description:
      "공장, 광산, 유틸리티의 생산량 변화를 통해 경기 변동을 진단하는 대표적인 경기 후행 지표입니다.",
  },
  GDP: {
    name: "국내총생산 분기 성장률",
    description:
      "국가 경제 활동의 전반적인 규모를 측정하는 지표로, 분기별 경제 성장률을 나타냅니다.",
  },
};

export { economicIndicatorMap };
