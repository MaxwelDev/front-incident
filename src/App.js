import React, { Component } from "react"
import phone from "./phone.svg"
import "./App.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

class App extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }

  componentWillMount() {
    this.getList()
  }

  getList = () => {
    const URL = "https://responsibleincident.herokuapp.com/im-day"
    const self = this
    return axios.get(URL).then(res => {
      self.setState({
        list: res.data
      })
    })
  }

  render() {
    const { list } = this.state
    const dayTranslated = {
      SUNDAY: "Domingo",
      MONDAY: "Segunda",
      TUESDAY: "Terça",
      WEDNESDAY: "Quarta",
      THURSDAY: "Quinta",
      FRIDAY: "Sexta",
      SATURDAY: "Sábado"
    }

    const valid = {
      Yesterday : "Ontem",
      Today: "Hoje",
      Tomorrow: "Amanhã"
    }

    return (
      <section className="App container">
        <table className="table">
          <tbody>
            {list.filter((item, index) => index < 11).map(item => (
              <tr>
                <td>{`${valid[item.aliasDate]  ?  valid[item.aliasDate] : dayTranslated[item.date.dayOfWeek]} (${item.date
                  .dayOfMonth}/${item.date.monthValue})`}</td>
                <td>{item.name === "Phone" ? <img width="20" src={phone}/> : item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}

export default App
