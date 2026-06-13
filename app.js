const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

const DATA_FILE = "./data/mahasiswa.json";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/mahasiswa", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

app.post("/api/mahasiswa", (req, res) => {

    const mahasiswaBaru = req.body;

    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    data.push(mahasiswaBaru);

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({
        message: "Data berhasil ditambahkan"
    });

});
app.put("/api/mahasiswa/:index", (req, res) => {

    const index = parseInt(req.params.index);

    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    data[index] = req.body;

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(data, null, 2)
    );

    res.json({
        message: "Data berhasil diupdate"
    });

});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

app.delete("/api/mahasiswa/:index", (req, res) => {

    const index = parseInt(req.params.index);

    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    data.splice(index, 1);

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({
        message: "Data berhasil dihapus"
    });

});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});