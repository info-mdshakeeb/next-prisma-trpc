export function SidebarLoader() {
  return (
    <aside className="w-full md:w-64 bg-background border-r md:h-[calc(100svh-3.5rem)] absolute z-10">
      <div className="flex h-full flex-col">
        {/* Sidebar Navigation Groups */}
        <div className="flex-1 p-4 space-y-4">
          {/* Nav Groups */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
              <div className="space-y-1">
                {[...Array(2)].map((_, j) => (
                  <div
                    key={j}
                    className="h-8 w-full rounded bg-muted animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
          {/* Secondary Nav */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-8 w-full rounded bg-muted animate-pulse" />
          </div>
        </div>
        {/* Sidebar Footer (User) */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-3 w-32 rounded bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
