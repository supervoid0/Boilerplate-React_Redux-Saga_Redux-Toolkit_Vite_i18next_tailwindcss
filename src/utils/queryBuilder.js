export const buildQuery = (params = {}) =>
  `?${Object.keys(params)
    .map((key) => {
      if (Array.isArray(params[key])) {
        return `${key}[]=${params[key].join(`&${key}[]=`)}`;
      }
      return `${key}=${params[key]}`;
    })
    .join('&')}`;

export const buildPaginatedQuery = (
  params = {},
  limit = 10,
  page = 1,
  sortOrder = -1,
  sortBy = '',
) => {
  if (sortBy === '') {
    return `${buildQuery(params)}&limit=${limit}&page=${page}`;
  }
  return `${buildQuery(
    params,
  )}&limit=${limit}&page=${page}&sortOrder=${sortOrder}&sortBy=${sortBy}`;
};

export const buildFilteredAndPaginatedQuery = (
  params = {},
  limit = 10,
  page = 1,
) => {
  const filteredParams = {};
  Object.keys(params).forEach((key) => {
    if (key && params[key]) filteredParams[key] = params[key];
  });
  return buildPaginatedQuery(filteredParams, limit, page);
};

export const buildSortedQuery = (params, sortBy, sortOrder) => {
  return `${buildQuery(params)}&sortOrder=${sortOrder}&sortBy=${sortBy}`;
};
