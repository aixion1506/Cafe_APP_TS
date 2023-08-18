import { v4 as uuidv4 } from "uuid";
import { CoffeeMenu } from "../db/models/CoffeeMenu";
import Storage from "../db/Storage";

class CoffeeMenuService {
  storage;
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * @param {string} name
   * @param {number} price
   * @param {boolean} ice
   * @param {boolean} hot
   */
  addCoffeeMenu({ name, price, ice, hot }) {
    const coffeeMenu = new CoffeeMenu({ id: uuidv4(), name, price, ice, hot });
    return this.storage.create(coffeeMenu);
  }

  getMenu(id) {
    return this.storage.get(id);
  }

  getMenus() {
    const menus = this.storage.getAll();
    if (menus.length === 0) {
      throw new Error(`아직 카페가 오픈 전이에요. 잠시 후 다시 주문해주세요.`);
    }

    return menus;
  }
}

export const coffeeMenuService = new CoffeeMenuService(new Storage());