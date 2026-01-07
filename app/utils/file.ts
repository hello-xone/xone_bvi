export const getFileInfo = (filePath: string) => {
  const parts = filePath.split(/[/\\]/).pop()?.split('.') || [];
  return {
    name: parts.slice(0, -1).join('.') || '',
    ext: parts.length > 1 ? parts.pop() : ''
  };
};

export const getSrcPath = (path: string) => {
  if (path && path?.startsWith('http') || path?.startsWith('//')) return path
  return `${import.meta.env.VITE_APP_IMAGE_BASE_URL}${path}`
}