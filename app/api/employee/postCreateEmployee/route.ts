import { EmployeeCreateDTO } from "@/app/types/employeeDTO";
import { db } from "@/db";
import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body: EmployeeCreateDTO = await request.json();
    console.log(body);
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      hiredate,
      countryid,
      salary,
      commissionpct,
      departmentid,
    } = body;
    // ดึงข้อมูลผู้ใช้ทั้งหมดจากฐานข้อมูล
    if (!firstname || !lastname || !email || !phonenumber) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await db
      .select()
      .from(employees)
      .where(eq(employees.email, email));

    if (existingUser.length > 0) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    const newUser = await db
      .insert(employees)
      .values({
        first_name: firstname,
        last_name: lastname,
        email,
        phone_number: phonenumber,
        hire_date: hiredate ?? new Date(),
        country_id: countryid,
        salary,
        commission_pct: commissionpct,
        department_id: departmentid,
      })
      .returning();
    return Response.json(newUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
