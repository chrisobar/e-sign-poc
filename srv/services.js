const cds = require("@sap/cds");

const { generatePdf } = require("./util");
module.exports = class PDFService extends cds.ApplicationService {
  init() {
    this.on("generatePdf", async (req) => {
      const { BillingDocumentID } = req.params[0];
      // Implement PDF generation logic here
      const billDocData = await SELECT.one
        .from("BillingDocumentHeader")
        .where({ BillingDocumentID });
      if (billDocData.Status === "" || billDocData.Status === null) {
        const pdfBuffer = await generatePdf(billDocData);

        await INSERT.into("BillingDocumentAttachment").entries({
          BillingDocumentID_BillingDocumentID: BillingDocumentID,
          PDFContent: pdfBuffer.toString("base64"),
        });
        await UPDATE("BillingDocumentHeader")
          .set({ Status: "G" })
          .where({ BillingDocumentID });

        req.info(
          201,
          `PDF generated for BillingDocumentID: ${BillingDocumentID}`
        );
      } else {
        req.error(
          400,
          `PDF already generated for BillingDocumentID: ${BillingDocumentID}`
        );
      }
    });
    this.on("signPdf", async (req) => {});

    return super.init();
  }
};
