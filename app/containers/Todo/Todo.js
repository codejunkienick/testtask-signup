/* @flow weak */
import React, { Component } from 'react';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { connect} from 'react-redux';
import Helmet from 'react-helmet';
import {load, add, remove} from 'redux/actions/todo';
import ImmutablePropTypes from 'react-immutable-proptypes';
import applyStyles from 'react-css-modules';
import styles from './Todo.css';


const TodoItem = ({text, className, handleDelete, id}) => <Paper>
  <div className={className}>
    <a href="#" onClick={(event) => handleDelete(event, id)}>x</a> Entry: {text}
  </div>  
</Paper>;

@connect(
  state => ({
    items: state.getIn(['todo', 'items'])
  }),
  {load, add, remove}
)
@applyStyles(styles)
export default class Todo extends Component {
  state: {
    text: string
  }
  static propTypes = {
    todos: ImmutablePropTypes.list
  }
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
  handleDelete(event, id) {
    this.props.remove(id);
  }
  render() {
    const { text } = this.state;
    const { items } = this.props;
    return (
      <div className="container">
        <Helmet title="Todo list"/>
        <h1 className={styles.header}>Todo</h1>
        { items && items.map((todo, idx) => {
          return <TodoItem {...todo} key={idx} styleName="todoItem" handleDelete={this.handleDelete.bind(this)} />
        }) }
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
