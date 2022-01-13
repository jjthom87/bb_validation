import React, { Component } from "react";
import "./App.css";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/search-by-beanie?beanie=hoot")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.error(error)
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }
      )
  }
  render(){
    return(
      <div className="wrapper">
        <header>
        </header>

        <div className="sidebar">
        </div>

        <ol>
          {this.state.items.map(item => (
            <li key={item.itemId}>
              <p>{item.itemId}</p>
              <img src={item.image.imageUrl} />
            </li>
          ))}
        </ol>

      </div>
    );
  }
}

export default App;
