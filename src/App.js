import './App.scss';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from './hooks/useFetch';
import NbaTable from './components/NbaTable';
import TeamCard from './components/TeamCard';
import React, { useState } from 'react'
import TablePagination from './components/TablePagination';


function App() {
  const { data, loading, error } = useFetch(process.env.REACT_APP_TEAM_API);
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="App">
      <h1>NBA</h1>
      {loading && 'Loading...'}
      {error && 'error'}
      {data.length && <NbaTable data={data} setSelectedTeam={setSelectedTeam}/>}
      <TeamCard  selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam}/>
      <TablePagination /> 
    </div>
  );
}

export default App;
