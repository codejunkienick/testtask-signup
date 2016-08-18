import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { connect} from 'react-redux';
import Helmet from 'react-helmet';
import {load, add, remove} from 'redux/actions/todo';

@connect(
  state => ({
    todos: state.getIn(['todo', 'todos'])
  }),
  {load, add, remove}
)
export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }; 
  }
  componentWillMount() {
    const { load } = this.props;
    load();
  }
  handleAdd() {
    const { text } = this.state;
    if (!text) return;
    this.props.add({text});
  }
  handleChange(event) {
    this.setState({text: event.target.value});
  }
  render() {
    const styles = require('./Todo.scss');
    const { text } = this.state;
    return (
      <div className="container">
        <Helmet title="Todo list"/>
        <h1 className={styles.header}>Todo</h1>
        <div>
          <TextField
            hintText="Text"
            value={text}
            onChange={(event) => this.handleChange(event)}
          />
          <RaisedButton 
            label="Add"
            primary={true}
            onTouchTap={() => this.handleAdd()}
          />
        </div>
      </div>
    )
  }
}
