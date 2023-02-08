"use strict";
import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount, harry01Count, harry02Count, harry03Count) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.harry01Count = harry01Count;
    this.harry02Count = harry02Count;
    this.harry03Count = harry03Count;
    this.field = document.querySelector(".game_field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/snitch.png");
    this._addItem("bug", this.bugCount, "img/harry01.png");
    this._addItem("harry01", this.harry01Count, "img/harry02.png");
    this._addItem("harry02", this.harry02Count, "img/harry03.png");
    this._addItem("harry03", this.harry03Count, "img/harry04.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug", ".harry01", ".harry02", ".harry03")) {
      this.onItemClick &&
        this.onItemClick("bug", "harry01", "harry02", "harry03");
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
