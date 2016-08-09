import React, {Component} from 'react';
import { Paper, RaisedButton } from 'material-ui';
export default class StoreItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, preview, price, onAdd, id, ordered} = this.props;
    const styles = require('./StoreItem.scss');
    return (
      <div className={styles.wrapper}>
        <Paper zDepth={2} style={{padding: "20px 5px 10px 5px"}}>
          <h4 className={styles.title}>{title}</h4>
          <img src={preview} className={styles.previewImage}/>
          <div className={styles.seeAllBtn}>Посмотреть все</div>
        </Paper>
        <div className={styles.price}>{price} RUB</div>
        <div className={styles.btnWrapper}>
          <RaisedButton
            onClick={() => {onAdd(this.props.id, this.props.title)}}
            label="Primary"
            primary={true}
            label={(!ordered) ? "Добавить" : "Еще +1"}
            className={styles.add}
            style={{margin: "0"}}/>
        </div>
      </div>
    );
  }
}
