export const getPaginationParams = (page, take) => {
  const pageNum = Math.max(Number(page || 1), 1);
  const takeNum = Math.min(Math.max(Number(take || 10), 1), 30);
  const skip = (pageNum - 1) * takeNum;

  return { pageNum, takeNum, skip };
};

export const formatPaginationResult = ({ page, take, totalItems, data }) => {
  return {
    page,
    take,
    totalItems,
    data,
  };
};
