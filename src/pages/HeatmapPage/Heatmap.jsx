import React from 'react';

export default function Heatmap() {
    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex">
                {/* 경제지표 목록 */}
                <div className="w-36 mr-2">
                    <div className="text-sm font-semibold text-center py-4 border-b">
                        경제지표 \ 섹터
                    </div>
                    {[
                        'CPI', 'PPI', 'GDP', '실업률', '비농업부문 고용지수',
                        'Core PCE', '소매판매', '산업생산', 'ISM 제조업 PMI',
                    ].map((label, idx) => (
                        <div
                            key={idx}
                            className="text-sm text-center py-4 bg-white border border-gray-200"
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* 히트맵 자리 */}
                <div className="flex-1">
                    {/* 섹터 타이틀 */}
                    <div className="grid grid-cols-11 gap-1 mb-2">
                        {[
                            '기술', '금융', '헬스케어', '자유소비재', '필수소비재',
                            '에너지', '산업재', '소재', '부동산', '유틸리티', '커뮤니케이션',
                        ].map((sector, idx) => (
                            <div
                                key={idx}
                                className="text-sm font-medium text-center py-2 bg-white border border-gray-200"
                            >
                                {sector}
                            </div>
                        ))}
                    </div>

                    {/* 히트맵 공간 */}
                    <div className="w-full h-[493px] bg-gray-300 rounded" />
                </div>
            </div>
            {/* 히트맵 색상 레전드 */}
            <div className="flex justify-center gap-6 mt-6 ml-15">
                {[
                    { label: '강한 음의 상관관계', color: 'bg-[#3B82F6]' },
                    { label: '약한 음의 상관관계', color: 'bg-[#93C5FD]' },
                    { label: '무상관', color: 'bg-gray-300' },
                    { label: '약한 양의 상관관계', color: 'bg-[#FCA5A5]' },
                    { label: '강한 양의 상관관계', color: 'bg-[#EF4444]' },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className={`w-4 h-4 rounded ${item.color}`} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}







