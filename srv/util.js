import PDFDocument from "pdfkit";

export async function generatePdf(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      var buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Add content to the PDF
      doc.fontSize(20).text("Billing Document", { align: "center" });
      doc.moveDown();
      doc.fontSize(14);
      doc.text(`Billing Document ID: ${data.BillingDocumentID}`);
      doc.text(`Billing Doc. Type: ${data.BillingDocumentType}`);
      doc.text(`Billing Date: ${data.BillingDate}`);
      doc.text(`Customer ID: ${data.CustomerID}`);
      doc.text(`Total Amount: ${data.TotalAmount} ${data.Currency}`);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
