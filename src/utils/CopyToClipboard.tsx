export const CopyToClipboard = (textToCopy: any) => {
  navigator.clipboard.writeText(textToCopy);
  return CopyToClipboard;
};
