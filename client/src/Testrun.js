import React from 'react';

class Testrun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    
    alert('You are running speed test on: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your device:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="iPad">iOS Tablet</option>
            <option value="iPhone">iOS Phone</option>
            <option value="Android_phone">AOS Phone</option>
            <option value="Android_tablet">Tablet</option>
            <option value="Laptop">Laptop Computer</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Testrun;