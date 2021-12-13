import React from "react";
import Pagination from "react-js-pagination";

const Paging = ({ currentPage, onChange, totalLength, postPerPage }) => {
  const pageNumbers = Math.ceil(totalLength / postPerPage);

  return (
    <Pagination
      activePage={currentPage}
      totalItemsCount={pageNumbers * 9}
      pageRangeDisplayed={pageNumbers}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={onChange}
    />
  );
};

export default Paging;