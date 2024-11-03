import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const employees = pgTable("employees", {
  employee_id: serial("employee_id").primaryKey(),
  first_name: varchar("first_name", { length: 20 }).notNull(),
  last_name: varchar("last_name", { length: 25 }).notNull(),
  email: varchar("email", { length: 25 }).notNull(),
  phone_number: varchar("phone_number", { length: 20 }),
  hire_date: timestamp("hire_date").notNull(),
  country_id: varchar("country_id", { length: 2 }),
  salary: varchar("salary", { length: 8 }),
  commission_pct: varchar("commission_pct", { length: 2 }),
  department_id: varchar("department_id", { length: 2 }),
});
