import React from 'react'
import Table from 'react-bootstrap/Table'

function NbaTable({ data, setSelectedTeam }) {
    console.log('table:', Object.keys(data[0]));
    
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>City</th>
                        <th>Abbreviation</th>
                        <th>Conference</th>
                        <th>Divison</th>
                    </tr>

                    {/* <tr>
                        {
                            Object.keys(data[0]).map((heading) => {
                                return <th>{heading}</th>
                            })
                        }
                    </tr> */}
                </thead>
                <tbody>
                    {
                        data.map(team => {
                            return (
                                <tr key={team.id} onClick={() => {
                                    setSelectedTeam(team)
                                }}>
                                    <td>{team.name}</td>
                                    <td>{team.city}</td>
                                    <td>{team.abbreviation}</td>
                                    <td>{team.conference}</td>
                                    <td>{team.division}</td>
                                </tr>)

                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default NbaTable