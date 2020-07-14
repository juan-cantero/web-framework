import { Component } from '../models/Component';

export abstract class ComponentUi<T extends Component<P>, P> {
  regions: { [key: string]: Element } = {};
  constructor(public parent: Element, public component: T) {
    this.bindComponent();
  }

  bindComponent(): void {
    this.component.on('change', () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  regionMap(): { [key: string]: string } {
    return {};
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionMap = this.regionMap();

    for (let key in regionMap) {
      const selector = regionMap[key];
      const element = fragment.querySelector(selector);
      this.regions[key] = element;
    }
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsToBind = this.eventsMap();
    for (let eventKey in eventsToBind) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsToBind[eventKey]);
      });
    }
  }

  onRender(): void {}

  abstract template(): string;

  render(): void {
    this.parent.innerHTML = '';
    const templeElement = document.createElement('template');
    templeElement.innerHTML = this.template();
    this.bindEvents(templeElement.content);
    this.mapRegions(templeElement.content);
    this.onRender();
    this.parent.append(templeElement.content);
  }
}
