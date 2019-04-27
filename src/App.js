import React, { Component } from 'react';
import './App.css';
import { scaleSqrt } from 'd3-scale'
import { selectAll } from 'd3-selection'
import cityData from './data/city-data';

// Circles that have their radaii determined by the population of a city and color
// determined by a color mapping of continents.

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cities: cityData,
      circles: ''
    }

    this.createCircles();
  }

  createCircles() {
    const circle_selection = selectAll('circle').data(this.state.cities);
    
    this.setState({ 
      circles: circle_selection
    });

    // Set colors by the continent
    const color = {
      'Europe': '#66c2a5',
      'North America': '#8da0cb',
      'Asia': '#fc8d62'
    };
    circle_selection
      .attr('r', function(d) {
        return this.scaleRadius(d.population);
      })
      .style('fill', function(d) {
        return color[d.continent];
      });
  }

  scaleRadius(population) { 
    return ( 
      scaleSqrt(population).domain([0, 25000000]).range([0, 50])
    );
  }


  render() {
    const xcoords = [100, 250, 400, 550, 700];
    return (
      <div>
        <svg height="100" width="100">
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />
        </svg>
      </div>
    );
  }
}


export default App;
