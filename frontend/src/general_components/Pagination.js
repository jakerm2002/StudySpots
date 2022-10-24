import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNums = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNums.push(i);
    }

    console.log("page nums: ", pageNums);

    return (
        <nav>
            <ul className="pagination">
                {pageNums.map(num => (
                    <li key={num} className="item">
                        <a onClick={() => paginate(num)} href='!#' className='link'>
                            {num}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
