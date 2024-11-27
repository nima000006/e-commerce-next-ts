import { NextResponse } from "next/server";
import db from "@/app/mockData/db.json";

export async function GET() {
  return NextResponse.json(db.language);
}
