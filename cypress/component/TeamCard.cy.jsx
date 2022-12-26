
import { useState } from 'react'
import TeamCard from '../../src/components/TeamCard'
import '../../src/App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';


const selectedTeam = {
  "id": 1,
  "abbreviation": "ATL",
  "city": "Atlanta",
  "conference": "East",
  "division": "Southeast",
  "full_name": "Atlanta Hawks",
  "name": "Hawks"
};

const Wrapper = () => {
  const [openCard, setOpenCard] = useState(false);

  return (
    <>
      <button onClick={() => {
        setOpenCard(true)
      }}>Open Card</button>
      {openCard && <TeamCard selectedTeam={selectedTeam} openCard={openCard} setOpenCard={setOpenCard} />}
    </>
  )
}

describe('TeamCard.cy.jsx', () => {
  it('should not render the card overlay initially', () => {
    cy.mount(<Wrapper />)
    cy.get(".canvas__head--heading").should('not.exist')
    // cy.contains('Hawks').should('not.exist')
  })

  it('should render the card overlay when clicked on button', () => {
    cy.mount(<Wrapper />)
    const btn = cy.get('button')
    btn.click();
    cy.get(".canvas__head--heading").contains('Hawks').should('exist')
    // cy.get("canvas__head--heading").
  })
})