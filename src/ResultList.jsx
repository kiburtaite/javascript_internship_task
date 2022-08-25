import Graph from './Graph.jsx';

const ResultList = ( {company, start, end} ) => {

    return (
      <div>
        <div>
          <h3>Results</h3>
          <h4>{company.name}</h4>
          <h4>{company.country}</h4>
          <h4>{company.currency}</h4>
          <h4>{company.weburl}</h4>
        </div>
        <Graph
        company={company}
        start={start}
        end={end}
        />
      </div>
    );
  }
  
  export default ResultList