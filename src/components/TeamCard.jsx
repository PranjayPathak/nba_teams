import Offcanvas from 'react-bootstrap/Offcanvas';
// import Placeholder from 'react-bootstrap/Placeholder';
import useFetch from '../hooks/useFetch';
import * as constants from '../constants'
import { useMemo } from 'react';


function TeamCard({ selectedTeam, setSelectedTeam }) {
    const { data, meta, loading, error } = useFetch(`${process.env.REACT_APP_GAME_API}?seasons[]=${constants.GAME_SEASON}&team_ids[]=${selectedTeam.id}`);

    const randomGame = useMemo(() => {
        let val = Math.floor(Math.random() * (data?.length));
        return data != undefined ? data[val] : null
    }, [data])

    const randomGameDetails = useMemo(() => {
        let gameDate = new Date(randomGame?.date);
        gameDate = `${gameDate.getFullYear()}-${gameDate.getMonth()}-${gameDate.getDate()}`;

        return [
            { dataField: gameDate, text: 'Date' },
            { dataField: randomGame?.home_team.name, text: 'Home Team' },
            { dataField: randomGame?.home_team_score, text: 'Home Team Score' },
            { dataField: randomGame?.visitor_team.name, text: 'Visitor Team' },
            { dataField: randomGame?.visitor_team_score, text: 'Visitor Team Score' },
        ]
    }, [data])

    return (
        <Offcanvas className='canvas' show={selectedTeam !== null} onHide={() => {
            setSelectedTeam(null);
        }}
            placement='end'>
            <Offcanvas.Header closeButton className='canvas__head px-4'>
                <Offcanvas.Title><span className='canvas__head--heading'>{selectedTeam?.name}</span></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='canvas__body px-4'>
                <div className='p-1'>
                    <div className='row py-3'>
                        <div className='col'>Team Full Name</div>
                        <div className='col'>{selectedTeam?.full_name}</div>
                    </div>
                    <div className='row py-3'>
                        <div className='col'>Total Games in {constants.GAME_SEASON} </div>
                        <div className='col'>{loading ? '--' : meta.total_count}</div>
                    </div>
                </div>
                <div className=' py-4 canvas__body--bold'>
                    <span>Random Game Details:</span>
                    <div className='p-3'>
                        {
                            randomGameDetails.map((col, i) => {
                                return (
                                    <div className='py-3 row' key={i}>
                                        <div className='col'>{col.text}</div>
                                        <div className='col'>{loading ? '--' : col.dataField}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default TeamCard