import is from "@sindresorhus/is";
import { Router } from "express";
import { coffeeMenuService } from "../services/CoffeeMenuService";

const menuRouter = Router();

menuRouter.get("/menus", async function (req, res, next) {
  try {
    const menus = coffeeMenuService.getMenus();
    res.status(200).send(menus);
  } catch (error) {
    next(error);
  }
});

menuRouter.post("/menus/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const menu = coffeeMenuService.addCoffeeMenu({
      name: req.body.name,
      price: req.body.price,
      ice: req.body.ice,
      hot: req.body.hot,
    });

    res.status(201).send(menu);
  } catch (error) {
    next(error);
  }
});

export { menuRouter };