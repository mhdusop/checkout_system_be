import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteItemFromCart = async (req, res) => {
   const { userId, itemId } = req.params; 
   const { quantity } = req.body; 

   if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0.' });
   }

   try {
      const cart = await prisma.cart.findFirst({
         where: { userId: parseInt(userId) },
         include: {
            items: true, 
         },
      });

      if (!cart) {
         return res.status(404).json({ error: 'Cart not found for this user.' });
      }

      const cartItem = await prisma.cartItem.findFirst({
         where: {
            cartId: cart.id,
            itemId: parseInt(itemId),
         },
      });

      if (!cartItem) {
         return res.status(404).json({ error: 'Item not found in cart.' });
      }

      if (cartItem.quantity <= quantity) {
         await prisma.cartItem.delete({
            where: { id: cartItem.id },
         });
      } else {
         await prisma.cartItem.update({
            where: { id: cartItem.id },
            data: {
               quantity: cartItem.quantity - quantity,
            },
         });
      }

      return res.status(200).json({
         message: 'Item successfully removed from cart.',
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while removing item from cart.' });
   }
};
