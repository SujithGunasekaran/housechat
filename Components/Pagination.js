import { useState } from 'react';
import Pagination from "react-js-pagination";


export default function AppPagination({ count, pageSize }) {

    const [activePage, setActivePage] = useState(1);

    return (
        <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            itemsCountPerPage={pageSize}
            totalItemsCount={count ? count : 0}
            pageRangeDisplayed={5}
            onChange={(page) => { setActivePage(page) }}
        />
    )
}