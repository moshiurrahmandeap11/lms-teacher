"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "@/lib/axios";

export async function loginTeacher(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axiosInstance.post("/auth/teacher/login", {
      email,
      password,
    });

    const data = res.data;
    
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

  } catch (error: any) {
    if (error.response) {
      return { error: "Invalid credentials" };
    }
    return { error: "Something went wrong" };
  }

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}
