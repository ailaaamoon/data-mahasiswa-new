const form = document.getElementById("mahasiswaForm");
const tabel = document.getElementById("tabelMahasiswa");

let editIndex = -1;

async function loadData() {
    const response = await fetch("/api/mahasiswa");
    const data = await response.json();

    tabel.innerHTML = "";

    data.forEach((mhs, index) => {
        // DI SINI PERUBAHANNYA: Menambahkan class btn-edit dan btn-delete pada tag button
        tabel.innerHTML += `
        <tr>
            <td>${mhs.nim}</td>
            <td>${mhs.nama}</td>
            <td>${mhs.jurusan}</td>
            <td>${mhs.semester}</td>
            <td style="text-align: center;">
                <button class="btn-edit" onclick="editData(${index})">Edit</button>
                <button class="btn-delete" onclick="hapusData(${index})">Hapus</button>
            </td>
        </tr>
        `;
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const mahasiswa = {
        nim: document.getElementById("nim").value,
        nama: document.getElementById("nama").value,
        jurusan: document.getElementById("jurusan").value,
        semester: document.getElementById("semester").value
    };

    if(editIndex === -1){
        await fetch("/api/mahasiswa", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(mahasiswa)
        });
    }else{
        await fetch(`/api/mahasiswa/${editIndex}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(mahasiswa)
        });

        editIndex = -1;
    }

    form.reset();
    loadData();
});

loadData();

async function hapusData(index){
    if(!confirm("Yakin ingin menghapus data?")){
        return;
    }

    await fetch(`/api/mahasiswa/${index}`,{
        method:"DELETE"
    });

    loadData();
}

async function editData(index){
    const response = await fetch("/api/mahasiswa");
    const data = await response.json();
    const mhs = data[index];

    document.getElementById("nim").value = mhs.nim;
    document.getElementById("nama").value = mhs.nama;
    document.getElementById("jurusan").value = mhs.jurusan;
    document.getElementById("semester").value = mhs.semester;

    editIndex = index;
}