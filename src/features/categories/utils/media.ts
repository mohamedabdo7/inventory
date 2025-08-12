// utils/media.ts
export type MediaItem = { url: string; kind: "image" | "video" };

export function toMediaItems(input: any[] = []): MediaItem[] {
  return input
    .map((a) => {
      // File مباشرة
      if (a instanceof File) {
        const url = URL.createObjectURL(a);
        const kind: MediaItem["kind"] = a.type.startsWith("video") ? "video" : "image";
        return { url, kind };
      }
      // object فيه File
      if (a?.file instanceof File) {
        const url = a.url || URL.createObjectURL(a.file);
        const kind: MediaItem["kind"] = a.file.type.startsWith("video") ? "video" : "image";
        return { url, kind };
      }
      // url جاهز (قيمة قديمة)
      const url = a?.url ?? a?.path ?? a?.preview ?? (typeof a === "string" ? a : "");
      if (!url) return null;
      const kind: MediaItem["kind"] = /\.(mp4|webm|ogg|mov)$/i.test(url) ? "video" : "image";
      return { url, kind };
    })
    .filter(Boolean) as MediaItem[];
}
