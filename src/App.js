import React, { Component } from 'react';
import HexaCarousel from './HexaCarousel';
import data from './data';

class App extends Component {
  render() {
    return (
      <div>
        <HexaCarousel data={data} />
      </div>
    );
  }
}

export default App;