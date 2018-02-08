export const generatePdf = function() {
  
  var fs = require('fs');
  var pdf = require('html-pdf');
  
  var html = fs.readFileSync('/var/server/bibliotheca/src/api/invoice/invoice.html', 'utf8');
  var options = { format: 'Letter' };
  
  pdf.create(html, options).toFile('/var/www/bibliotheca/invoices/pdf_from_api.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res);
    success(res, 302);
  });
  
}