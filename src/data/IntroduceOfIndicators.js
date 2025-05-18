const economicIndicatorMap = {
  CORE_CPI: {
    name: "근원 소비자물가지수",
    description:
      "식료품과 에너지를 제외한 소비재 가격의 변동을 나타내며, 일반적인 인플레이션 흐름을 파악할 수 있어요.",
  },
  CORE_PCE: {
    name: "근원 개인소비지출물가지수",
    description:
      "변동성이 큰 식료품과 에너지를 제외한 소비자 지출 가격의 변화를 반영하며, 연준이 선호하는 인플레이션 지표예요.",
  },
  GDP: {
    name: "국내총생산 분기 성장률",
    description:
      "한 국가의 경제활동 결과를 분기 단위로 측정하며, 경제 성장 속도와 경기의 전반적인 흐름을 보여줘요.",
  },
  NFP: {
    name: "비농업부문 신규 고용자 수",
    description:
      "농업을 제외한 산업에서 새로 고용된 인원 수를 의미하며, 미국 고용시장 상황과 경기 회복세를 확인할 수 있어요.",
  },
  UNEMPLOYMENT: {
    name: "실업률",
    description:
      "경제활동인구 중 일자리를 가지지 못한 비율을 나타내며, 고용 시장의 건강성과 경기 침체 여부를 판단할 수 있어요.",
  },

  INDUSTRIAL_PRODUCTION: {
    name: "산업생산",
    description:
      "광공업, 제조업 등 산업 전반의 생산 수준을 측정하며, 생산 활동의 변화로 경기 상황을 가늠할 수 있어요.",
  },

  RETAIL_SALES: {
    name: "근원 소매판매",
    description:
      "자동차와 연료 등 일부 품목을 제외한 소매 유통의 판매량 변화를 보여주며, 소비자 지출 흐름과 경기를 파악할 수 있어요.",
  },
  CORE_PPI: {
    name: "근원 생산자물가지수",
    description:
      "생산자가 판매하는 상품 중 에너지와 식료품을 제외한 가격 변동을 나타내며, 공급 측 물가 압력을 확인할 수 있어요.",
  },
};

export { economicIndicatorMap };
