import express from "express"

const router = express.Router();


// INDEX
router.get("/", blogController.index);

export default router;