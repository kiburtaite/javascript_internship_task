import { useState, useEffect } from 'react';
import ResultList from './ResultList.jsx';

const App = () => {

const [codes, setCodes] = useState(0);
const [error, setError] = useState(false);

useEffect(() => {
}, [codes]);

const search = e => {
  e.preventDefault();
  if (e.target.elements.text.value.length > 35 || 
    /[^a-zA-Z\s]/.test(e.target.elements.text.value)
  ){setError(true)
  } else
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
        type="submit"
        value="search"
        />
      </form>
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
