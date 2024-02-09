import React from 'react';

class UserSelect extends React.Component {
  state = {
    values: [{ "user_id": "", first_name: "All", last_name: "Team Members" }]
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/index')
      .then(function (res) {
        return res.json();
      }).then((json) => {
        this.setState({
          values: this.state.values.concat(json)
        })
      });
  }
  render() {
    return <div className="drop-down col-auto">
      <select>{
        this.state.values.map((obj) => {
          return <option value={obj.user_id} key={obj.user_id}>{obj.first_name} {obj.last_name}</option>
        })
      }</select>
    </div>;
  }
}

export default UserSelect;