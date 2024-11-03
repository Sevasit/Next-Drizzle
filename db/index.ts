// นำเข้า function drizzle จาก drizzle-orm สำหรับ PostgreSQL
import { drizzle } from "drizzle-orm/node-postgres";
// นำเข้า class Pool จาก pg สำหรับการจัดการการเชื่อมต่อฐานข้อมูล
import { Pool } from "pg";

// สร้าง pool การเชื่อมต่อฐานข้อมูลใหม่
const pool = new Pool({
  // ใช้ connection string จาก environment variable (ที่เก็บใน .env)
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
});

console.log("Database URL:", process.env.NEXT_PUBLIC_DATABASE_URL);

// สร้างและส่งออก Object ฐานข้อมูลที่ใช้ drizzle กับ pool ที่สร้างขึ้น
export const db = drizzle(pool);
