import { useState, useEffect } from 'react';
import ResultList from './ResultList.jsx';

const App = () => {

const [start, setStart] = useState(1656633600);
const [end, setEnd] = useState(1659225600);
const [company, setCompany] = useState(0);
const [error, setError] = useState(false);
const [chart, setChart] = useState(false);

useEffect(() => {
}, [company, start, end]);

const search = e => {
  e.preventDefault();
  setChart(false);
  if (e.target.elements.text.value.length > 35 || 
    /[^a-zA-Z\s]/.test(e.target.elements.text.value)
  ){setError(true)
  } else
  if(e.target.elements.start.value){
    setStart(parseInt((new Date(e.target.elements.start.value).getTime() / 1000).toFixed(0)))
  };
  if(e.target.elements.end.value){
    setEnd(parseInt((new Date(e.target.elements.end.value).getTime() / 1000).toFixed(0)))
  };
  fetch('http://localhost:5000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: e.target.elements.text.value})
  })
  .then(res => res.json())
  .then(data => setCompany(data))
};

const reset = () => {
  setCompany(0);
  setStart(1656633600);
  setEnd(1659225600);
  setError(false)
};

  return (
    <div>
      {error && 
        <h3 className="error">Search input should only consist of letters (including space), and it shouldn't exceed 35 characters.</h3>
      }
      <form onSubmit={search}>
        <input
        type="text"
        name="text"
        placeholder="Search for company by name"
        />
        <input
        type="date"
        name="start"
        />
        <input
        type="date"
        name="end"
        />
        <input
        onClick={reset}
        type="button"
        value="reset"
        />
        <input
        type="submit"
        value="search"
        />
      </form>
      <div>
        {company!==0 ?
        /*map() method should be used here if problem with search results is fixed.*/
        <ResultList
        company={company}
        start={start}
        end={end}
        chart={chart}
        setChart={setChart}
        />
        : null
        }
      </div>
    </div>
  );
}

export default App