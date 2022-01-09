import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter
  .route("/videos/:id([0-9a-f]{24})/comment")
  .delete(deleteComment)
  .post(createComment);
export default apiRouter;
