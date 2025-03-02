import { Router } from "express";
const router = Router();
import AuthController from "../controllers/AuthController.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import ChatGroupUserController from "../controllers/ChatGroupUserController.js";
import ChatsController from "../controllers/ChatsController.js";

// auth routes
router.post("/auth/login", AuthController.login);

// chat group routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

// chat group user
router.get("/chat-group-user", ChatGroupUserController.index);
router.post("/chat-group-user", ChatGroupUserController.store);

// chats
router.get("/chats/:groupId", ChatsController.index);

export default router;
