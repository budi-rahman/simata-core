exports.invoiceTemplate = (payload) => {
  return `
    <p>
Here we attach invoice for invoice no ${payload.invoiceNo}
<br />
You can also click <a href="${payload.downloadLink}">here</a> to download the invoice
    </p>
  `;
};
