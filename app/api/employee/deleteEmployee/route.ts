import { EmployeeCreateDTO } from "@/app/types/employeeDTO";
import { db } from "@/db";
import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const idParams = request.nextUrl.searchParams.get("id");
    if (!idParams) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const id = parseInt(idParams);
    const existEmployee = await db
      .select()
      .from(employees)
      .where(eq(employees.employee_id, id))
      .limit(1);
    if (existEmployee.length === 0) {
      return Response.json({ error: "Employee not found" }, { status: 404 });
    }
    await db.delete(employees).where(eq(employees.employee_id, id));
    return Response.json({ message: "Employee deleted" });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
