import Component from './Component';

class Pagination extends Component {
  constructor(parentNode: HTMLElement, id: string, view: string) {
    super(parentNode, null, 'div', 'pagination', id);
    this.node.innerHTML = `
      <button id=${view}-prev-btn>prev</button>
      <button id=${view}-next-btn>next</button>
    `;
  }
}

export default Pagination;
