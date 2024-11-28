import { NextResponse } from "next/server";
import db from "@/app/mockData/db.json";
import { Product } from "@/app/models/productsModel";

// GET Method: Fetch all cart items
export async function GET() {
  return NextResponse.json(db.addtocart);
}

// POST Method: Add an item to the cart
export async function POST(request: Request) {
  const newItem: Product = await request.json(); // Type the newItem as a Product

  // Push the new item into the addtocart array
  const updatedAddToCart: Product[] = db.addtocart;
  updatedAddToCart.push(newItem);

  // This is temporary. Replace with actual database or persistent storage
  console.log("Item added to cart:", newItem);

  return NextResponse.json(newItem, { status: 201 });
}

// DELETE Method: Delete a single item or all items
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id"); // Get the product ID from query params

  if (productId) {
    // Delete a specific product by ID
    const updatedAddToCart = db.addtocart.filter(
      (item: Product) => item.id.toString() !== productId
    );

    db.addtocart = updatedAddToCart; // Update the in-memory database

    console.log(`Product with ID ${productId} removed.`);
    return NextResponse.json(
      { message: `Product with ID ${productId} removed.` },
      { status: 200 }
    );
  } else {
    // Delete all items if no ID is provided
    db.addtocart = []; // Clear the cart

    console.log("All products removed from cart.");
    return NextResponse.json(
      { message: "All products removed from cart." },
      { status: 200 }
    );
  }
}
