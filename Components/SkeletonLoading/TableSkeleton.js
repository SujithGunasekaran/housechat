

export default function TableSkeleton({ rowCount = 3, cellCount = 4 }) {
    return (
        <>
            {
                [...Array(rowCount)].map((_, index) => (
                    <tr key={index}>
                        {
                            [...Array(cellCount)].map((_, index) => (
                                <td key={index}>
                                    <div className="table_line" />
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </>
    )
}

