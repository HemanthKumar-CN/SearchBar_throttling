import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './Component/SearchBar';
import countries from './utils/countries'

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])


  useEffect(() => {
    if(query == '')
    {
      setSuggestions([])
    }
    else
    {
      let newListofSuggestions = countries.filter(item => item.country.toLowerCase().indexOf(query) !== -1 ? true : false).map(item => item.country);

      setSuggestions(newListofSuggestions)
    }
    
    setTimeout(()=> setLoading(false), 1000)
   
  }, [query])
  

  return (
    <div className="App">
      <h1>Search  Bar</h1>
      <SearchBar loading={loading}  setLoading={setLoading} suggestions={suggestions} onChange ={(val)=> setQuery(val)} />
    </div>
  );
}

export default App;
