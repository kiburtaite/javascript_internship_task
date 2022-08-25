import { useEffect } from "react";

const Graph = ( {company, start, end} ) => {

 useEffect(() => {
    fetch('http://localhost:5000/candles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        code: company.ticker,
        start: start,
        end: end
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))
 });

    return (
      <div>
        <p>{company.ticker}</p>
      </div>
    );
  }
  
  export default Graph