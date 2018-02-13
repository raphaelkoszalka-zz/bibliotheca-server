import * as fs from 'fs';
import * as pdf from 'html-pdf';

export const generatePdf = function(body) {
  
  console.log(body);
  
  const options = { format: 'Letter' };
  const items = JSON.parse(body.items);
  let html = fs.readFileSync('/var/server/bibliotheca/src/api/invoice/invoice.html', 'utf8');
  
  let itemsHTML = '';
  
  items.map(item =>{
    itemsHTML += '<tr class="item"><td>' + item.title + '</td><td>' + item.price + '</td></tr>';
  });
  
  html = html.replace('[[{{REPLACE}}]]', itemsHTML);
  html = html.replace('[[{{REPLACE_USERNAME}}]]', body.userName);
  html = html.replace('[[{{TOTAL_REPLACE}}]]', body.price);
  
  pdf.create(html, options).toFile('/var/www/bibliotheca/invoices/' + body.userId + '.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log('PDF wrote at: ');
    console.log(res);
  });
  
}