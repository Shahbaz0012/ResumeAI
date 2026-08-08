import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  createDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/document.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  createDocument
);

router.get(
  "/",
  authenticate,
  getDocuments
);

router.delete(
  "/:id",
  authenticate,
  deleteDocument
);

export default router;