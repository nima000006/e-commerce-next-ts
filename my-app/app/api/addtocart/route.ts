import { NextResponse } from "next/server";
import db from "@/app/mockData/db.json";
import { Product } from "@/app/models/productsModel";
export async function GET() {
  return NextResponse.json(db.addtocart);
}

export async function POST(request: Request) {
  const newItem: Product = await request.json(); // Type the newItem as a Product

  // Make sure addtocart is typed correctly
  const updatedAddToCart: Product[] = db.addtocart;

  updatedAddToCart.push(newItem);

  // You can use a database or persistent storage here
  console.log("Item added to cart:", newItem);

  return NextResponse.json(newItem, { status: 201 });
}