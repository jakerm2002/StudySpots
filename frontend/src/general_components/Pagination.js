import React, { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'

const Paginate = ({postsPerPage, totalPosts, paginate}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const changePage = (num) => {
        if (num <= pageNums.length) {
            setCurrentPage(num)
            paginate(num)
        }
    }

    console.log("num total items", totalPosts)


    const pageNums = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNums.push(i);
    }

    console.log("page nums: ", pageNums);

    return (
        <div>
            <Pagination>
                    <Pagination.Prev onClick={() => changePage(currentPage - 1)} />
                    {Array.from({ length: pageNums.length <= 20 ? pageNums.length : 20 }).map((_, idx) => (
                        <Pagination.Item key={pageNums[idx]} active={pageNums[idx] === currentPage} onClick={() => changePage(pageNums[idx])}>
                            {pageNums[idx]}
                        </Pagination.Item>
                    ))}
                    <Pagination.Ellipsis />
                    <Pagination.Next onClick={() => changePage(currentPage + 1)} />
            </Pagination>
            <div>Page {currentPage}/{totalPosts}</div>
        </div>
    )

}

export default Paginate
