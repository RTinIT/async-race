import Garage from '../garage/Garage';
import Nav from '../tempale/Nav';
import Winners from '../winners/Winners';

class App {
  private main: HTMLElement;

  private header: HTMLElement;

  nav: Nav;

  garage: Garage;

  winners: Winners;

  constructor(parentNode: HTMLElement) {
    this.main = document.createElement('main');
    this.header = document.createElement('header');
    this.garage = new Garage(this.main);
    this.winners = new Winners(this.main);
    this.nav = new Nav(this.header, this.garage, this.winners);
    parentNode.append(this.main);
    parentNode.prepend(this.header);
  }

  init() {
    this.garage.init();
    this.winners.init();
    return this.main;
  }
}

export default App;
