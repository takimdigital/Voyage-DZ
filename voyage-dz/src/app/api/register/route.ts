import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { agencyName, city, phone, email, password } = await req.json();

    if (!agencyName || !city || !phone || !email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return new NextResponse("User with this email already exists", {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.$transaction(async (prisma: Prisma.TransactionClient) => {
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "agency",
        },
      });

      await prisma.agency.create({
        data: {
          name: agencyName,
          city,
          phone,
          email,
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });

      return newUser;
    });

    return NextResponse.json({
      message: "Agency and user created successfully.",
      user: {
        id: result.id,
        email: result.email,
        role: result.role,
      },
    });
  } catch (error) {
    console.error("[REGISTER_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
