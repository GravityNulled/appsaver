import { NextResponse } from "next/server";
import prisma from "../../../utils/client";

export async function GET(request: Request) {
  try {
    const hospitals = await prisma.hospital.findMany();
    return NextResponse.json(hospitals);
  } catch (err: any) {
    return NextResponse.error;
  }
}
