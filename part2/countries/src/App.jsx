import {useEffect, useState} from 'react'
import {commonCountryNames} from './data/Countries.js'
import countryService from "./service/CountryService.js";
import weatherService from "./service/WeatherService.js";

const CountryDetails = ({ countryDetails }) => {
    if (countryDetails == null) {
        return null;
    }
    return (
        <div>
            <h1>{countryDetails.name}</h1>
            <div>capital {countryDetails.capital.join('/')}</div>
            <div>area {countryDetails.area}</div>
            <h3>languages:</h3>
            <ul>
                {countryDetails.languages.map((language) => (<li key={language}>{language}</li>))}
            </ul>
            <img src={countryDetails.flag} />
            <h1>Weather in {countryDetails.capital[0]}</h1>
            <div>temperature {countryDetails.temperature} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${countryDetails.icon}@2x.png`} />
            <div>wind {countryDetails.wind} m/s</div>
        </div>
    )
}

const CountryDisplay = ({ countries, countryDetails, setCountries }) => {
    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length > 1) {
        return (countries.map((country) => <div key={country}>
            <div>{country}<button onClick={() => setCountries([country])}>show</button></div>
        </div>))
    } else {
        return (<CountryDetails countryDetails={countryDetails} />)
    }
}


function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
      if (search !== '') {
          if (countries.length === 1) {
              const countryName = countries[0]
              countryService.getCountry(countryName)
                  .then(apiResponse => {
                      return {
                          name: countryName,
                          capital: apiResponse.capital,
                          area: apiResponse.area,
                          languages: Object.values(apiResponse.languages),
                          flag: apiResponse.flags.png
                      };
                  }).then((countryDetails) => {
                    weatherService.getWeather(countryDetails.capital[0])
                        .then((weather) => {
                            const finalCountryDetails = {
                                ...countryDetails,
                                temperature: weather.main.temp,
                                wind: weather.wind.speed,
                                icon: weather.weather[0].icon
                            }
                            setCountry(finalCountryDetails);
                        })
              })
          } else {
              setCountry(null)
          }
      } else {
          setCountry(null)
      }
  }, [countries])

  const onSearchChange = (e) => {
      const newSearchValue = e.target.value;
      const countries = commonCountryNames.filter(v => v.toLowerCase().includes(newSearchValue.toLowerCase()));
      setSearch(newSearchValue);
      setCountries(countries)
  }

  return (
    <div>
        <div>find countries <input value={search} onChange={onSearchChange}/></div>
        { search !== '' ? <CountryDisplay countries={countries} countryDetails={country} setCountries={setCountries}/> : null }
    </div>
  )
}

export default App
