import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Permission {
  id: string;
  name: string;
  section: string;
  sub_section: string;
  display_order: number;
}

interface Permissions {
  [section: string]: {
    [subSection: string]: Permission[];
  };
}

interface Role {
  id: string;
  name: string;
  scope: string;
  permissions: Permissions;
}

interface Admin {
  id: string;
  first_name: string;
  last_name: string;
  image: string;
  title: string | null;
  code: string | null;
  phone_number: string;
  email: string;
  has_set_password: boolean;
  status: string;
  role_id: string | null;
  created_at: string;
  role?: Role;
}

interface AuthState {
  admin: Admin | null;
  token: string | null;
  isSuperAdmin: boolean;
  permissionNames: Set<string>;
  permissionIds: Record<string, Permission>;
  setAuth: (admin: Admin, token: string, permissions?: Permissions) => void;
  clearAuth: () => void;
  hasPermission: (name: string) => boolean;
  hasPermissionById: (id: string) => boolean;
  hasSectionPermission: (section: string) => boolean;
  hasSubSectionPermission: (section: string, subSection: string) => boolean;
  isScopeAllowed: (scope: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      isSuperAdmin: false,
      permissionNames: new Set(),
      permissionIds: {},
      setAuth: (admin, token, permissions) => {
        const isSuperAdmin = admin.email === "superadmin@gmail.com";
        const permissionNames = new Set<string>();
        const permissionIds: Record<string, Permission> = {};

        if (!isSuperAdmin) {
          const perms = permissions || admin.role?.permissions;
          if (perms) {
            Object.values(perms).forEach((section) => {
              Object.values(section).forEach((perms) => {
                perms.forEach((perm) => {
                  const normalizedName = perm.name.toLowerCase();
                  permissionNames.add(normalizedName);
                  permissionIds[perm.id] = perm;
                });
              });
            });
          }
        }

        try {
          localStorage.setItem("access_token", token);
        } catch (error) {
          console.error("useAuthStore: Error setting access_token:", error);
        }

        set({
          admin,
          token,
          isSuperAdmin,
          permissionNames,
          permissionIds,
        });
      },
      clearAuth: () => {
        try {
          localStorage.removeItem("access_token");
        } catch (error) {
          console.error("useAuthStore: Error removing access_token:", error);
        }
        set({
          admin: null,
          token: null,
          isSuperAdmin: false,
          permissionNames: new Set(),
          permissionIds: {},
        });
      },
      hasPermission: (name) => {
        const { isSuperAdmin, permissionNames } = get();
        const hasPerm = isSuperAdmin || permissionNames.has(name.toLowerCase());
        return hasPerm;
      },
      hasPermissionById: (id) => {
        const { isSuperAdmin, permissionIds } = get();
        const hasPerm = isSuperAdmin || !!permissionIds[id];
        return hasPerm;
      },
      hasSectionPermission: (section) => {
        const { isSuperAdmin, admin } = get();
        if (isSuperAdmin) {
          return true;
        }
        const hasPerm = !!(admin?.role?.permissions && admin.role.permissions[section]);
        return hasPerm;
      },
      hasSubSectionPermission: (section, subSection) => {
        const { isSuperAdmin, admin } = get();
        if (isSuperAdmin) {
          return true;
        }
        const hasPerm = !!(
          admin?.role?.permissions && admin.role.permissions[section]?.[subSection]?.length
        );
        return hasPerm;
      },
      isScopeAllowed: (scope) => {
        const { isSuperAdmin, admin } = get();
        const allowed = isSuperAdmin || admin?.role?.scope === scope;
        return allowed;
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          try {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const { state } = JSON.parse(str);
            return {
              state: {
                ...state,
                permissionNames: new Set(state.permissionNames || []),
              },
            };
          } catch (error) {
            console.error("useAuthStore: Error reading auth-storage:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(
              name,
              JSON.stringify({
                state: {
                  ...value.state,
                  permissionNames: Array.from(value.state.permissionNames || []),
                },
              })
            );
          } catch (error) {
            console.error("useAuthStore: Error writing auth-storage:", error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error("useAuthStore: Error removing auth-storage:", error);
          }
        },
      },
    }
  )
);
