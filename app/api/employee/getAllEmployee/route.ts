import { db } from "@/db";
import { employees } from "@/db/schema";

export async function GET() {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    const allUsers = await db.select().from(employees);
    // ส่งข้อมูลผู้ใช้กลับเป็น JSON response
    return Response.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
