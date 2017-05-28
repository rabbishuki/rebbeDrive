import React, { Component } from 'react';
import FoldersList from './foldersList';
import NavBar from './navBar';

export default class Main extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">
        <NavBar/>
        <div>
          <FoldersList className="top-list" />
        </div>
      </div>
    )
  }
}