import express from "express"
import blogController from "../controllers/blogcontroller.js";

const router = express.Router();


// INDEX
router.get("/", blogController.index);

// SHOW
router.get("/:id/details", blogController.show);

// STORE
router.post("/", blogController.store);

// MODIFY
router.put("/id", blogController.modify);

// UPDATE
router.patch("/:id", blogController.update);

// DESTROY
router.delete("/:id", blogController.destroy);





export default router;