import express from 'express';
import { createItem } from "../controllers/item/create.js"

export const itemRouter = express.Router();

itemRouter.post('/create', createItem);