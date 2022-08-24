const App = () => {

const search = e => {
  e.preventDefault();
  fetch('http://localhost:5000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: e.target.elements.text.value})
  })
  .then(res => res.json())
  .then(data => console.log(data))
};

  return (
    <div>
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
    </div>
  );
}

export default App;
