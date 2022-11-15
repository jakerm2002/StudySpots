// Pagination code from AnimalWatch (Spring 2022)
// https://gitlab.com/JohnPowow/animalwatch/-/blob/main/frontend/src/pages/Pagination.js

import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination'

const Paginate = ({ num_items_per_page, num_total_items }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    // get and display the current page if it is in the URL
    // but not selected using this Pagination component
    useEffect(() => {
        console.log(searchParams.get("page"));
        let pageNumber = parseInt(searchParams.get("page") ?? 1);
        console.log('pagenumber');
        console.log(pageNumber);
        setCurrentPage(pageNumber)
    }, [searchParams]);

    const changePage = (num) => {
        let newParams = searchParams;
        newParams.set("page", num);
        setCurrentPage(num);
        setSearchParams(newParams);
    }

    const span = Math.floor((num_items_per_page - 4) / 2);
    const lastPage = Math.ceil(num_total_items / num_items_per_page);

    const prevButtonKey = "prevButton";
    const nextButtonKey = "nextButton";
    const leftEllipsisKey = "leftEllipsis";
    const rightEllipsisKey = "rightEllipsis";

    // Layout used when not enough pages to use ellipses based on maxSpan
    const displayAll = () => {
        let items = [];
        let capturedPage = currentPage;
        for (let i = 1; i <= lastPage; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={currentPage === i}
                    onClick={() => {
                        if (currentPage !== i) changePage(i);
                    }}
                >
                    {i}
                </Pagination.Item>
            );
        }
        return items;
    };

    // Layout used when active page is not near edge
    // Ex.  "1 ... 4 5 '6' 7 8 ... 10"
    const activeInMiddle = () => {
        console.log("activeInMiddle sees page as " + currentPage);
        let items = [];
        let capturedPage = currentPage;
        items.push(
            <Pagination.Item
                key={1}
                onClick={() => {
                    changePage(1);
                }}
            >
                {1}
            </Pagination.Item>,
            <Pagination.Ellipsis key={leftEllipsisKey} />
        );
        console.log("span " + span);
        console.log("capturedPage - span = " + (capturedPage - span));
        console.log("span " + span);
        console.log("capturedPage " + capturedPage);
        console.log("capturedPage + span = " + (capturedPage + span));
        for (let i = capturedPage - span; i <= capturedPage + span; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={capturedPage === i}
                    onClick={() => {
                        if (capturedPage !== i) changePage(i);
                    }}
                >
                    {i}
                </Pagination.Item>
            );
        }
        items.push(
            <Pagination.Ellipsis key={rightEllipsisKey} />,
            <Pagination.Item
                key={lastPage}
                onClick={() => {
                    changePage(lastPage);
                }}
            >
                {lastPage}
            </Pagination.Item>
        );
        return items;
    };

    // Used when active is near edge
    // Ex.  "1 2 '3' ... 8 9 10"
    const activeOnEdge = () => {
        let items = [];
        let capturedPage = currentPage;
        for (let i = 1; i <= span + 2; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={capturedPage === i}
                    onClick={() => {
                        if (capturedPage !== i) changePage(i);
                    }}
                >
                    {i}
                </Pagination.Item>
            );
        }
        items.push(<Pagination.Ellipsis key={leftEllipsisKey} />);
        for (let i = lastPage - span - 1; i <= lastPage; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={capturedPage === i}
                    onClick={() => {
                        if (capturedPage !== i) changePage(i);
                    }}
                >
                    {i}
                </Pagination.Item>
            );
        }
        return items;
    };

    let content;
    if (lastPage - 1 + 1 <= num_items_per_page) {
        content = displayAll();
    } else if (
        currentPage > 1 + span &&
        currentPage < lastPage - span
    ) {
        content = activeInMiddle();
    } else {
        content = activeOnEdge();
    }


    return (
        // <div className="page-control">
        <Pagination>
            <Pagination.Prev
                key={prevButtonKey}
                disabled={currentPage === 1}
                onClick={() => {
                    changePage(currentPage - 1);
                }}
            />
            {content}
            <Pagination.Next
                key={nextButtonKey}
                disabled={currentPage === lastPage}
                onClick={() => {
                    changePage(currentPage + 1);
                }}
            />
        </Pagination>
        // </div>
    );


}

export default Paginate
