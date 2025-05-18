export const formatFomcTitle = (dateStr) => {
  const [year, month] = dateStr.split("-");
  return `${year}년 ${parseInt(month)}월 회의록`;
};
