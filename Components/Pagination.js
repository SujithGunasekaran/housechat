import Pagination from "react-js-pagination";


export default function AppPagination() {
    return (
        <Pagination
            activePage={1}
            itemsCountPerPage={10}
            totalItemsCount={50}
            pageRangeDisplayed={5}
            onChange={() => { }}
            itemClass="page-item"
            linkClass="page-link"
        />
    )
}