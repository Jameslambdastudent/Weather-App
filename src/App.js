import React from "react"
import axios from "axios"
import "./App.css"
import Header from "./Header"
import Modal from "./Modal"


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
      isRaining: "",
      showModal: true,


    }
    
    
  }
  componentDidMount() {
    this.getCityWeather("london")
    let elems = document.querySelectorAll('.modal');
    let instances = window.M.Modal.init(elems);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.weather !== prevState.weather) {
      console.log("Weather App Updated...")
      const isRaining = this.state.weather.includes("rain")
      console.log(isRaining)
      if(isRaining) {
        this.setState({
          isRaining: "RAIN RAIN GO AWAY COME AGAIN ANOTHER DAY!!!"
        })
      }
  
    }
    }
    
  
  
  searchCity = (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value
    this.getCityWeather(city)
   
  }

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`
    axios.get(url).then((res) => {
     this.setState({
       temp: res.data.main.temp,
       high:res.data.main.temp_max,
       low: res.data.main.temp_min,
       weather: res.data.weather[0].description,
       icon: res.data.weather[0].icon,
       cityName: res.data.name

     })
    })
  }
  
  render() {
    const iconUrl = `http://openweathermap.org/img/wn/${this.state.icon}.png`
    return(
      <div className="row ">
        <div className="col s6 offset-s3">
        <Header temp={this.state.temp} raining={this.state.isRaining} />
        {this.state.showModal ? <Modal iconUrl={iconUrl} weather={this.state.weather} cityName={this.state.cityName} low={this.state.low} high={this.state.high}/> : ""}
        <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Details</a>
        <form onSubmit={this.searchCity}>
        <input type="text"  id="city" placeholder="Enter a City Name" />
        </form>
        </div>
       
    </div>
            
    
   
    )
  }
}
export default App