import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getItemsFromCart = async (req, res) => {
   const { userId } = req.params;

   try {
      const cart = await prisma.cart.findFirst({
         where: { userId: parseInt(userId) },
         include: {
            items: {
               include: {
                  item: true,
               },
            },
         },
      });

      if (!cart) {
         return res.status(404).json({ error: 'Cart not found for this user.' });
      }

      const itemsInCart = cart.items.map(cartItem => ({
         id: cartItem.item.id,
         name: cartItem.item.name,
         price: cartItem.item.price,
         quantity: cartItem.quantity,
         total: cartItem.quantity * cartItem.item.price, 
      }));

      return res.status(200).json({
         message: 'Items in cart retrieved successfully.',
         items: itemsInCart,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while fetching items from cart.' });
   }
};