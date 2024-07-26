export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getLocalizedFileName(fileName: string, locale: any): string {
  const parts = fileName.split("|");
  switch (locale) {
    case "ru":
      return parts[0] || fileName;
    case "kz":
      return parts[1] || fileName;
    case "en":
      return parts[2] || fileName;
    default:
      return fileName;
  }
}
