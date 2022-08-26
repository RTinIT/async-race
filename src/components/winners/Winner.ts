import { getCar } from '../utils/requests';
import Component from '../tempale/Component';
import { WinnerParams } from '../utils/types';

class Winner extends Component {
  number: number;

  static async get(id: number) {
    const car = await getCar(id);
    return car;
  }

  constructor(parentNode: HTMLElement, winner: WinnerParams, number: number) {
    super(parentNode, null, 'tr', '', `${winner.id}`);
    this.number = number;

    Winner.get(winner.id).then((car) => {
      const { color } = car;
      const { name } = car;
      this.node.innerHTML = `
      <td>${this.number}</td>
      <td>
          <svg style="fill:${color}; width:50px; height:30px;">
            <use xlink:href="#car"></use>
          </svg>
      </td>
      <td>${name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
      `;
    });
  }
}

export default Winner;
