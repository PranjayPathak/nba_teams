import React from 'react'
import Table from 'react-bootstrap/Table'
import * as constants from '../constants'
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';

function NbaTable({ data, page, setSelectedTeam, setOpenCard }) {

    return (
        <Table className='nba-table' hover>
            <thead className='rounded nba-table__head'>
                <tr>
                    {
                        constants.COLUMNS.map((col) => {
                            return <th key={col.text}>{col.text}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody className='nba-table__body'>
                {/* Slice data based on pagination */}
                {data.length > 0 ?
                    data.slice(
                        (page - 1) * constants.DATA_PER_PAGE,
                        page * constants.DATA_PER_PAGE
                    ).map(team => {
                        return (
                            <tr className='nba-table__body__row' key={team.id} onClick={() => {
                                setSelectedTeam(team);
                                setOpenCard(true);
                            }}>
                                {
                                    constants.COLUMNS.map((col) => {
                                        return <td key={col.text}>{team[col.dataField]}</td>
                                    })
                                }
                            </tr>)
                    }) : <tr><td colSpan={constants.COLUMNS.length}>Oops! no data found.</td></tr>
                }
            </tbody>
        </Table>
    )
}

export default NbaTable