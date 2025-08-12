export const generateId = (): number => Date.now();

export const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  currentAttachments: string[],
  onChange: (attachments: string[]) => void
): void => {
  const files = Array.from(e.target.files || []);
  const fileNames = files.map((file) => file.name);
  onChange([...currentAttachments, ...fileNames]);
};

export const removeAttachment = (
  index: number,
  currentAttachments: string[],
  onChange: (attachments: string[]) => void
): void => {
  const newAttachments = currentAttachments.filter((_, i) => i !== index);
  onChange(newAttachments);
};
