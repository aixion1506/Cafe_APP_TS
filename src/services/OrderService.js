import { v4 as uuidv4 } from "uuid";
import { Order } from "../db/models/Order";
import { coffeeMenuService } from "./CoffeeMenuService";
import Storage from "../db/Storage";

export class OrderService {
  storage;
  coffeeMenuService;
  constructor(storage, coffeeMenuService) {
    this.storage = storage;
    this.coffeeMenuService = coffeeMenuService;
  }

  /**
   * @param {string} name
   * @param {boolean} ice
   * @return { id, name, price, ice } -> Coffee Model
   */
  orderCoffee(name, ice) {
    const coffeeMenus = this.coffeeMenuService.getMenus();
    const coffeeMenu = coffeeMenus.find((menu) => menu.name === name);
    if (!coffeeMenu) {
      throw new Error(
        `메뉴에 없는 커피입니다. ${coffeeMenus.map(
          (menu) => menu.name
        )}에서 골라주세요.`
      );
    }

    if ((ice && !coffeeMenu.ice) || (!ice && !coffeeMenu.hot)) {
      throw new Error(
        `이 메뉴는 ${ice ? "ice" : "hot"}(으)로 주문하실 수 없어요`
      );
    }

    const order = this.storage.create(
      new Order({
        id: uuidv4(),
        name: coffeeMenu.name,
        price: coffeeMenu.price,
        ice,
      })
    );

    return order;
  }

  getCoffee(id) {
    return this.storage.get(id);
  }

  getAllOrders() {
    const orders = this.storage.getAll();
    if (orders.length === 0) return "주문 내역이 없습니다";
    return orders;
  }
}

export const orderService = new OrderService(new Storage(), coffeeMenuService);