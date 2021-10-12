// ProjectInput class
import Cmp from './base-component';
import * as Validatable from '../util/validation';
import { autoBind as AutoBind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.renderContent();
  }
  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  renderContent() {}

  private clearInput() {
    this.titleInputElement.value = '';
    this.peopleInputElement.value = '';
    this.descriptionInputElement.value = '';
  }
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    const titleValidatable: Validatable.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !Validatable.validate(titleValidatable) ||
      !Validatable.validate(descriptionValidatable) ||
      !Validatable.validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInput();
    }
  }
}
