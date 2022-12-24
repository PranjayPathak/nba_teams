import './App.scss';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from './hooks/useFetch';
import NbaTable from './components/NbaTable';

function App() {
  const { data, loading, error } = useFetch(process.env.REACT_APP_TEAM_API);

  return (
    <div className="App">
      <h1>NBA</h1>
      {loading && 'Loading...'}
      {error && 'error'}
      {data.length && <NbaTable data={data} />}
    </div>
  );
}

export default App;
