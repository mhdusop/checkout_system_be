import express from 'express';
import { checkoutItem } from '../controllers/cart/checkout-item.js'; 
import { getItemsFromCart } from '../controllers/cart/get-item.js';
import { deleteItemFromCart } from '../controllers/cart/delete-item.js';
import { authenticate } from '../middlewares/auth-middleware.js';

export const cartRouter = express.Router();

cartRouter.get('/:userId/items', authenticate, getItemsFromCart)
cartRouter.post('/:userId/checkout', checkoutItem);
cartRouter.delete('/:userId/item/:itemId', deleteItemFromCart)