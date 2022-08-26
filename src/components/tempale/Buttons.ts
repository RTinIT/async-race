import Component from './Component';

class Buttons extends Component {
  handler: () => void;

  constructor(parentNode: HTMLElement, handler: () => void, content: string, id = '') {
    super(parentNode, null, 'button', '', content, id);
    this.handler = handler;
    this.node.onclick = () => {
      this.handler();
    };
  }
}

export default Buttons;
