import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/client";

//TODO: ADD BOOKING DATE, REASONs
//TODO: BOOKING WITHOUT LOGIN

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const { address, ambulance_name, name, phone } = body;
  console.log(body);
  const session = await getServerSession(authOptions);
  if (session != null) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    });
    const user_id = user?.id as string;
    console.log(user);
    const ambulance = await prisma.ambulance.findFirst({
      where: {
        name: body.ambulance_name,
      },
    });
    console.log(ambulance);
    const ambulance_id = ambulance?.id as string;
    console.log(ambulance_id);
    const new_booking = await prisma.booking.create({
      data: {
        ambulanceId: ambulance_id,
        userId: user_id,
        address: address,
      },
    });
    console.log(new_booking);
    return NextResponse.json({ message: "Success" });
  }
  return NextResponse.json({ message: "Failed" });
}
