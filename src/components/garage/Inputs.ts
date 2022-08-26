class Inputs<NodeType extends HTMLInputElement = HTMLInputElement > {
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, attr: { key: string, value: string | null } | null, tagName = 'div', className = '', id = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.id = id;
    if (attr) {
      el.setAttribute(`${attr.key}`, `${attr.value}`);
    }
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as NodeType;
  }

  getValue() {
    return this.node.value;
  }

  destroy(): void {
    this.node.remove();
  }
}

export default Inputs;
