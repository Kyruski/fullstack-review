import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      message: '',
      get: true
    }

  }

  changeStarsForks() {
    this.setState({
      get: !this.state.get
    }, () => {
      this.getData();
    });
  }

  getData() {
    let payload;
    if (this.state.get) {
      payload = 'forks';
    } else {
      payload = 'stars';
    }
    console.log('we sending', payload);
    $.ajax({
      url: '/repos',
      type: 'GET',
      data: { payload: payload },
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        this.setState({
          repos: data
        });
      },
      error: () => (console.log('Something Went wrong'))
    })
  }

  search(term) {
    console.log(`${term} was searched`);
    const payload = JSON.stringify({ username: term });
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: payload,
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        this.setState({
          message: data
        }, () => {
          this.getData()
        });
      },
      error: () => (console.log('Something Went wrong'))
    })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} changeStarsForks={this.changeStarsForks.bind(this)} />
      <Search onSearch={this.search.bind(this)} message={this.state.message} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));



/*
$.ajax({
  url: url,
  data: data,
  success: success,
  dataType: dataType
});
*/