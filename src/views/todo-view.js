import { LitElement, html, css, render } from 'lit-element'; 

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';

const VisibilityFilters = { 
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
};
const mainColor = css`red`;

class TodoView extends LitElement {

    static get properties() { 
        return {
          todos: { type: Array },
          filter: { type: String },
          task: { type: String },
          buttonname: {type: String },
          isDone: { type:Boolean },
          isCheck1: { type:Boolean },
        };
    }
    static get styles() {
    // Write styles in standard CSS
    return css`
      p { font-family: sans-serif; }
      .myclass { margin: 100px; }
      #main { padding: 30px; }
      h1 { font-size: 4em; }
    `;
  }
    constructor() {
        super();
        this.todos = [];
        this.noOfStars = ["1", "2", "3", "4", "5"];
        this.filter = VisibilityFilters.SHOW_ALL;
        this.task = '';
        this.classes = { mydiv: true, someclass: true };
        this.styles = { color: 'green' };
        this.buttonname = 'before Click',
        this.isDone = true;
        this.checked1 = { checked: false };
        this.checked2 = { checked: false };
        this.checked3 = { checked: false };
        this.checked4 = { checked: false };
        this.checked5 = { checked: false };

        this.stylesStar = { color: 'green' };
        this.isCheck1 = false;
        this.checked = { checked: false };
        this.checked21 = { checked: false };
        this.checked31 = { checked: false };
        this.checked41 = { checked: false };
        this.checked51 = { checked: false };
    }
    changeClass() {
        this.addEventListener('click', (e) => {  this.classes = { mydiv: false, someclass: true }; } );
        this.classes = { mydiv: false, someclass: true };
        this.buttonname = 'After Click'
    }

