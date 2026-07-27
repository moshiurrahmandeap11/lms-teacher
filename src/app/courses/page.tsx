"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { MoreHorizontal, Plus, Users, PlayCircle } from "lucide-react";

// Mock data
const COURSES = [
  {
    id: "c1",
    title: "Italian For Beginners",
    thumbnail: "https://images.unsplash.com/photo-1516483638261-f4dafaf00bc6?q=80&w=300&auto=format&fit=crop",
    students: 124,
    status: "Published",
    modules: 4,
    earnings: "$2,400"
  },
  {
    id: "c2",
    title: "Advanced React Patterns",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=300&auto=format&fit=crop",
    students: 85,
    status: "Draft",
    modules: 2,
    earnings: "$0"
  },
  {
    id: "c3",
    title: "IELTS Academic Mastery",
    thumbnail: "https://images.unsplash.com/photo-1546410531-b44c6883a9d9?q=80&w=300&auto=format&fit=crop",
    students: 312,
    status: "Published",
    modules: 12,
    earnings: "$8,950"
  }
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(COURSES);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">My Courses</h1>
          <p className="text-[#64748b] mt-1 text-sm">Manage your course catalog and curriculum.</p>
        </div>
        <button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium px-4 py-2 rounded-lg shadow-sm transition flex items-center">
          <Plus className="w-5 h-5 mr-1" /> Create New Course
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="p-4 font-semibold text-xs text-[#64748b] uppercase tracking-wider">Course Details</th>
              <th className="p-4 font-semibold text-xs text-[#64748b] uppercase tracking-wider">Status</th>
              <th className="p-4 font-semibold text-xs text-[#64748b] uppercase tracking-wider">Students</th>
              <th className="p-4 font-semibold text-xs text-[#64748b] uppercase tracking-wider">Earnings</th>
              <th className="p-4 font-semibold text-xs text-[#64748b] uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img src={course.thumbnail} alt={course.title} className="w-16 h-12 object-cover rounded shadow-sm" />
                    <div>
                      <h3 className="text-sm font-bold text-[#0f172a]">{course.title}</h3>
                      <p className="text-xs text-[#64748b] mt-0.5 flex items-center gap-2">
                        <span className="flex items-center"><PlayCircle className="w-3 h-3 mr-1" /> {course.modules} Modules</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {course.status === "Published" ? (
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">Published</span>
                  ) : (
                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded">Draft</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center text-sm font-medium text-[#475569]">
                    <Users className="w-4 h-4 mr-2 text-[#94a3b8]" /> {course.students}
                  </div>
                </td>
                <td className="p-4 text-sm font-bold text-[#0ea5e9]">
                  {course.earnings}
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#0f172a] rounded transition">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
