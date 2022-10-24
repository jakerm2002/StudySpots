import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react'
import Pagination from './Pagination';
import styles from './ModelPageTemplate.module.css'

export default function getModel(model_info) {
	return RenderPage(model_info.entries, model_info.pageName, model_info.fields)
}

const RenderPage = (entries, page_name, fields) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexLastBusiness = currentPage * postsPerPage;
    const indexFirstBusiness = indexLastBusiness - postsPerPage;
    const currentPosts = entries.slice(indexFirstBusiness, indexLastBusiness);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <div className={styles.list}>
            <h1 className={styles.pageName}>{page_name}</h1>
                <Table striped bordered hover id={styles.entries}>
                    <thead>
                        <tr>
                            {fields.map((info) => (
                                <th>{info}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts}
                    </tbody>
                </Table>
                <Stack>
                    <div>{entries.length} items</div>
                    {/* <div>Page 1/1</div> */}
                    <Pagination postsPerPage={postsPerPage} totalPosts={entries.length} paginate={paginate}/>
                </Stack>
        </div>
    )
}