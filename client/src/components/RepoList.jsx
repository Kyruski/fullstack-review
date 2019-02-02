import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Top 25 Repos by Forks </h4>
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