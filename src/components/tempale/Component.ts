class Component<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, attr: { key: string, value: string | null } | null, tagName = 'div', className = '', id = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.id = id;
    el.innerHTML = content;
    if (attr) {
      el.setAttribute(`${attr.key}`, `${attr.value}`);
    }
    if (parentNode) {
      parentNode.append(el);
    }
    this.node = el as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
}

export default Component;
