import { getCars } from '../utils/requests';
import Component from './Component';

class PageState extends Component {
  page = 1;

  pageElem: HTMLElement;

  static async isLastPage(page: number) {
    const resp = await getCars(page);
    const lastPage = Math.ceil(+resp.count / 7);
    return lastPage === page;
  }

  constructor(parentNode: HTMLElement, view: string) {
    super(parentNode, null, 'h3', `${view}-subtitle`, `${view}-subtitle`);
    this.node.innerHTML = `<span>Page #</span><span id="${view}-page-number">${this.page}</span>`;

    this.pageElem = this.node.childNodes[1] as HTMLElement;
  }

  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
    }

    this.pageElem.innerHTML = `${this.page}`;
    return this.page;
  }

  nextPage() {
    if (!PageState.isLastPage(this.page)) {
      this.page += 1;
    }

    this.pageElem.innerHTML = `${this.page}`;
    return this.page;
  }

  async changePage() {
    const resp = await getCars(this.page);
    if (resp.arr.length === 0) {
      this.page -= 1;
    }
    return this.page;
  }
}

export default PageState;
