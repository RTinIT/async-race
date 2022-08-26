import Component from './Component';
import Buttons from './Buttons';
import Garage from '../garage/Garage';
import Winners from '../winners/Winners';

class Nav extends Component {
  toGarage: Buttons;

  toWinners: Buttons;

  constructor(parentNode: HTMLElement, garage: Garage, winners: Winners) {
    super(parentNode, null, 'nav', 'nav');

    this.toGarage = new Buttons(this.node, () => {
      garage.node.classList.remove('hidden');
      winners.node.classList.add('hidden');
    }, 'togarage-btn', 'to garage');

    this.toWinners = new Buttons(this.node, () => {
      winners.node.classList.remove('hidden');
      garage.node.classList.add('hidden');
      winners.winnersList.deleteChildren();
      winners.winnersList.update(winners.subtitle.page);
    }, 'towinners-btn', 'to winners');
  }
}

export default Nav;
