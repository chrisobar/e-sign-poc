namespace pdfSchema;

using { cuid, managed } from '@sap/cds/common';

entity BillingDocumentHeader: managed {
    key BillingDocumentID : UUID;
    BillingDocumentType   : String(4);
    BillingDocumentDate   : Date;
    CustomerID           : String(10);
    TotalAmount          : Decimal(15, 2);
    Currency             : String(3);
    PDFAttachment        : association to one BillingDocumentAttachment on PDFAttachment.BillingDocumentID = $self;
    Status               : String(1);
}

entity BillingDocumentAttachment: cuid {
    key BillingDocumentID : Association to BillingDocumentHeader;
    PDFContent          : LargeBinary;
    
}