  render() {
    return html` 
    <div class="input-layout"
        @keyup="${this.shortcutListener}"> 
        
            <vaadin-text-field
            placeholder="Task"
            value="${this.task}" 
            @change="${this.updateTask}"> 
            </vaadin-text-field>
        
            <vaadin-button
            theme="primary"
            @click="${this.addTodo}"> 
                Add Todo
            </vaadin-button>
    </div>

    <div class="todos-list">'
                ${this.applyFilter(this.todos).map(
                    todo => html` 
                    <div class="todo-item">
                        <vaadin-checkbox
                            ?checked="${todo.complete}" 
                            @change="${ e => this.updateTodoStatus(todo, e.target.checked)}"> 
                            ${todo.task}
                        </vaadin-checkbox>
                    </div>
                `
                )
            }
    </div>

    <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"> 

        ${Object.values(VisibilityFilters).map( 
            filter => html`
            <vaadin-radio-button value="${filter}">
                ${filter}
            </vaadin-radio-button>`
        )}
    </vaadin-radio-group>
    <vaadin-button
        @click="${this.clearCompleted}"> 
            Clear completed
    </vaadin-button>
    <div class="external-css-class">External css content</div>

    <button class=${classMap(this.classes)} style=${styleMap(this.styles)} @click="${this.changeClass}">
      ${this.buttonname}
    </button>
   
    <div class="display-star">
        <h3>Star Rating</h3>
        <span class="fa fa-star ${classMap(this.checked1)}" @click="${ e => this.starClick1(this.isDone)}"></span>
        <span class="fa fa-star ${classMap(this.checked2)}" @click="${ e => this.starClick2(this.isDone)}"></span>
        <span class="fa fa-star ${classMap(this.checked3)}" @click="${ e => this.starClick3(this.isDone)}"></span>
        <span class="fa fa-star ${classMap(this.checked4)}" @click="${ e => this.starClick4(this.isDone)}"></span>
        <span class="fa fa-star ${classMap(this.checked5)}" @click="${ e => this.starClick5(this.isDone)}"></span>
    </div>
    
    
    <div class="star-with-checkbox">
        Star Rating with Ckeckbox
        <div class="display-star">
            <h3>Star Rating</h3>
            <span class="fa fa-star ${classMap(this.checked)}"></span>
            <span class="fa fa-star ${classMap(this.checked21)}"></span>
            <span class="fa fa-star ${classMap(this.checked31)}"></span>
            <span class="fa fa-star ${classMap(this.checked41)}"></span>
            <span class="fa fa-star ${classMap(this.checked51)}"></span>
        </div>
        '
        ${this.noOfStars.map(
            star => html`
            <div>${star}. <input type="checkbox" id="check1" name="check1" .value="${this.isCheck1}" @change="${ e => this.checkboxEvent(star, this.isCheck1)}"></div>
            `
            )
        }   
    </div>
    `;
}
checkboxEvent(star, e) {
    this.isCheck1 = !this.isCheck1;
    if(this.isCheck1) {
        if(star === '1') {
            this.checked = { checked: true };
        }else if(star === '2') {
            this.checked = { checked: true };
            this.checked21 = { checked: true };
        }else if(star === '3') {
            this.checked = { checked: true };
            this.checked21 = { checked: true };
            this.checked31 = { checked: true };
        }else if(star === '4') {
            this.checked = { checked: true };
            this.checked21 = { checked: true };
            this.checked31 = { checked: true };
            this.checked41 = { checked: true };
        }else if(star === '5') {
            this.checked = { checked: true };
            this.checked21 = { checked: true };
            this.checked31 = { checked: true };
            this.checked41 = { checked: true };
            this.checked51 = { checked: true };
        }
    }else {
        this.checked = { checked: false };
        this.checked21 = { checked: false };
        this.checked31 = { checked: false };
        this.checked41 = { checked: false };
        this.checked51 = { checked: false };
    }
}

starClick1(e) {
    this.isDone = !this.isDone;
    if(this.isDone) {
        this.checked1 = { checked: true };
    }else {
        this.makeAllStarFalse();
    }
}
starClick2(e) {
    this.isDone = !this.isDone;
    if(this.isDone) {
        this.checked1 = { checked: true };
        this.checked2 = { checked: true };
    }else {
        this.makeAllStarFalse();
    }
}
starClick3(e) {
    this.isDone = !this.isDone;
    if(this.isDone) {
        this.checked1 = { checked: true };
        this.checked2 = { checked: true };
        this.checked3 = { checked: true };

    }else {
        this.makeAllStarFalse();
    }
}
starClick4(e) {
    this.isDone = !this.isDone;
    if(this.isDone) {
        this.checked1 = { checked: true };
        this.checked2 = { checked: true };
        this.checked3 = { checked: true };
        this.checked4 = { checked: true };

    }else {
        this.makeAllStarFalse();

    }
}
starClick5(e) {
    this.isDone = !this.isDone;
    if(this.isDone) {
        this.checked1 = { checked: true };
        this.checked2 = { checked: true };
        this.checked3 = { checked: true };
        this.checked4 = { checked: true };
        this.checked5 = { checked: true };

    }else {
    this.makeAllStarFalse();
    }
}
makeAllStarFalse() {
    this.checked1 = { checked: false };
    this.checked2 = { checked: false };
    this.checked3 = { checked: false };
    this.checked4 = { checked: false };
    this.checked5 = { checked: false };
}
addTodo() {
    if (this.task) {
    this.todos = [...this.todos, { 
        task: this.task,
        complete: false
    }];
    this.task = ''; 
    }
}

    shortcutListener(e) {
        if (e.key === 'Enter') { 
        this.addTodo();
        }
    }

    updateTask(e) {
        this.task = e.target.value; 
    }

    updateTodoStatus(updatedTodo, complete) {
        this.todos = this.todos.map(todo =>
          updatedTodo === todo ? { ...updatedTodo, complete } : todo
        );
    }

    filterChanged(e) { 
        this.filter = e.target.value;
      }
    
    clearCompleted() { 
        this.todos = this.todos.filter(todo => !todo.complete);
    }

    applyFilter(todos) { 
        switch (this.filter) {
            case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.complete);
            case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.complete);
            default:
            return todos;
        }
    }
      createRenderRoot() {
        return this;
    }
}

customElements.define('todo-view', TodoView); //

// import { LitElement, html, css, unsafeCSS } from 'lit-element';

// const mainColor = css`red`;

// class TodoView extends LitElement {
//   static get styles() {
//     return css`
//       .first-imp { color: ${unsafeCSS(mainColor)} }
//     `;
//   }
//   render() {
//     return html`
//     <link type="text/css" href="./todo-view.css">
//     <button>a button</button>
//     <div class="data-data">a div</div>

//     <div class="first-imp">Some content in a div</div>
//     `;
//   }
// }

// customElements.define('todo-view', TodoView);