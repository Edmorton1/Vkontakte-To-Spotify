import WebsocketController from "@s/router/controllers/websocket-controller";
import { delay } from "@s/router/functions";
import { test_arr } from "@s/test_db";
import { Request, Response } from "express";

class TestController {
  processedItems = new Set(); // Храним обработанные элементы

  test = async (req: Request, res: Response) => {
    // res.json({ message: "Processing started" });

    while (true) {
      for (let item of test_arr) {
        if (!this.processedItems.has(item)) {
          console.log(item);
          this.processedItems.add(item);
        }
      }
      await delay(1000); // Проверяем новые элементы раз в секунду
    }
  };

  second = async (req: Request, res: Response) => {
    await delay(1000)
    test_arr.push('bgbgb')
    await delay(1000)
    test_arr.push('nhghgh')
    await delay(1000)
    test_arr.push('hghgh')
    await delay(1000)
    test_arr.push('asdaghfgsdsad')
  }
}

export default new TestController();
