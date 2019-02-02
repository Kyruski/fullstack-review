import React from 'react';

const RepoListEntry = ({ repo, index }) => (
  <tr>
    <td>
      {index + 1}
    </td>
    <td >
      <img src={repo.author_avatar} className="avatar" height="50px" width="50px" />
    </td>
    <td>
      <a href={repo.link} className="repo-name">{repo.repo} </a>
      by <span className="author"> {repo.author}</span>
      &nbsp;&nbsp;&nbsp;
      <span className="forks">{repo.forks} Forks</span>
      &nbsp;&nbsp;&nbsp;
      <span className="stars">{repo.stars} Stars</span>
    </td>
  </tr>
)

export default RepoListEntry;