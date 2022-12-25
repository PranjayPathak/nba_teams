import './App.scss';
import React, { useMemo, useState } from 'react'
import TablePagination from './components/TablePagination';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from './hooks/useFetch';
import NbaTable from './components/NbaTable';
import TeamCard from './components/TeamCard';
import * as constants from './constants'


const filterKeys = constants.COLUMNS.map((col) => col.dataField);

function App() {
  const { data, loading, error } = useFetch(process.env.REACT_APP_TEAM_API);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    const filteredData = data.filter(team => filterKeys.some(key => team[key].toLowerCase().includes(searchValue.toLowerCase())))
    return filteredData
  }, [searchValue, data])

  return (
    <div className="App container">
      <h1 className='header-1 py-4'>NBA TEAMS</h1>
      <input className='py-2 px-4 rounded search-input' type='text' placeholder='Search using Name, City, Division etc.' value={searchValue} onChange={(e) => {
        page !== 1 && setPage(1);
        setSearchValue(e.target.value)
      }} />

      <div className='table-wrapper py-4'>
        {loading ? <div className='spinner-container'><Spinner animation='border' /></div> : <NbaTable data={filteredData} setSelectedTeam={setSelectedTeam} page={page} />}
      </div>

      <div>
        {filteredData.length > 0 && <TablePagination total={Math.ceil(filteredData.length / constants.DATA_PER_PAGE)} current={page} onPageChange={setPage} />
        }
      </div>
      {error && 'Error while fetching data'}
      {selectedTeam !== null && <TeamCard selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />}
    </div>
  );
}

export default App;
