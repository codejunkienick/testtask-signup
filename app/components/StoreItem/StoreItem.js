import React, {Component} from 'react';
import { Paper, RaisedButton } from 'material-ui';
import cssmodules from 'react-css-modules';
import styles from './StoreItem.css';

@cssmodules(styles)
export default class StoreItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { styles, title, preview, price, onAdd, id, ordered} = this.props;
    return (
      <div styleName="wrapper">
        <Paper zDepth={2} style={{padding: "20px 5px 10px 5px"}}>
          <h4 styleName="title">{title}</h4>
          <img src={preview} styleName="previewImage"/>
          <div styleName="seeAllBtn">Show all</div>
        </Paper>
        <div styleName="price">{price} RUB</div>
        <div styleName="btnWrapper">
          <RaisedButton
            onClick={() => {onAdd(this.props.id, this.props.title)}}
            label="Primary"
            primary={true}
            label={(!ordered) ? "Add" : "Add +1"}
            styleName="add"
            style={{ margin: "0" }}/>
        </div>
      </div>
    );
  }
}
