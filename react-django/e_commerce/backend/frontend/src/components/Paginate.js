import { Pagination } from "react-bootstrap";

const Paginate = ({ page, pages, query = "", isAdmin = false }) => {
    
    query = query ? query.split("?query=")[1].split("&")[0] : "";

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((pageNumber) => {
                    return (
                        <Pagination.Item
                            key={pageNumber}
                            active={pageNumber + 1 === page}
                            href={
                                isAdmin
                                ? `/admin/products/?query=${query}&page=${pageNumber + 1}`
                                : `/?query=${query}&page=${pageNumber + 1}`
                            }
                        >
                            {pageNumber + 1}
                        </Pagination.Item>
                    )
                })}
            </Pagination>
        )
    )
}

export default Paginate;