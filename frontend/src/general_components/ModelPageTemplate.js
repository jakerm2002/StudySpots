import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import React from 'react'
import styles from './ModelPageTemplate.module.css'

export default function getModel(model_info) {
	return renderPage(model_info.entries, model_info.pageName, model_info.fields)
}

function renderPage(entries, page_name, fields) {
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
                    <div>{entries.length} items</div>
                    <div>Page 1/1</div>
                </Stack>
        </div>
    )
}