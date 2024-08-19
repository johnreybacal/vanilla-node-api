import { Router } from "@/routers/router";
import { userController } from "./controller";

const router = new Router("users");

router.get("/", userController.index);
router.get("/longDelay", userController.longDelay);
router.get("/:id", userController.show);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

export default router;
