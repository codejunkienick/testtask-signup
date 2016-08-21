import React, { Component } from 'react';
import config from '../../config';
import { Link } from 'react-router';

export default class BlogEntry extends Component {
  render() {
    const styles = require('./Spinner.css');
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div className={styles.foldingCube}>
          <div className={styles.cube1 + ' ' + styles.cube}></div>
          <div className={styles.cube2 + ' ' + styles.cube}></div>
          <div className={styles.cube4 + ' ' + styles.cube}></div>
          <div className={styles.cube3 + ' ' + styles.cube}></div>
        </div>
      </div>

    );
  }
}
