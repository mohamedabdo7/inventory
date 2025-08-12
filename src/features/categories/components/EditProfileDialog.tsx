import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditableUser = {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
};

type EditProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: EditableUser;
  onSave: (updated: EditableUser) => void;
};

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const getInitials = (name?: string) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second || first || "U").toUpperCase();
};

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onOpenChange,
  user,
  onSave,
}) => {
  const [form, setForm] = React.useState<EditableUser>(user);
  const [preview, setPreview] = React.useState<string | undefined>(user.avatarUrl);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    setForm(user);
    setPreview(user.avatarUrl);
  }, [user, open]);

  const handleChange = (field: keyof EditableUser) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Optional: size/type validation
    const dataUrl = await fileToDataUrl(file);
    setPreview(dataUrl);
    setForm((prev) => ({ ...prev, avatarUrl: dataUrl }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      onSave(form);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  const initials = getInitials(form.name);

  return (
    <Dialog open={open} onOpenChange={(v) => !saving && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update your personal info and avatar.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Avatar upload */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
              {preview ? (
                <img src={preview} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-base font-semibold text-gray-600">{initials}</span>
              )}
            </div>
            <div>
              <Label htmlFor="avatar" className="text-xs text-gray-600">
                Profile image
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFile}
                disabled={saving}
                className="mt-1"
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleChange("name")}
              disabled={saving}
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              disabled={saving}
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              disabled={saving}
              placeholder="+1234567890"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} className="flex-1" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
