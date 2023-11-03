function getOffset(listPerPage, currentPage = 1) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function errorResponse(res, message, data, code = 500) {
  return res.status(code).json({ success: false, message, data });
}

function successResponse(res, message, data, code = 200) {
  return res.status(code).json({ success: true, message, data });
}

module.exports = {
  getOffset,
  emptyOrRows,
  errorResponse,
  successResponse,
};
