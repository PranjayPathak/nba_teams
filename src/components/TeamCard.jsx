import Offcanvas from 'react-bootstrap/Offcanvas';
import useFetch from '../hooks/useFetch';
import * as constants from '../constants'
import { useMemo } from 'react';


function TeamCard({ selectedTeam, openCard, setOpenCard }) {
    // fetch games data
    const { data, meta, loading } = useFetch(`${process.env.REACT_APP_GAME_API}?seasons[]=${constants.GAME_SEASON}&team_ids[]=${selectedTeam.id}`);

    const randomGameDetails = useMemo(() => {
        let randomGame = data?.[Math.floor(Math.random() * (data?.length))]; // select random game
        let gameDate = new Date(randomGame?.date);
        gameDate = `${gameDate.getFullYear()} - ${gameDate.getMonth()} - ${gameDate.getDate()}`; // formate date

        // return random game details
        return [
            { dataField: gameDate, text: 'Date' },
            { dataField: randomGame?.home_team.name, text: 'Home Team' },
            { dataField: randomGame?.home_team_score, text: 'Home Team Score' },
            { dataField: randomGame?.visitor_team.name, text: 'Visitor Team' },
            { dataField: randomGame?.visitor_team_score, text: 'Visitor Team Score' },
        ]
    }, [data])

    return (
        <Offcanvas className='canvas' show={openCard} onHide={() => {
            setOpenCard(false);
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