"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "My Courses", href: "/courses" },
    { name: "Create Course", href: "/courses/new" },
    { name: "Students", href: "/students" },
    { name: "Earnings", href: "/earnings" },
  ];

  return (
    <div className="flex h-screen bg-[var(--color-background-secondary)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[var(--color-border)] hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
          <span className="text-xl font-bold text-[var(--color-primary)]">
            Academic<span className="text-[var(--color-text-primary)]">Panel</span>
          </span>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-[var(--radius-md)] transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center font-bold">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">Teacher Name</span>
              <Link href="/login" className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-[var(--color-border)] flex items-center justify-between px-6 md:hidden">
          <span className="text-lg font-bold text-[var(--color-primary)]">AcademicPanel</span>
          <button className="text-[var(--color-text-secondary)]">
            {/* Mobile menu icon placeholder */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
