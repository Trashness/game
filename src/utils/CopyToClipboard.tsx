export const сopyToClipboard = (textToCopy: any) => {
  return navigator.clipboard.writeText(textToCopy);
};
