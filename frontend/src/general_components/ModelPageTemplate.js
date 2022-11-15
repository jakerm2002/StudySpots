import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react'
import Pagination from './Pagination';
import styles from './ModelPageTemplate.module.css'

export default function getModel(model_info) {
	return RenderPage(model_info.entries, model_info.pageName, model_info.fields, model_info.num_items_per_page, model_info.num_total_items)
}

export const RenderPageTable = ({entries, page_name, fields}) => {
    return (
        <div>
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
        </div>
    )
}

const RenderPage = (entries, page_name, fields, num_items_per_page, num_total_items) => {
    return(
        <div className={styles.list}>
            <RenderPageTable entries={entries} page_name={page_name} fields={fields}/>
            <Stack>
                <div className={styles.model_page_pagination}><Pagination num_items_per_page={num_items_per_page} num_total_items={num_total_items}/></div>
                <div className='text'>Showing {entries.length} items</div>
            </Stack>
        </div>
    )
}