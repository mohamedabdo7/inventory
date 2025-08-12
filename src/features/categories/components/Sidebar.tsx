import * as React from "react";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  } | null;
  onEdit: () => void;
};

const getInitials = (name?: string) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second || first || "U").toUpperCase();
};

export const Sidebar: React.FC<SidebarProps> = ({ user, onEdit }) => {
  const initials = getInitials(user?.name);

  return (
    <aside className="sticky top-6 rounded-2xl bg-white p-5 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg font-semibold text-gray-600">{initials}</span>
          )}
        </div>

        <div>
          <div className="text-base font-semibold text-gray-900">{user?.name || "User"}</div>
          <div className="text-xs text-gray-500">{user?.email || "—"}</div>
        </div>
      </div>

      <div className="mt-5">
        <Button className="w-full" onClick={onEdit}>
          Edit profile
        </Button>
      </div>

      {/* You can add quick stats/links here later */}
      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span>Items</span>
          {/* This could be dynamic later */}
        </div>
        <div className="flex items-center justify-between">
          <span>Categories</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
