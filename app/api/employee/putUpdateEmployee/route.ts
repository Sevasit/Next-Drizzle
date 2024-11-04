import { EmployeeUpdateDTO } from "@/app/types/employeeDTO";
import { db } from "@/db";
import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  try {
    const body: EmployeeUpdateDTO = await request.json();
    console.log(body);
    const {
      id,
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

    if (!id || !firstname || !lastname || !email || !phonenumber) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [existingUser] = await db
      .select()
      .from(employees)
      .where(eq(employees.employee_id, id));

    if (!existingUser) {
      return Response.json(
        { error: "`Employee ID` not found" },
        { status: 400 }
      );
    }

    existingUser.first_name = firstname;
    existingUser.last_name = lastname;
    existingUser.email = email;
    existingUser.phone_number = phonenumber;
    existingUser.hire_date = hiredate ?? new Date();
    if (countryid) existingUser.country_id = countryid;
    if (salary) existingUser.salary = salary;
    if (commissionpct) existingUser.commission_pct = commissionpct;
    if (departmentid) existingUser.department_id = departmentid;

    const currentUser = await db
      .update(employees)
      .set(existingUser)
      .where(eq(employees.employee_id, id))
      .returning();
    return Response.json(currentUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
