export const getDataById = (data, target) => {
  return data?.find((item) => item.id === target?.id);
};

export const log = (data) => {
  console.log(data);
};

export const nextPage = (setPage, page, total) => () => {
  if (page < total) {
    setPage((page) => page + 1);
  } else {
    setPage(page);
  }
};

export const prevPage = (setPage, page) => () => {
  if (page === 1) return;
  setPage((page) => page - 1);
};

export const gotoPage = (setPage) => (page) => {
  setPage(page + 1);
};
