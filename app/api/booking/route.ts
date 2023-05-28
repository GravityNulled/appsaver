import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/client";

//TODO: ADD BOOKING DATE, REASONs

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const { address, ambulance_name, name, phone } = body;
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
    const ambulance_id = ambulance?.id as string;
    const new_booking = await prisma.booking.create({
      data: {
        ambulanceId: ambulance_id,
        userId: user_id,
        address: address,
      },
    });
    return NextResponse.json({ message: "Success" });
  }
  const ambulance = await prisma.ambulance.findFirst({
    where: {
      name: body.ambulance_name,
    },
  });
  const ambulance_id = ambulance?.id as string;

  const new_booking = await prisma.booking.create({
    data: {
      ambulanceId: ambulance_id,
      userId: "cli7e90k90000d2gcifclz0ei",
      address: name + " " + address + " " + phone,
    },
  });
  return NextResponse.json({ message: "Guest booked Success" });
}

export async function GET(request: Request, response: Response) {
  const session = await getServerSession(authOptions);
  if (session != null) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    });
    const user_id = user?.id as string;
    const bookings = await prisma.booking.findMany({
      where: {
        userId: user_id,
      },
    });
    return NextResponse.json(bookings);
  }
  return NextResponse.json({ message: "Failed" });
}
