import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req, res) => {
   const { fullname, username, email, password, confirmPassword } = req.body;
console.log({fullname, username, email, password, confirmPassword});


   if (!fullname || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
   }

   if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
   }

   try {
      const existingUser = await prisma.user.findUnique({
         where: { email },
      });

      if (existingUser) {
         return res.status(400).json({ error: 'Email already in use.' });
      }

      const existingUsername = await prisma.user.findUnique({
         where: { username },
      });

      if (existingUsername) {
         return res.status(400).json({ error: 'Username already taken.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
         data: {
            fullname,
            username,
            email,
            password: hashedPassword,
         },
      });
      res.status(201).json({ message: 'User registered successfully', data: user });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};