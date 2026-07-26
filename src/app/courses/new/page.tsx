"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

type CourseFormData = {
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: FileList;
};

export default function CreateCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>();

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      
      if (data.thumbnail && data.thumbnail.length > 0) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      await axios.post("http://localhost:6969/api/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Create New Course</h1>
            <p className="text-[var(--color-text-secondary)] mt-1">Fill in the details below to publish a new course.</p>
          </div>
          <button 
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] hover:bg-[var(--color-background-secondary)]"
          >
            Cancel
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-sm overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                Course Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
                placeholder="e.g. Advanced TypeScript Patterns"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-[var(--color-text-primary)]"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                Course Description
              </label>
              <textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                rows={4}
                placeholder="Describe what students will learn..."
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-[var(--color-text-primary)] resize-none"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                  Price ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-[var(--color-text-secondary)] sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })}
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-7 pr-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-[var(--color-text-primary)]"
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                  Category
                </label>
                <select
                  id="category"
                  {...register("category", { required: "Category is required" })}
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-[var(--color-text-primary)] bg-white"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="programming">Programming & Tech</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                Course Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("thumbnail", { required: "Thumbnail is required" })}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)] bg-white"
              />
              {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>}
            </div>
          </div>
          
          <div className="px-6 py-4 bg-[var(--color-background-secondary)] border-t border-[var(--color-border)] flex items-center justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-md)] hover:bg-[#0284c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Course"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
