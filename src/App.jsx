import { useState, useEffect } from 'react';
import ResultList from './ResultList.jsx';

const App = () => {

const [start, setStart] = useState(1640995200);
const [end, setEnd] = useState(1659312000);
const [codes, setCodes] = useState(0);
const [error, setError] = useState(false);

useEffect(() => {
  console.log(codes, start, end)
}, [codes, start, end]);

const search = e => {
  e.preventDefault();
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
  .then(data => setCodes(data))
};

const reset = () => {
  setCodes(0);
  setStart(1640995200);
  setEnd(1659312000);
  setError(false)
};

  return (
    <div>
      {error && 
        <h3>Search input should only consist of letters (including space), and it shouldn't exceed 35 characters.</h3>
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
        type="submit"
        value="search"
        />
      </form>
      <button onClick={reset}>Reset</button>
      <div>
        {codes!==0 ?
        <ResultList
        codes={codes}/>
        : null
        }
      </div>
    </div>
  );
}

export default App;
