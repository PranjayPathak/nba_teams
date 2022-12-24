import Offcanvas from 'react-bootstrap/Offcanvas';

function TeamCard({ selectedTeam, setSelectedTeam }) {

    return (
        <Offcanvas show={selectedTeam !== null} onHide={() => {
            setSelectedTeam(null);
        }}
            placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{selectedTeam?.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
        // selectedTeam && <div className='card-wrapper'>
        //     <div className='card'>hh</div>
        // </div>
    )
}

export default TeamCard