import * as fs from 'fs';
import * as pdf from 'html-pdf';

export const generatePdf = function(body) {
  
  const options = { format: 'Letter' };
  const html = fs.readFileSync('/var/server/bibliotheca/src/api/invoice/invoice.html', 'utf8');
  const items = JSON.parse(body.items);
  
  pdf.create(html, options).toFile('/var/www/bibliotheca/invoices/' + body.id + '.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log('PDF wrote at: ');
    console.log(res);
  });
  
}