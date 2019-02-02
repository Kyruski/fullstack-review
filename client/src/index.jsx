import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search(term) {
    console.log(`${term} was searched`);
    const payload = JSON.stringify({ username: term });
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: payload,
      contentType: "application/json; charset=utf-8",
      success: (data) => (console.log('success')),
      error: () => (console.log('Something Went wrong'))
    })
  }

  componentDidMount() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        this.setState({
          repos: data
        });
      },
      error: () => (console.log('Something Went wrong'))
    })
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
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