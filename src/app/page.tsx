import DashboardLayout from "@/components/DashboardLayout";

export default function Home() {
  // Dummy data for now, could be fetched via react-query
  const stats = [
    { label: "Total Enrolled Students", value: "1,248" },
    { label: "Total Earnings", value: "$12,450" },
    { label: "Active Courses", value: "12" },
    { label: "Average Rating", value: "4.8" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Dashboard Overview</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Welcome back, Instructor!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-sm">
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">{stat.label}</p>
              <p className="text-3xl font-bold text-[var(--color-text-primary)] mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-[var(--color-border)] last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center shrink-0">
                    <span className="text-[var(--color-primary)] font-medium">S{i}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">New student enrolled in "Advanced React Patterns"</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">{i} hour(s) ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <a href="/courses/new" className="flex flex-col items-center justify-center p-6 bg-[var(--color-background-secondary)] rounded-[var(--radius-md)] hover:bg-white hover:border-[var(--color-primary)] border border-transparent transition-all group">
                <div className="w-12 h-12 rounded-full bg-white text-[var(--color-primary)] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">Create Course</span>
              </a>
              <a href="/students" className="flex flex-col items-center justify-center p-6 bg-[var(--color-background-secondary)] rounded-[var(--radius-md)] hover:bg-white hover:border-[var(--color-primary)] border border-transparent transition-all group">
                <div className="w-12 h-12 rounded-full bg-white text-[var(--color-secondary)] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">View Students</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
