import { Component } from 'react'

class App extends Component {

  constructor(props) {
    super(props);
  }

  getData() {
    const API = 'http://127.0.0.1:4000/'
    fetch(`${API}fetchData`)
      .then(res => res.json())
      .then(data => {
        const result = document.querySelector('.result');

        result.innerHTML = ''

        data.forEach(user => {
          result.innerHTML += `
            <p>Name: ${user.name}</p>
            <p>Phone: ${user.phone}</p>
            <img src="${API}${user.url}" />
            `;
        });
      })
  }

  pushData() {
    const API = 'http://127.0.0.1:4000/'
    const formData = new FormData()
    formData.append('name', document.getElementById('name').value)
    formData.append('phone', document.getElementById('name').value)
    formData.append('image', document.getElementById('image').files[0])

    fetch(`${API}pushData`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => alert(data.msg))
      .catch(err => alert('Error: ', err))
  }

  render() {
    return (
      <div className="App">
        <form>
          <label>Name</label>
          <input type="text" id="name" />
          <label>Phone</label>
          <input type="text" id="phone" />
          <label>Upload your Profile</label>
          <input type="file" id="image" />
          <input type='button' value="submit" id="btn_submit" onClick={this.pushData} />
        </form>

        <div className="result">

        </div>
        {document.addEventListener('DOMContentLoaded', this.getData())}
      </div>
    );
  }
}

export default App;
