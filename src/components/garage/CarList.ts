/* eslint-disable consistent-return */
import Component from '../tempale/Component';
import { CarType } from '../utils/types';
import Car from './Car';
import {
  createWinner, getCars, removeCar, startEngine, stopEngine, switchToDrive,
} from '../utils/requests';
import ModalWindow from '../utils/ModalWindow';

class CarList extends Component {
  pageNumber: HTMLElement;

  countCars: HTMLElement;

  carAnimate: Animation | undefined;

  cars = [] as Car[];

  static async get(currPage: number) {
    const cars = await getCars(currPage);
    return { cars: cars.arr, count: cars.count };
  }

  constructor(parentNode: HTMLElement, currPage: number, view: string) {
    super(parentNode, null, 'div', '', `${view}-page-${currPage}`);

    this.countCars = this.node.previousSibling?.previousSibling?.childNodes[2] as HTMLElement;

    this.pageNumber = this.node.previousSibling?.childNodes[1] as HTMLElement;

    CarList.get(currPage).then((e) => {
      this.countCars.innerText = e.count ? e.count : '';
    });

    CarList.get(currPage).then((resp) => {
      resp.cars.forEach((e: CarType) => {
        const car = new Car(this.node, e);
        this.cars.push(car);
      });
    });
  }

  update(currPage: number) {
    CarList.get(currPage).then((resp) => {
      this.cars = [];
      resp.cars.forEach((e: CarType) => {
        const car = new Car(this.node, e);
        this.cars.push(car);
      });
      console.log(this.cars);
    });
  }

  deleteChildren() {
    return [...this.node.children].map((e) => e.remove());
  }

  async isLastPage(currPage: number) {
    const cars = await CarList.get(currPage);
    const lastPage = Math.ceil(+cars.count / 7);
    return lastPage === currPage;
  }

  getPrevList(currPage: number) {
    this.pageNumber.innerText = `${currPage}`;
    this.node.id = `garage-page-${currPage}`;

    this.update(currPage);
  }

  getNextList(currPage: number) {
    this.pageNumber.innerText = `${currPage}`;
    this.node.id = `garage-page-${currPage}`;

    this.update(currPage);
  }

  deleteCar(id: number, currPage: number) {
    try {
      removeCar(id).then(() => {
        getCars(currPage).then((cars) => {
          this.countCars.innerHTML = `${cars.count ? cars.count : '0'}`;
          return cars;
        })
          .then(() => this.update(currPage));
      });
    } catch (error) {
      console.log(error);
    }
  }

  async drive(car: HTMLElement) {
    const id = +car.id;
    const carSvg = car.lastChild as HTMLElement;
    const distWindow = document.documentElement.scrollWidth - 100;

    const start = await startEngine(id);
    const { velocity } = start;
    const { distance } = start;
    const timeRace = distance / velocity;
    this.carAnimate = carSvg.animate(
      [
        { transform: 'translateX(0px)' },
        { transform: `translateX(${distWindow}px)` }],
      timeRace,
    );
    this.carAnimate.play();
    this.carAnimate.onfinish = () => {
      const carStyle = carSvg.style;
      carStyle.transform = `translateX(${distWindow}px)`;
    };

    return new Promise((resolve) => {
      const drive = switchToDrive(id);
      drive.then((data) => {
        if (data.ok) {
          resolve(timeRace);
        }
        if (data.status === 500) {
          this.carAnimate?.pause();
        }
      });
    });
  }

  stop(car: HTMLElement) {
    const { id } = car;
    stopEngine(+id).then(() => {
      this.carAnimate?.cancel();
      const carStyle = (car.lastChild as HTMLElement).style;
      carStyle.transform = 'translateX(0px)';
    });
  }

  async race() {
    try {
      const cars = [...this.node.children] as HTMLElement[];
      const raceResult = cars.map(async (car) => {
        const id = +car.id;
        const winner = await this.drive(car) as number;
        console.log(winner);

        return { id, winner };
      });
      const res = await Promise.race(raceResult);
      const modalWindow = new ModalWindow(this.node);

      if (res) {
        modalWindow.show(res.id, (res.winner / 1000).toFixed(2));
        const newWinner = await createWinner({
          id: res.id,
          wins: 1,
          time: +(res.winner / 1000).toFixed(2),
        });
        console.log(newWinner);
      }
    } catch (error) {
      console.log(error);
    }
  }

  resetRace() {
    const cars = [...this.node.children] as HTMLElement[];
    cars.forEach((car) => this.stop(car));
  }
}

export default CarList;
