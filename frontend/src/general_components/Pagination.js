import React, { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'

const Paginate = ({num_items_per_page, postsPerPage, totalPosts, paginate}) => {

    const [currentPage, setCurrentPage] = useState(1)


    // console.log("num total items", totalPosts)


    const pageNums = [];
    const changePage = (num) => {
        if (num <= pageNums.length) {
            setCurrentPage(num)
            paginate(num)
        }
    }
    // for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    //     pageNums.push(i);
    // }


    // if(!is_loading) {
    for(let i = 1; i <= Math.ceil(totalPosts / num_items_per_page); i++) {
        pageNums.push(i);
        console.log('hey')
    }
    // }

    // console.log("page nums: ", pageNums);
    // console.log("page nums length: ", pageNums.length)

    return (
        <div>
            <Pagination>
                    <Pagination.Prev onClick={() => changePage(currentPage - 1)} />
                    {Array.from({ length: pageNums.length <= 40 ? pageNums.length : 40 }).map((_, idx) => (
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
