import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react'
import Pagination from './Pagination';
import styles from './ModelPageTemplate.module.css'

export default function getModel(model_info) {
	return RenderPage(model_info.entries, model_info.pageName, model_info.fields, model_info.num_total_items)
}

const RenderPage = (entries, page_name, fields, num_total_items) => {

    console.log("mkMASKDASD", num_total_items)
    const [currentPage, setCurrentPage] = useState(1);
    // const [postsPerPage] = useState(10);

    // const indexLastBusiness = currentPage * postsPerPage;
    // const indexFirstBusiness = indexLastBusiness - postsPerPage;
    // const currentPosts = entries.slice(indexFirstBusiness, indexLastBusiness);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // get_data(num, "", "");
    }


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
                        {entries}
                    </tbody>
                </Table>
                <Stack>
                    <div>Showing {entries.length} items</div>
                   <Pagination postsPerPage={entries.length} totalPosts={num_total_items} paginate={paginate}/>
                   {/* <div>Page 1/1</div> */}
                </Stack>
        </div>
    )
}