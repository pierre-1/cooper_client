import React, { Component } from "react";
import { getData } from "../modules/performanceData";
import { Line } from "react-chartjs-2";

class DisplayPerformanceData extends Component {
  state = {
    performanceData: null,
    renderIndex: false
  };

  componentDidMount() {
    this.getPerformanceData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateIndex != prevProps.updateIndex) {
      this.getPerformanceData();
    }
  }

  async getPerformanceData() {
    let result = await getData();
    this.setState({ performanceData: result.data.entries }, () => {
      this.props.indexUpdated();
    });
  }

  render() {
    let dataIndex;

    if (this.state.performanceData != null) {
      dataIndex = (
        <div>
          {this.state.performanceData.map(item => {
            return <div key={item.id}>{item.data.message}</div>;
          })}
        </div>
      );
    }

    const distances = [];
    const labels = [];
    if (this.state.performanceData != null) {
      this.state.performanceData.forEach(entry => {
        distances.push(entry.data.distance);
        labels.push(entry.data.message);
      });
    }

    let dataForLineDiagram = {
      datasets: [
        {
          data: distances,
          label: "Your previous results",
          fill: false,
          borderColor: "#0000FF"
        }
      ],
      labels: labels
    };

    return (
      <div id="index">
        <Line
          height={30}
          width={100}
        data={dataForLineDiagram}/>
      </div>
    );
  }
}

export default DisplayPerformanceData;
