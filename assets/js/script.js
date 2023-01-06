//form object
class Form {
  items = [];
  method = 'GET';
  constructor(container, method, action) {
    this.container = document.querySelector(container);
    this.method = method;
    this.action = action;
  }

  addItem(item) {
    this.items.push(item);
  }

  render() {
    let formElement = document.createElement('form');
    formElement.setAttribute('method', this.method);
    formElement.setAttribute('action', this.action);

    for (let i in this.items) {
      this.items[i].render(formElement);
    }

    this.container.appendChild(formElement);
  }
}

//input object
class Input {

  _type = 'text';
  required = false;

  constructor(name, label) {
    this.name = name;
    this.label = label;
  }

  get type() {
    return this._type;
  }

  set type(t) {
    if (['text', 'password', 'email', 'submit'].includes(t)) {
      this._type = t;
    } else {
      throw new Error(`Input "${t}" type doesn't exist.`);
    }
  }

  render(formElement) {
    let el = document.createElement('input');
    el.type = this.type;
    el.method = this.method;
    el.placeholder = this.label;
    el.required = this.required;
    formElement.appendChild(el);
  }
}

//button object
class Button extends Input {
  constructor(label) {
    super('', label);
    this.type = 'submit';
  }

  render(formElement) {
    let el = document.createElement('input');
    el.type = this.type;
    el.value = this.label;
    formElement.appendChild(el);
  }
}

//implementation

//Form
let form = new Form('.formArea', 'POST', 'https://aquiumsitequalquer.com.br');

//EMAIL 
let email = new Input("email", 'Digite seu EMAIL');
email.type = 'email';
email.required = true;
form.addItem(email);

//Password
let password = new Input('password', 'Digite sua senha');
password.type = 'password';
form.addItem(password);


//Button
let button = new Button('Enviar');
form.addItem(button);

form.render();