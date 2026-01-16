import express from "express"
import tagsController from "../controllers/tagsController.js"

const router = express.Router();

// INDEX
router.get("/", tagsController.index);

// SHOW
router.get("/:id",tagsController.show);

// STORE
router.post("/", tagsController.store);

// MODIFY
router.put("/:id", tagsController.update);

// UPDATE
router.patch("/:id", tagsController.modify);

// DESTROY
router.delete("/:id", tagsController.destroy);

export default router;