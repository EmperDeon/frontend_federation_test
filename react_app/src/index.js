import ReactDOM from 'react-dom'
import {Component, createElement} from 'react';

const el = createElement;
const letters = "0123456789ABCDEF";

function gen_color() {
  let color = '#';
  for (let i = 0; i < 6; i++)
    color += letters[(Math.floor(Math.random() * 16))];

  return color;
}

function Button(props) {
  return el('button', {onClick: props.handleClick}, props.name);
}

class Counter extends Component {
  state = {
    num: 0
  }
  handleIncrement = () => {
    this.setState({
      num: this.state.num + 1
    })
  }
  handleDecrement = () => {
    this.setState({
      num: this.state.num - 1
    })
  }
  render() {
    return el('div', { style: { padding: '2px', border: '1px solid ' + gen_color() } },
      el('p', null,
        'React',
        'Count - ',
        this.state.num,
        el(Button, {handleClick: this.handleIncrement, name: 'Increment'}, null),
        el(Button, {handleClick: this.handleDecrement, name: 'Decrement'}, null)
      ),
      'Slot:',
      el('slot', null, null)
    )
  }
}

function app_callback(root) {
  ReactDOM.render(el(Counter, null, null), root);
}

export default app_callback;
