var fs = require('fs');
var pdf = require('html-pdf');
var html = '<html><h1>oi pdf</h1></html>'// fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Letter' };
 
pdf.create(html, options).toFile('/var/www/bibliotheca/invoices/test.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
