export const getFileInfo = (filePath: string) => {
  const parts = filePath.split(/[/\\]/).pop()?.split('.') || [];
  return {
    name: parts.slice(0, -1).join('.') || '',
    ext: parts.length > 1 ? parts.pop() : ''
  };
};
