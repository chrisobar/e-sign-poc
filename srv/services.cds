using { pdfSchema as Bd } from '../db/schema';

service PDFService {
    entity BillingDocument as projection on Bd.BillingDocumentHeader
      actions {
        action generatePdf();
        action signPdf();
      }
    entity BillingDocumentAttachment as projection on Bd.BillingDocumentAttachment;
}