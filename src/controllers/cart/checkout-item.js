import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkoutItem = async (req, res) => {
   const { userId } = req.params; 
   const { items } = req.body; 

   if (!items || items.length === 0) {
      return res.status(400).json({ error: 'At least one item is required for checkout.' });
   }

   try {
      
      let cart = await prisma.cart.findFirst({
         where: { userId: parseInt(userId) },
      });

      if (!cart) {
         
         cart = await prisma.cart.create({
            data: {
               name: 'Default Cart', 
               userId: parseInt(userId),
            },
         });
      }
      
      for (let itemData of items) {
         const { itemId, quantity } = itemData;
         
         let cartItem = await prisma.cartItem.findFirst({
            where: {
               cartId: cart.id,
               itemId: parseInt(itemId),
            },
         });

         if (cartItem) {
            
            await prisma.cartItem.update({
               where: { id: cartItem.id },
               data: {
                  quantity: cartItem.quantity + quantity, 
               },
            });
         } else {
            
            await prisma.cartItem.create({
               data: {
                  cartId: cart.id,
                  itemId: parseInt(itemId),
                  quantity: quantity,
               },
            });
         }
      }

      return res.status(200).json({
         message: 'Items successfully added to the cart.',
         cartId: cart.id,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred during checkout.' });
   }
};