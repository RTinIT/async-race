import { createCar, getCars, updateCar } from '../utils/requests';
import Component from '../tempale/Component';
import Buttons from '../tempale/Buttons';
import {
  generateRandom, DataParamsNewCar, rgbToHex,
} from '../utils/types';
import Inputs from './Inputs';
import { carsBrand, carsModel, colors } from '../utils/random/random-cars-list';

class Settings extends Component {
  createBtn: Buttons;

  updateBtn: Buttons;

  inputNameCreate: Inputs;

  inputColorCreate: Inputs;

  inputNameUpdate: Inputs;

  inputColorUpdate: Inputs;

  raceBtn: Buttons;

  resetBtn: Buttons;

  generateBtn: Buttons;

  selectedCarId = '';

  constructor(parentNode: HTMLElement) {
    super(parentNode, null, 'div', 'settings', '');

    this.inputNameCreate = new Inputs(this.node, { key: 'type', value: 'text' }, 'input', 'settings-create', 'create-name');

    this.inputColorCreate = new Inputs(this.node, { key: 'type', value: 'color' }, 'input', 'settings-create', 'create-color');

    this.createBtn = new Buttons(this.node, () => {

    }, 'create-btn', 'create');

    this.inputNameUpdate = new Inputs(this.node, { key: 'type', value: 'text' }, 'input', 'settings-update', 'update-name');

    this.inputColorUpdate = new Inputs(this.node, { key: 'type', value: 'color' }, 'input', 'settings-update', 'update-color');

    this.updateBtn = new Buttons(this.node, () => {
      console.log('cliked-updpate');
    }, 'update-btn', 'update');

    this.raceBtn = new Buttons(this.node, () => {}, 'race-btn', 'race');

    this.resetBtn = new Buttons(this.node, () => {}, 'reset-btn', 'reset');

    this.generateBtn = new Buttons(this.node, () => {}, 'generate-btn', 'generate');
  }

  addCar(car: DataParamsNewCar, currPage: number) {
    const carList = this.node.parentNode?.childNodes[3] as HTMLElement;

    const countCarsElem = this.node.nextSibling?.childNodes[2] as HTMLElement;
    const newCar = createCar(car).then(() => {
      getCars(currPage).then((cars) => {
        countCarsElem.innerHTML = `${cars.count ? cars.count : '0'}`;
      });
    });
    return Promise.all([newCar]);
  }

  selectCar(carName: string, carColor: string, carId: string) {
    this.inputNameUpdate.node.value = carName;
    this.inputColorUpdate.node.value = rgbToHex(carColor);
    this.selectedCarId = carId;
  }

  changeCar(carName: string, carColor: string, currPage: number) {
    const carList = this.node.parentNode?.childNodes[3] as HTMLElement;

    const countCarsElem = this.node.nextSibling?.childNodes[2] as HTMLElement;
    try {
      const car = { name: carName, color: carColor };
      updateCar(car, +this.selectedCarId).then(() => {
        getCars(currPage).then((cars) => {
          countCarsElem.innerHTML = `${cars.count ? cars.count : '0'}`;
          return cars;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  genereteRandomCars(currPage: number) {
    const carList = this.node.parentNode?.childNodes[3] as HTMLElement;

    const countCarsElem = this.node.nextSibling?.childNodes[2] as HTMLElement;
    try {
      const randomCars = generateRandom(carsBrand, carsModel, colors);
      const result = randomCars.map((car) => createCar(car).then((resp) => resp));
      Promise.all(result).then(() => {
        getCars(currPage).then((cars) => {
          countCarsElem.innerHTML = `${cars.count ? cars.count : '0'}`;
          return cars;
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Settings;
