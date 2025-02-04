//@ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({ color: "blue" });
    this.setState({ model: "Jushsvi pag`du" });
    this.setState({ year: "1987" });
  };
  componentDidMount() {
    console.log("componentDidMount");
    // runs after first render => RETRIEVE DATA FROM BACKEND SERVER
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // runs before component unmount
  }

  componentDidUpdate() {}
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color} {this.state.model} from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}
export default Test;
