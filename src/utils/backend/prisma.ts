import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "~/server/db";

export const signUpSchema = z.object({
  email: z
    .string()
    .email(
      "Invalid Email. Please make sure you have typed in the correct email "
    ),
  username: z.string().nullable(),
  password: z.string().min(8, "Your password is too small"),
});
type SignUpFields = z.infer<typeof signUpSchema>;

// async function createUser({email, password, username}:SignUpFields ) {
//   // Check if the user already exists
//   z.parse
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existingUser) {
//     throw new Error('User already exists');
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create the user in the database
//   const newUser = await prisma.user.create({
//     data: {
//       email,
//       username,
//       password: hashedPassword,
//     },
//   });

//   return newUser;
// }
