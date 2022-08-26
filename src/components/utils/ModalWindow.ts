import Component from '../tempale/Component';
import { getCar } from './requests';

class ModalWindow extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, null, 'h3', 'modal', '');
  }

  show(id: number, time: string) {
    getCar(id).then((car) => {
      this.node.textContent = `${car.name} is the Winner(${time})!`;
      setTimeout(() => this.destroy(), 8000);
    });
  }
}

export default ModalWindow;
