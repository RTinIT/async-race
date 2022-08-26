import Component from '../tempale/Component';
import Pagination from '../tempale/Pagination';
import PageState from '../tempale/PageState';
import WinnersList from './WinnersList';
import { sort } from '../utils/requests';

class Winners extends Component {
  winnersList: WinnersList;

  title: Component;

  subtitle: PageState;

  pagination: Pagination;

  constructor(parentNode: HTMLElement) {
    super(parentNode, null, 'div', 'hidden', 'winners');

    this.title = new Component(this.node, null, 'h2', 'winners-title', 'winners-title', '<span>Winners</span> (<span id="winners-count-car"></span>)');

    this.subtitle = new PageState(this.node, 'winners');

    this.winnersList = new WinnersList(this.node, this.subtitle.page, 'winners');

    this.pagination = new Pagination(this.node, 'winners', 'winners');
  }

  init() {
    this.node.onclick = (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.textContent === 'Best time (seconds)') {
        if (!target.classList.contains('sorted')) {
          target.classList.add('sorted');
          this.winnersList.sort(this.subtitle.page, '_sort=time');
        } else {
          target.classList.remove('sorted');
          target.classList.add('revers-sorted');
          this.winnersList.sort(this.subtitle.page, '_sort=time&_order=desc');
        }
      }

      if (target.textContent === 'Wins') {
        if (!target.classList.contains('sorted')) {
          target.classList.add('sorted');
          this.winnersList.sort(this.subtitle.page, '_sort=wins');
        } else {
          target.classList.remove('sorted');
          target.classList.add('revers-sorted');
          this.winnersList.sort(this.subtitle.page, '_sort=wins&_order=desc');
        }
      }
    };
  }
}

export default Winners;
