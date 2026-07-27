"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginTeacher(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://lms.moshiurrahman.online/api'}/auth/teacher/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { error: "Invalid credentials" };
    }

    const data = await res.json();
    
    if (data.data && data.data.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    } else {
      return { error: "Login failed: No token received" };
    }

  } catch (error) {
    return { error: "Something went wrong" };
  }

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}
