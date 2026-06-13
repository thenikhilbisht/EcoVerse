export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-eco-black">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 glass-dark border-b border-[rgba(0,255,136,0.1)]">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="w-28 h-6 rounded-lg bg-[rgba(0,255,136,0.1)] animate-pulse" />
          <div className="hidden lg:flex gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-20 h-4 rounded-md bg-[rgba(255,255,255,0.06)] animate-pulse" />
            ))}
          </div>
          <div className="w-8 h-8 rounded-xl bg-[rgba(0,255,136,0.1)] animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="w-24 h-5 rounded-full bg-[rgba(0,255,136,0.1)] animate-pulse mb-3" />
          <div className="w-72 h-10 rounded-xl bg-[rgba(255,255,255,0.06)] animate-pulse mb-2" />
          <div className="w-48 h-4 rounded-lg bg-[rgba(255,255,255,0.04)] animate-pulse" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="stat-card">
              <div className="w-10 h-10 rounded-xl bg-[rgba(0,255,136,0.1)] animate-pulse mb-3" />
              <div className="w-24 h-7 rounded-lg bg-[rgba(255,255,255,0.08)] animate-pulse mb-1" />
              <div className="w-20 h-3 rounded-md bg-[rgba(255,255,255,0.04)] animate-pulse" />
            </div>
          ))}
        </div>

        {/* Charts row skeleton */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          <div className="lg:col-span-2 glass-card rounded-2xl p-5">
            <div className="w-40 h-6 rounded-lg bg-[rgba(255,255,255,0.06)] animate-pulse mb-5" />
            <div className="h-48 rounded-xl bg-[rgba(0,255,136,0.04)] animate-pulse" />
          </div>
          <div className="glass-card rounded-2xl p-5">
            <div className="w-28 h-6 rounded-lg bg-[rgba(255,255,255,0.06)] animate-pulse mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-[rgba(0,255,136,0.04)] animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row skeleton */}
        <div className="grid lg:grid-cols-2 gap-5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <div className="w-36 h-5 rounded-lg bg-[rgba(255,255,255,0.06)] animate-pulse mb-4" />
              <div className="grid grid-cols-5 gap-1.5">
                {[...Array(30)].map((_, j) => (
                  <div key={j} className="aspect-square rounded-md bg-[rgba(255,255,255,0.06)] animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
