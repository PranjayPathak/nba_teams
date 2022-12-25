import './App.scss';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from './hooks/useFetch';
import NbaTable from './components/NbaTable';
import TeamCard from './components/TeamCard';
import React, { useMemo, useState } from 'react'
import TablePagination from './components/TablePagination';
import Spinner from 'react-bootstrap/Spinner';

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
    <div className="App">
      <h1>NBA</h1>
      <div>
        <input type='text' placeholder='Search using Name, City, Division etc.' value={searchValue} onChange={(e) => {
          setSearchValue(e.target.value)
        }} />
      </div>
      <div className='table-wrapper'>
        {loading ? <Spinner animation='border' /> : <NbaTable data={filteredData} setSelectedTeam={setSelectedTeam} page={page} />}</div>
      {error && 'Error while fetching data'}
      <TeamCard selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
      <TablePagination total={Math.ceil(filteredData.length / constants.DATA_PER_PAGE)} current={page} onPageChange={setPage} />
    </div>
  );
}

export default App;
