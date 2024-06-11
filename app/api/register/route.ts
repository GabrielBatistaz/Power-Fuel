
import prisma from "@/bibliotecas/prismadb";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    const body = await request.json();
    const { name, email, password } = body;
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword,
        },
    });

    return NextResponse.json(user);
}