import { getWinners, sort } from '../utils/requests';
import Component from '../tempale/Component';
import { DataNewWinner, WinnerParams } from '../utils/types';
import Winner from './Winner';

class WinnersList extends Component {
  pageNumber: HTMLElement;

  countCars: HTMLElement;

  header: Component;

  winnersList = [] as Winner[];

  winnerId = 0;

  winnerWins = 0;

  winnerTime = 0;

  static async get(currPage: number) {
    const cars = await getWinners(currPage);
    return { cars: cars.arr, count: cars.count };
  }

  constructor(parentNode: HTMLElement, currPage: number, view: string) {
    super(parentNode, null, 'table', '', `${view}-page-${currPage}`);

    this.header = new Component(
      this.node,
      null,
      'tr',
      '',
      'table-head',
      `
    <tr>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Best time (seconds)</th>
    </tr>
    `,
    );

    this.countCars = this.node.parentNode?.firstChild?.childNodes[2] as HTMLElement;

    this.pageNumber = this.node.previousSibling?.childNodes[1] as HTMLElement;

    WinnersList.get(currPage).then((e) => {
      this.countCars.innerText = e.count ? e.count : '';
    });

    WinnersList.get(currPage).then((resp) => {
      resp.cars.forEach((winner: WinnerParams, i: number) => {
        const newWinner = new Winner(this.node, winner, i + 1);
        this.winnersList.push(newWinner);
      });
    });
  }

  update(currPage: number) {
    WinnersList.get(currPage).then((resp) => {
      resp.cars.forEach((winner: WinnerParams, i: number) => {
        const newWinner = new Winner(this.node, winner, i + 1);
        this.winnersList.push(newWinner);
      });
    });
  }

  deleteChildren() {
    return [...this.node.children].forEach((e) => {
      if (e !== this.node.firstChild) {
        e.remove();
      }
    });
  }

  sort(currPage: number, sortType: string) {
    sort(currPage, sortType)
      .then((resp) => resp.json())
      .then((resp) => {
        this.winnersList = [];
        this.deleteChildren();
        resp.forEach((car: DataNewWinner, i: number) => {
          const newWinner = new Winner(this.node, car, i + 1);
          this.winnersList.push(newWinner);
        });
      });
  }
}

export default WinnersList;
