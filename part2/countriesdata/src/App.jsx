import { useState,useEffect } from 'react'
import countriesService from './services/countries'

const CountriesList = ({countries,filterInput,onShowCountry}) => {
  const countriesList = countries.filter(c=> c.name.common.toLowerCase().includes(filterInput.toLowerCase()))

  if(filterInput===""){
    return(
      <p>Enter country</p>
    )
  }

  if(countriesList.length>10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

  if (countriesList.length===1) {
    const currentCountry = countriesList[0]
    return(
      <>
        <CountryInfo country={currentCountry} />
      </>
    )
  }

  return(
    <div>
      {countriesList
      .map(c=> <p key={c.name.common}>{c.name.common} <button onClick={()=>onShowCountry(c.name.common)}>show</button></p>
      )}
    </div>
  )
}

const CountryInfo = ({country}) => {
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital} <br />
      Area: {country.area} </p>

      <h4>Languages: </h4>
      <ul>
        {Object.values(country.languages).map(language=>
          <li key={language}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} width={200} height={150} />

      <Weather capitalName={country.capital} />

    </div>
  )
}

const Weather = ({capitalName}) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(()=>{
    countriesService
      .getWheather(capitalName)
      .then(returnedWeather=>setWeatherData(returnedWeather))
      .catch(error=>{
        alert("faild to retrive weather")
      })
  },[])

  if(!weatherData){
    return(
      <h4>Weather in {capitalName}</h4>
    )
  }

  return(
    <div>
      <h4>Weather in {capitalName}</h4>
      <p>Temperature {weatherData.current.temp_c} Celcius</p>
      <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
      <p>Wind {weatherData.current.wind_kph} kph </p>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterInput,setFilterInput] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error=>{
        alert("Faild to retrive data")
      })
  },[])

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value)
  }

  const handleSelectedCountry = (name) =>{
    countriesService
      .getCountry(name)
      .then(returnedCountry=>{setFilterInput(returnedCountry.name.common)})
      .catch(error=>{alert(`Failed to retrive ${name} data`)})
  }

  return (
    <>
      find countries: <input onChange={handleFilterChange}  />
      <CountriesList countries={countries} filterInput={filterInput} onShowCountry={handleSelectedCountry} />
    </>
  )
}

export default App
