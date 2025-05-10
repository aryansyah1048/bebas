const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const cors = require('cors');

// Mengizinkan semua asal
app.use(cors());

// Gunakan port dari environment (Railway, Heroku, dll) atau default 3000
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("ok")
})

// Endpoint untuk menulis pesan (via GET method): /write?msg=pesan
app.get('/write', (req, res) => {
  const message = req.query.msg;
  if (!message) {
    return res.status(400).send('Pesan tidak boleh kosong. Gunakan ?msg=pesanAnda');
  }

  const filePath = path.join(__dirname, 'pesan.txt');
  fs.writeFile(filePath, message, (err) => {
    if (err) {
      return res.status(500).send('Gagal menulis ke file.');
    }
    res.send('Pesan berhasil ditulis ke pesan.txt');
  });
});

// Endpoint untuk membaca pesan: /read
app.get('/read', (req, res) => {
  const filePath = path.join(__dirname, 'pesan.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Gagal membaca file atau belum ada pesan.');
    }
    res.send(`Isi pesan.txt: ${data}`);
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
