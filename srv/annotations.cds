using pdfSchema as bd from '../db/schema';

annotate bd.BillingDocumentAttachment with { 

    PDFContent @Core.MediaType: 'application/pdf'
               @UI.LineItem: [{ type: #AS_ATTACHMENT, value: 'PDFContent' }];
}