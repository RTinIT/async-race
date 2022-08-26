import Component from '../tempale/Component';
import CarList from './CarList';
import Pagination from '../tempale/Pagination';
import Settings from './Settings';
import PageState from '../tempale/PageState';
import { ToDo } from '../utils/types';

class Garage extends Component {
  settings: Settings;

  carList: CarList;

  pagination: Pagination;

  title: Component;

  subtitle: PageState;

  constructor(parentNode: HTMLElement) {
    super(parentNode, null, 'div', '', 'garage');

    this.settings = new Settings(this.node);

    this.title = new Component(this.node, null, 'h1', 'garage-title', 'garage-title', '<span>Garage</span> (<span id="garage-count-car"></span>)');

    this.subtitle = new PageState(this.node, 'garage');

    this.carList = new CarList(this.node, this.subtitle.page, 'garage');

    this.pagination = new Pagination(this.node, 'garage', 'garage');
  }

  init() {
    this.node.onclick = (event: Event) => {
      const target = event.target as HTMLElement;

      const todo = (id: string) => {
        const todoObj: ToDo = {

          'create-btn': () => {
            this.carList.deleteChildren();
            const resp = this.settings.addCar({
              name: `${this.settings.inputNameCreate.getValue()}`,
              color: `${this.settings.inputColorCreate.getValue()}`,
            }, this.subtitle.page);
            resp.then(() => this.carList.update(this.subtitle.page));
          },

          'remove-btn': () => {
            const carId = target.parentElement?.id;
            this.carList.deleteChildren();
            this.carList.deleteCar(carId ? +carId : 0, this.subtitle.page);
            this.subtitle.changePage();
          },

          'select-btn': () => {
            const carSelected = target.parentElement as HTMLSpanElement;
            carSelected.classList.add('selected');
            const carName = carSelected.children[4].textContent as string;
            const carColor = (carSelected.lastChild?.lastChild as SVGElement).style.fill;
            this.settings.selectCar(carName, carColor, carSelected.id);
          },

          'update-btn': () => {
            const name = this.settings.inputNameUpdate.node.value;
            const color = this.settings.inputColorUpdate.node.value;
            this.settings.changeCar(name, color, this.subtitle.page);
            this.carList.deleteChildren();
            const cars = [...this.node.children[3].children];
            const carSelected = cars.find((e) => e.classList.contains('selected'));
            carSelected?.classList.remove('selected');
          },

          'generate-btn': () => {
            this.carList.deleteChildren();
            this.settings.genereteRandomCars(this.subtitle.page);
            this.carList.update(this.subtitle.page);
          },

          'start-btn': () => {
            const car = target.parentElement as HTMLElement;
            this.carList.drive(car);
          },

          'stop-btn': () => {
            const car = target.parentElement as HTMLElement;
            this.carList.stop(car);
          },

          'race-btn': () => {
            this.carList.race();
          },

          'reset-btn': () => {
            this.carList.resetRace();
          },

          'garage-prev-btn': () => {
            this.carList.deleteChildren();
            const res = this.subtitle.page === 1;
            if (res) {
              this.carList.getPrevList(1);
            } else {
              this.subtitle.page -= 1;
              this.carList.getPrevList(this.subtitle.page);
            }
          },

          'garage-next-btn': () => {
            this.carList.deleteChildren();
            this.carList.isLastPage(this.subtitle.page)
              .then((resp) => {
                if (resp) {
                  this.carList.getNextList(this.subtitle.page);
                } else {
                  this.subtitle.page += 1;
                  this.carList.getNextList(this.subtitle.page);
                }
              });
          },
        };

        return todoObj[id] ?? (() => null);
      };

      const result = todo(target.id);
      result();
    };
  }
}

export default Garage;
