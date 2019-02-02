import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Top 25 Repos of Users in the Database by Number of &nbsp;
      <select onChange={() => { props.changeStarsForks() }}>
        <option>Forks</option>
        <option>Stars</option>
      </select>
    </h4>
    <table>
      <tbody>
        {props.repos.map((repo, index) => {
          return (<RepoListEntry repo={repo} index={index} key={index} />);
        })}
      </tbody>
    </table>
  </div>
)

export default RepoList;