import { useState } from "react";
import image from "./assets/search.png";
import { AiOutlineSearch } from "react-icons/ai";

function App() {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState();
  const [degree, setDegree] = useState("");
  const [img, setImg] = useState("");
  const [day1, setDay1] = useState([]);
  const [day2, setDay2] = useState([]);
  const [day3, setDay3] = useState([]);

  const key = `a56b5f2a0ee04236808134255231906`;
  const BASE_URL = `http://api.weatherapi.com/v1`;
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayNo = new Date().getDay();
  const day = week[dayNo];

  async function calculate(e) {
    e.preventDefault();

    if (inputText) {
      try {
        const fetching = await fetch(
          `${BASE_URL}/forecast.json?key=${key}&q=${inputText}&days=3`
        );
        const d = await fetching.json();
        // const temp = ;
        // const img = ;
        // const date = ;
        // const humidity = ;
        // const place = ;
        // const uv = ;
        // const wind = ;
        // const condition = ;

        setData([d.current.last_updated.slice(0, 10), `${d.location.name} - ${d.location.region} - ${d.location.country}`, d.current.condition.text, d.current.humidity, d.current.uv, d.current.wind_kph]);
        setDegree(d.current.temp_c);
        setImg(d.current.condition.icon);

        const d1 = d.forecast.forecastday[0];
        const d2 = d.forecast.forecastday[1];
        const d3 = d.forecast.forecastday[2];
        // const d1Img = ;
        // const d1Temp = ;

        // const d2Img = ;
        // const d2Temp = ;

        // const d3Img = ;
        // const d3Temp = ;

        setDay1([d1.day.condition.icon, Math.round((d1.day.mintemp_c + d1.day.maxtemp_c) / 2)]);
        setDay2([d2.day.condition.icon, Math.round((d2.day.mintemp_c + d2.day.maxtemp_c) / 2)]);
        setDay3([d3.day.condition.icon, Math.round((d3.day.mintemp_c + d3.day.maxtemp_c) / 2)]);
      } catch (error) {
        console.log(error);
        alert("No Matching City Found");
      }
    } else {
      alert("Type a City Name");
    }
  }

  return (
    <>
      <main className="app">
        <h1>Weather Status</h1>
        <form onSubmit={calculate}>
          <input
            type="text"
            className="input"
            autoFocus
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Search Any City"
          />
          <button type="submit">
            <AiOutlineSearch />
          </button>
        </form>
        {data ? (
          <section className="container">
            <div className="current-weather">
              <h2>{day}</h2>
              <p>{data[0]}</p>
              <p>{data[1]}</p>
              <img src={img} />
              <h1>{degree}&deg;C</h1>
              <h3>{data[2]}</h3>
            </div>
            <div className="forecast-weather">
              <div className="future-time">
                <div className="box-1 box">
                  <img src={day1[0]} />
                  <p>{week[(dayNo + 1) % 7].slice(0, 3)}</p>
                  <h3>{day1[1]}&deg;C</h3>
                </div>
                <div className="box-1 box">
                  <img src={day2[0]} />
                  <p>{week[(dayNo + 2) % 7].slice(0, 3)}</p>
                  <h3>{day2[1]}&deg;C</h3>
                </div>
                <div className="box-1 box">
                  <img src={day3[0]} />
                  <p>{week[(dayNo + 3) % 7].slice(0, 3)}</p>
                  <h3>{day3[1]}&deg;C</h3>
                </div>
              </div>
              <div className="current-all-details">
                <div className="box-1 box">
                  <h3>UV Index</h3>
                  <h3>{data[4]}</h3>
                </div>
                <div className="box-1 box">
                  <h3>Humidity</h3>
                  <h3>{data[3]}</h3>
                </div>
                <div className="box-1 box">
                  <h3>Wind</h3>
                  <h3>{data[5]}</h3>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="search">
            <img src={image} />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
