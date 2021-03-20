import Pagination from "react-js-pagination";


export default function AppPagination({ count, pageNumber, pageSize, onPageChange }) {
    return (
        <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={pageNumber}
            itemsCountPerPage={pageSize}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            onChange={(page) => { onPageChange(page, pageSize) }}
        />
    )
}