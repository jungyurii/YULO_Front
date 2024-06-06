import React, { Component } from "react";

import GaugeChart from "react-gauge-chart";

export class Gauge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      guage: 0
    };
  }
  componentDidMount() {
    
    const { guage } = this.props;
    console.log(guage);
    this.setState({
      guage: guage,
    });
  }


  componentDidUpdate(prevProps) {
    if (prevProps.guage !== this.props.guage) {
      this.setState({
        guage: this.props.guage,
      });
    }
  }

  render() {
    return (
      <div style={{width: "50%", height:"50%"}}>
        <GaugeChart
          id="gauge-chart3"
          nrOfLevels={5}
          colors={['#0000ff','#00ACFF', '#339933', '#FFA500', '#FF0000']}
          arcWidth={0.3}
          percent={this.state.guage * 0.18}
          hideText={true} 
        />
      </div>
    );
  }
}