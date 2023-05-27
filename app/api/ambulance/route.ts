import prisma from "@/utils/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const ambulances = await prisma.ambulance.findMany({
      where: {
        availability: "available",
      },
    });
    return NextResponse.json(ambulances, { status: 200 });
  } catch (err: any) {
    return NextResponse.error;
  }
}
