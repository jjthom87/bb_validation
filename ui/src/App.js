import React, { Component } from "react";
import "./App.css";
import Autocomplete from 'react-autocomplete';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      allDbResults: [],
      setDbResults: [],
      ebayResults: [],
      value: ''
    };
  }
  selectChange(e){
    this.setState({
        value: e
    })

    fetch(`http://localhost:4000/search-by-beanie?beanie=${this.state.value}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ebayResults: result
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
  componentDidMount() {
    // fetch("http://localhost:4000/search-by-beanie?beanie=trap")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         ebayResults: result
    //       });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       console.error(error)
    //       // this.setState({
    //       //   isLoaded: true,
    //       //   error
    //       // });
    //     }
    //   )

      fetch("http://localhost:4000/all-beanies")
        .then(res => res.json())
        .then((result) => {
            this.setState({
              allDbResults: result
            });
            let beanieBabiesNames = result.map((beanie) => beanie['Beanie Baby Name']);
            let setBeanieBabiesNames = [...new Set(beanieBabiesNames)];
            this.setState({
              setDbResults: setBeanieBabiesNames
            })
          },
          (error) => {
            console.error(error)
          }
        )
  }
  render(){
    return(
        <div id="wrapper">
            <Autocomplete
              getItemValue={(item) => item}
              items={this.state.setDbResults}
              renderItem={(item, isHighlighted) =>
                  this.state.value && item.toLowerCase().includes(this.state.value) ?
                      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                          {item}
                      </div> : <div></div>
              }
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
              onSelect={this.selectChange.bind(this)}
            />
            <div id="header"> HEADER </div>
            <div id="body">
                <div id="sidebar"> SIDEBAR </div>
                <div id="content">
                  <ul>
                    {this.state.ebayResults.map(item => (
                      <li key={item.itemId}>
                        <p>{item.title}</p>
                        <p>{item.price.value}</p>
                        <img src={item.image ? item.image.imageUrl : null} />
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
