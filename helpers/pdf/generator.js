const pdf = require("pdf-creator-node");
const { promisify } = require("util");
const fs = require("fs");

const readFileAsync = promisify(fs.readFile);

var options = {
  format: "A4",
  orientation: "portrait",
  border: "1mm",
};

const pdfTemplate = {
  invoice: "./helpers/pdf/template/invoice.html",
  "invoice-void": "./helpers/pdf/template/invoice-void.html",
};

// Read HTML Template

async function pdfGenerator(templateName, fileName, templateData) {
  const html = await readFileAsync(pdfTemplate[templateName], "utf8");
  const pdfDoc = {
    html: html,
    data: templateData,
    path: `./public/${fileName}.pdf`,
  };
  return pdf.create(pdfDoc, options).catch((err) => console.error("PDF_GENERATE_ERROR", err));
}

module.exports = pdfGenerator;
