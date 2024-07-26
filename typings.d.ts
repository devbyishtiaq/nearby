declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
declare module "diff";
declare module "file-saver";
declare module "html2pdf.js";
declare module "html-to-text";
declare module "html-to-docx";
