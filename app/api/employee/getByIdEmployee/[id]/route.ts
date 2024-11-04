import { db } from "@/db";
import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET({ params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const id = parseInt(params.id);
    const existEmployee = await db
      .select()
      .from(employees)
      .where(eq(employees.employee_id, id))
      .limit(1);
    if (existEmployee.length === 0) {
      return Response.json({ error: "Employee not found" }, { status: 404 });
    }
    return Response.json(existEmployee);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
