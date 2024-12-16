import { IButtonStyleClasses } from "../interfaces/button-style-classes"

export class ButtonStylesClasses {
  private classes: IButtonStyleClasses = {};

  constructor() {}

  setFullWith(): ButtonStylesClasses {
    this.classes["full-width"] = true;
    
    return this;
  }

  setIsRounded(): ButtonStylesClasses {
    this.classes["atom-rounded-custom-button"] = true;

    return this;
  }

  build(): IButtonStyleClasses {
    return this.classes;
  }
}
