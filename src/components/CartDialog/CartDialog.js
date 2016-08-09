import React, {Component} from 'react';
import { Dialog, Paper, FlatButton, RaisedButton } from 'material-ui';
export default class CartDialog extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styles = require('./CartDialog.scss');
    const { 
      open, 
      handleClose, 
      handleOrder,
      handleAdd,
      items 
    } = this.props;
    const actions = [
      <FlatButton
        label='Закрыть'
        primary={true}
        onTouchTap={handleClose}
        style={{color: '#b0bec5'}}
        className='btn'
      />,
    ];
    if (items) {
      actions.push(
      <RaisedButton
        label='Заказать'
        primary={true}
        keyboardFocused={true}
        onTouchTap={handleOrder}
        className='btn'
        style={{minWidth: 160, marginLeft: 8}}
      />);
    }
    return (
        <Dialog
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
          contentStyle={{maxWidth: 460}}
        >
          <h3 className={styles.title}>{(items) ? 'Вы заказали' : 'Корзина пуста'}</h3>
          <div className={styles.items}>
            {items.map((item, idx) => {
              return (
                <div className={styles.item} key={idx}>
                  <Paper>
                    <div className="row">
                      <div className={styles.previewWrapper + ' col-xs-4'}>
                        <img src={item.preview} className={styles.preview} alt=""/>
                      </div>
                      <div className="col-xs-8">
                        <div className={styles.itemName + ' font-condensed'}>NERD STICKERS: {item.title}</div>
                        <div className={styles.itemQuantity + ' font-condensed'}>Колличество: {item.quantity}</div>
                        <div className={styles.itemBtns}>
                            <RaisedButton
                              label="Добавить"
                              primary={true}
                              onTouchTap={handleAdd}
                              className="btn"
                              style={{width: '100%', minWidth: 'none'}}
                            />
                            <RaisedButton
                              label="-1"
                              primary={true}
                              onTouchTap={handleAdd}
                              className="btn"
                              backgroundColor="#ff5252"
                              style={{width: '100%', minWidth: 'none'}}
                            />
                        </div>
                      </div>
                    </div>
                  </Paper>
                </div>
                )
            })}
          </div>
        </Dialog>
    );
  }
}
