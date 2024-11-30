import { NextResponse } from "next/server";
import db from "@/app/mockData/db.json";
import { Product } from "@/app/models/productsModel";

// Explicitly type `addtocart` as an array of `Product`
interface Database {
  addtocart: Product[];
}

// Ensure `db` matches the `Database` structure
const database: Database = db as Database;

// Utility function to add CORS headers
function addCORSHeaders(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

// Handle OPTIONS preflight request
export async function OPTIONS(): Promise<Response> {
  const response = new Response(null, { status: 204 });
  return addCORSHeaders(response);
}

// GET Method: Fetch all cart items
export async function GET(): Promise<Response> {
  const response = NextResponse.json(database.addtocart);
  return addCORSHeaders(response);
}

// POST Method: Add an item to the cart
export async function POST(request: Request): Promise<Response> {
  const newItem: Product = await request.json();

  // Add the new item to the database
  database.addtocart.push(newItem);

  console.log("Item added to cart:", newItem);
  const response = NextResponse.json(newItem, { status: 201 });
  return addCORSHeaders(response);
}

// DELETE Method: Delete a single item or all items
export async function DELETE(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (productId) {
      // Delete a specific product by ID
      database.addtocart = database.addtocart.filter(
        (item: Product) => item.id.toString() !== productId
      );

      console.log(`Product with ID ${productId} removed.`);
      const response = NextResponse.json(
        { message: `Product with ID ${productId} removed.` },
        { status: 200 }
      );
      return addCORSHeaders(response);
    } else {
      // Clear the cart
      database.addtocart = [];
      console.log("All products removed from cart.");
      const response = NextResponse.json(
        { message: "All products removed from cart." },
        { status: 200 }
      );
      return addCORSHeaders(response);
    }
  } catch (error) {
    console.error("Error in DELETE handler:", error);

    // Safely handle error and enforce typing
    const response = NextResponse.json(
      { error: "Failed to process DELETE request" },
      { status: 500 }
    );
    return addCORSHeaders(response);
  }
}
