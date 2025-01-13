import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createItem = async (req, res) => {
   const { name, quantity, price } = req.body;

   if (!name || !quantity || !price) {
      return res.status(400).json({ error: 'Name, quantity, and price are required.' });
   }

   try {
      const newItem = await prisma.item.create({
         data: {
            name,
            quantity,
            price,
         },
      });

      return res.status(201).json({
         message: 'Item created successfully',
         item: newItem,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the item.' });
   }
};
