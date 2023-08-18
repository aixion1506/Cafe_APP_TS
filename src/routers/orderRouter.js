import is from "@sindresorhus/is";
import { Router } from "express";
import { orderService } from "../services/OrderService";

const orderRouter = Router();

orderRouter.get("/orders", async function (req, res, next) {
  try {
    const orders = orderService.getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/orders/:id", async function (req, res, next) {
  try {
    const coffee = orderService.getCoffee(req.params.id);
    res.send(`주문하신 커피는 ${coffee.name}입니다. 잠시만 기다려주세요`);
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/orders/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const order = orderService.orderCoffee(req.body.name, req.body.ice);
    res.status(201).send(order);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export { orderRouter };