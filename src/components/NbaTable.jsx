import React from 'react'
import Table from 'react-bootstrap/Table'
import * as constants from '../constants'
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

function NbaTable({ data, page, setSelectedTeam }) {
    // console.log('table:', Object.keys(data[0]));

    return (
        <div>
            {/* <BootstrapTable keyField='id' data={data} constants.COLUMNS={constants.COLUMNS}
                pagination={paginationFactory()}
            /> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {
                            constants.COLUMNS.map((col) => {
                                return <th key={col.text}>{col.text}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.slice(
                            (page - 1) * constants.DATA_PER_PAGE,
                            page * constants.DATA_PER_PAGE
                        ).map(team => {
                            return (
                                <tr key={team.id} onClick={() => {
                                    setSelectedTeam(team)
                                }}>
                                    {
                                        constants.COLUMNS.map((col) => {
                                            return <td key={col.text}>{team[col.dataField]}</td>
                                        })
                                    }
                                </tr>)

                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default NbaTable