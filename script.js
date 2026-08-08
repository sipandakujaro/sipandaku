
function login(){

let user =
document.getElementById("username").value;

let pass =
document.getElementById("password").value;

if(user==="admin" && pass==="12345"){
localStorage.setItem("login","true");
localStorage.setItem(
"role",
"Admin"
);

masukDashboard();

}else if(
user==="kasubag" &&
pass==="12345"
){

localStorage.setItem(
"role",
"Kasubag"
);

masukDashboard();

}else if(
user==="camat" &&
pass==="12345"
){

localStorage.setItem(
"role",
"Camat"
);

masukDashboard();

}else{

alert(
"Username atau Password Salah"
);

}

}
function masukDashboard(){

let role =
localStorage.getItem(
"role"
);

document.getElementById(
"userRole"
).innerHTML =
"Login sebagai : " + role;

let pesan = "";

if(role === "Admin"){

pesan =
"🖥 Administrator SIPANDAKU";

}else if(role === "Kasubag"){

pesan =
"📊 Kasubag Perencanaan & Keuangan";

}else if(role === "Camat"){

pesan =
"🏛 Executive Dashboard Camat Jaro";

}

document.getElementById(
"welcomeRole"
).innerHTML =
pesan;

document.getElementById(
"loginPage"
).style.display="none";

document.getElementById(
"dashboardPage"
).style.display="flex";

updateTanggalJam();
let menu =
document.querySelectorAll(
".sidebar li"
);

if(role === "Camat"){

menu[1].style.display = "none"; // Perencanaan
menu[2].style.display = "none"; // Monitoring
menu[3].style.display = "none"; // Dokumen

}
}
function logout(){
localStorage.removeItem("login");
document.getElementById("dashboardPage")
.style.display="none";

document.getElementById("loginPage")
.style.display="flex";

}function showPage(page){

    const pages = [
        "dashboard",
        "perencanaan",
        "monitoring",
        "dokumen",
        "laporan"
    ];

    pages.forEach(id=>{
        document.getElementById(id).style.display="none";
    });

    document.getElementById(page).style.display="block";

    if(page=="dashboard"){
        tampilkanData();
    }

    if(page=="monitoring"){
        tampilkanMonitoring();
    }

    if(page=="laporan"){
        tampilkanLaporan();
    }

}
function simpanData(){
let subKegiatan =
document.getElementById(
"subKegiatan"
).value;

let indikator =
document.getElementById(
"indikator"
).value;

let target =
document.getElementById("target").value;

let penanggungJawab =
document.getElementById(
"penanggungJawab"
).value;

let status =
document.getElementById(
"status"
).value;
let program =
document.getElementById("program").value;
let kegiatan =
document.getElementById("kegiatan").value;

let anggaran =
document.getElementById("anggaran")
.value
.replace(/\./g,"")
.trim();

if(
program==="" ||
kegiatan==="" ||
anggaran===""){
alert("Lengkapi data terlebih dahulu");
return;
}

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

if(editIndex >= 0){
    const idEdit = data[editIndex].id;
data[editIndex] = {

    id:data[editIndex].id,

    program,
    kegiatan,
    subKegiatan,
    indikator,
    target,
    anggaran,
    penanggungJawab,
    status,

    realisasi:data[editIndex].realisasi,

    tw1:data[editIndex].tw1,
    tw2:data[editIndex].tw2,
    tw3:data[editIndex].tw3,
    tw4:data[editIndex].tw4,

    angkas1:data[editIndex].angkas1 || 0,
    realisasi1:data[editIndex].realisasi1 || 0,
    persen1:data[editIndex].persen1 || 0,

    angkas2:data[editIndex].angkas2 || 0,
realisasi2:data[editIndex].realisasi2 || 0,
persen2:data[editIndex].persen2 || 0,

angkas3:data[editIndex].angkas3 || 0,
realisasi3:data[editIndex].realisasi3 || 0,
persen3:data[editIndex].persen3 || 0,

angkas4:data[editIndex].angkas4 || 0,
realisasi4:data[editIndex].realisasi4 || 0,
persen4:data[editIndex].persen4 || 0

    
};
simpanKeCloud({

    action:"edit",

    id:idEdit,

    program,
    kegiatan,
    subKegiatan,
    indikator,
    target,
    anggaran,
    penanggungJawab,
    status

});

editIndex = -1;
}else{

    data.push({

id: Date.now(),

program,
kegiatan,
subKegiatan,
indikator,
target,
anggaran,
penanggungJawab,
status,

realisasi:0,

tw1:0,
tw2:0,
tw3:0,
tw4:0,

angkas1:0,
realisasi1:0,
persen1:0,

angkas2:0,
realisasi2:0,
persen2:0,

angkas3:0,
realisasi3:0,
persen3:0,

angkas4:0,
realisasi4:0,
persen4:0
});
simpanKeCloud({

    action:"simpan",

    program,
    kegiatan,
    subKegiatan,
    indikator,
    target,
    anggaran,
    penanggungJawab,
    status

});
}

localStorage.setItem(
"data",
JSON.stringify(data)
);

document.getElementById("program").value="";
document.getElementById("kegiatan").value="";
document.getElementById("subKegiatan").value="";
document.getElementById("indikator").value="";
document.getElementById("target").value="";
document.getElementById("anggaran").value="";
document.getElementById("penanggungJawab").value="";
document.getElementById("status").value="Belum";


tampilkanData();
tampilkanRealisasi();
updateGrafik();
tampilkanMonitoring();
sukses(
    "Berhasil",
    "Data berhasil disimpan."
);
}

function tampilkanData(){

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

let tbody =
document.querySelector(
"#tabelData tbody"
);

if(tbody){
    tbody.innerHTML="";
}
let totalAnggaran = 0;
let totalRealisasi = 0;

data.forEach((item,index)=>{

    totalAnggaran += Number(item.anggaran || 0);

    totalRealisasi += Number(item.realisasi1 || 0);
    totalRealisasi += Number(item.realisasi2 || 0);
    totalRealisasi += Number(item.realisasi3 || 0);
    totalRealisasi += Number(item.realisasi4 || 0);

    if(tbody){
tbody.innerHTML += `
<td class="kolom-pilih">
    <div class="checkbox-wrapper">

        <input
            type="checkbox"
            class="cekHapus"
            value="${index}"
            title="Pilih data ini"
            onclick="pilihData(${index}); event.stopPropagation();">

    </div>
</td>

<td>
${index+1}
</td>

<td>
${item.program}
</td>

<td>${item.kegiatan}</td>
<td>${item.subKegiatan}</td>
<td>${item.indikator || "-"}</td>
<td>${item.target || "-"}</td>
<td>Rp ${Number(item.anggaran).toLocaleString("id-ID")}</td>
<td>${item.penanggungJawab || ""}</td>
<td>${item.status || ""}</td>
</tr>
`;

    }

});
let jumlahProgram =
new Set(
data.map(item=>item.program)
).size;

let jumlahKegiatan =
new Set(
data.map(item=>item.kegiatan)
).size;

let jumlahSubKegiatan =
new Set(
data.map(item=>item.subKegiatan)
).size;


document.getElementById("totalProgram").innerHTML =
jumlahProgram;

document.getElementById("totalKegiatan").innerHTML =
jumlahKegiatan;

document.getElementById("indProgram").innerHTML =
jumlahProgram;

document.getElementById("indKegiatan").innerHTML =
jumlahKegiatan;

document.getElementById("totalSubKegiatan").innerHTML =
jumlahSubKegiatan;

document.getElementById("indSubKegiatan").innerHTML =
jumlahSubKegiatan;

console.log("Total Anggaran :", totalAnggaran);
console.log("Total Realisasi :", totalRealisasi);
let rata = 0;

if(data.length > 0){

rata = totalAnggaran > 0
? Math.round((totalRealisasi / totalAnggaran) * 100)
: 0;
}
const rataEl =
document.getElementById(
"rataRealisasi"
);

if(rataEl){

rataEl.innerHTML =
rata + "%";

}

let bar =
document.getElementById(
"progressKinerja"
);

let persen =
document.getElementById(
"persenKinerja"
);

if(bar){

bar.style.width =
rata + "%";

if(rata >= 80){

bar.style.background =
"green";

}else if(rata >= 50){

bar.style.background =
"orange";

}else{

bar.style.background =
"red";

}

}

if(persen){

persen.innerHTML =
rata + "%";

}
let baik = 0;
let berjalan = 0;
let belum = 0;

data.forEach(item=>{

    let progres = Math.max(

        Number(item.persen1 || 0),
        Number(item.persen2 || 0),
        Number(item.persen3 || 0),
        Number(item.persen4 || 0)

    );

    if(progres >= 100){

        baik++;

    }else if(progres > 0){

        berjalan++;

    }else{

        belum++;

    }

});
if(document.getElementById("statusBaik")){

document.getElementById(
"statusBaik"
).innerHTML = baik;

document.getElementById(
"statusBerjalan"
).innerHTML = berjalan;

document.getElementById(
"statusBelum"
).innerHTML = belum;

}
if(document.getElementById("indSubKegiatan")){

document.getElementById(
"indPagu"
).innerHTML =
"Rp " +
totalAnggaran.toLocaleString("id-ID");

document.getElementById(
"totalAnggaran"
).innerHTML =
"Rp " +
totalAnggaran.toLocaleString("id-ID");
}
let totalTW1 = 0;
let totalTW2 = 0;
let totalTW3 = 0;
let totalTW4 = 0;

let totalNominalTW1 = 0;
let totalNominalTW2 = 0;
let totalNominalTW3 = 0;
let totalNominalTW4 = 0;

data.forEach(item=>{

    totalTW1 += Number(item.tw1 || 0);
    totalTW2 += Number(item.tw2 || 0);
    totalTW3 += Number(item.tw3 || 0);
    totalTW4 += Number(item.tw4 || 0);

    totalNominalTW1 += Number(item.realisasi1 || 0);
    totalNominalTW2 += Number(item.realisasi2 || 0);
    totalNominalTW3 += Number(item.realisasi3 || 0);
    totalNominalTW4 += Number(item.realisasi4 || 0);
});
let rataTW1 =
data.length ?
Math.round(totalTW1/data.length)
: 0;

let rataTW2 =
data.length ?
Math.round(totalTW2/data.length)
: 0;

let rataTW3 =
data.length ?
Math.round(totalTW3/data.length)
: 0;

let rataTW4 =
data.length ?
Math.round(totalTW4/data.length)
: 0;updateGrafik();

updateGrafikAnggaran();

updateGrafikTriwulan();

updateGrafikPenyerapan();

tampilkanMonitoring();

tampilkanLaporan();
if(document.getElementById("tw1Persen")){

    document.getElementById("tw1Persen").innerHTML = rataTW1 + "%";
    document.getElementById("tw2Persen").innerHTML = rataTW2 + "%";
    document.getElementById("tw3Persen").innerHTML = rataTW3 + "%";
    document.getElementById("tw4Persen").innerHTML = rataTW4 + "%";

}

if(document.getElementById("tw1Nominal")){

document.getElementById("tw1Nominal").innerHTML =
"Rp " + totalNominalTW1.toLocaleString("id-ID");

document.getElementById("tw2Nominal").innerHTML =
"Rp " + totalNominalTW2.toLocaleString("id-ID");

document.getElementById("tw3Nominal").innerHTML =
"Rp " + totalNominalTW3.toLocaleString("id-ID");

document.getElementById("tw4Nominal").innerHTML =
"Rp " + totalNominalTW4.toLocaleString("id-ID");
}}
function hapusData(){

if(confirm(
"Yakin ingin menghapus semua data?"
)){

localStorage.removeItem("data");

tampilkanData();
tampilkanRealisasi();

tampilkanMonitoring();

tampilkanLaporan();

updateGrafik();
console.log(
JSON.parse(
localStorage.getItem("data")
)
);
}}
let chartProgram;

function updateGrafik(){

    let data =
    JSON.parse(localStorage.getItem("data")) || [];

    let jumlahProgram =
    new Set(data.map(item => item.program)).size;

    const ctx =
    document.getElementById("grafikProgram");

    if(!ctx) return;

    if(chartProgram){
        chartProgram.destroy();
    }

    chartProgram = new Chart(ctx,{

        type:"bar",

        data:{

            labels:["Program"],

            datasets:[{

                label:"Jumlah Program",

                data:[jumlahProgram]

            }]

        },

        options:{
            responsive:true
        }

    });


}
function tampilkanMonitoring(){

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

let tbody =
document.querySelector(
"#tabelMonitoring tbody"
);

if(!tbody) return;

tbody.innerHTML="";

data.forEach((item, index)=>{
let persen1 =
    Number(item.persen1 || 0);

let persen2 =
    Number(item.persen2 || 0);

let persen3 =
    Number(item.persen3 || 0);

let persen4 =
    Number(item.persen4 || 0);
  let progres = Math.max(

    persen1,
    persen2,
    persen3,
    persen4

);

let status = "";
if(progres == 0){

    status = "🔴 Belum";

}else if(progres < 100){

    status = "🟡 Berjalan";

}else{

    status = "🟢 Selesai";

}
    tbody.innerHTML += `

<tr>
<td>${index+1}</td>

<td>${item.program}</td>

<td>${item.kegiatan}</td>

<td>${item.subKegiatan}</td>

<td>Rp ${Number(item.anggaran).toLocaleString("id-ID")}</td>

<td>${persen1}%</td>

<td>${persen2}%</td>

<td>${persen3}%</td>

<td>${persen4}%</td>

<td>${status}</td>

<td>
<button onclick="detailMonitoring(${index})">
👁
</button>
</td>
</tr>

`;

});
}
function detailMonitoring(index){

    let data = JSON.parse(localStorage.getItem("data")) || [];
    let item = data[index];

    document.getElementById("modalMonitoring").style.display = "flex";

    document.getElementById("isiMonitoring").innerHTML = `

<h3>${item.program}</h3>

<p><b>Kegiatan :</b> ${item.kegiatan}</p>

<p><b>Sub Kegiatan :</b> ${item.subKegiatan}</p>

<br>

<h3>💰 Realisasi Anggaran</h3>

<table class="detail-table">

<tr>
    <th>Triwulan</th>
    <th>Angkas</th>
    <th>Realisasi</th>
    <th>Sisa</th>
    <th>Persen</th>
</tr>

<tr>
    <td>TW I</td>
    <td>Rp ${Number(item.angkas1 || 0).toLocaleString("id-ID")}</td>
    <td>Rp ${Number(item.realisasi1 || 0).toLocaleString("id-ID")}</td>
    <td>Rp ${Number((item.angkas1||0)-(item.realisasi1||0)).toLocaleString("id-ID")}</td>
    <td>${item.persen1 || 0}%</td>
</tr>

<tr>
    <td>TW II</td>
    <td>Rp ${Number(item.angkas2 || 0).toLocaleString("id-ID")}</td>
    <td>Rp ${Number(item.realisasi2 || 0).toLocaleString("id-ID")}</td>
    <td>Rp ${Number((item.angkas2||0)-(item.realisasi2||0)).toLocaleString("id-ID")}</td>
    <td>${item.persen2 || 0}%</td>
</tr>

<tr>
    <td>TW III</td>
    <td>Rp ${Number(item.angkas3 || 0).toLocaleString("id-ID")}</td>
    <td>Rp ${Number(item.realisasi3 || 0).toLocaleString("id-ID")}</td>
    <td>Rp ${Number((item.angkas3||0)-(item.realisasi3||0)).toLocaleString("id-ID")}</td>
    <td>${item.persen3 || 0}%</td>
</tr>

<tr>
    <td>TW IV</td>
    <td>Rp ${Number(item.angkas4 || 0).toLocaleString("id-ID")}</td>
    <td>Rp ${Number(item.realisasi4 || 0).toLocaleString("id-ID")}</td>
    <td>Rp ${Number((item.angkas4||0)-(item.realisasi4||0)).toLocaleString("id-ID")}</td>
    <td>${item.persen4 || 0}%</td>
</tr>

</table>

<br>

<h3>📈 Realisasi Kinerja</h3>

<table class="detail-table">

<tr>
    <th>Triwulan</th>
    <th>Target</th>
    <th>Realisasi</th>
    <th>Sisa</th>
    <th>Persen</th>
</tr>

<tr>
    <td>TW I</td>
    <td>${item.target || "-"}</td>
    <td>${item.realisasiKinerja1 || 0}</td>
   <td>${(parseFloat(item.target) || 0) - (parseFloat(item.realisasiKinerja1) || 0)}</td>
    <td>${item.persenKinerja1 || 0}%</td>
</tr>
<tr>
    <td>TW II</td>
    <td>${item.target || "-"}</td>
    <td>${item.realisasiKinerja2 || 0}</td>
    <td>-</td>
    <td>${item.persenKinerja2 || 0}%</td>
</tr>

<tr>
    <td>TW III</td>
    <td>${item.target || "-"}</td>
    <td>${item.realisasiKinerja3 || 0}</td>
    <td>-</td>
    <td>${item.persenKinerja3 || 0}%</td>
</tr>

<tr>
    <td>TW IV</td>
    <td>${item.target || "-"}</td>
    <td>${item.realisasiKinerja4 || 0}</td>
    <td>-</td>
    <td>${item.persenKinerja4 || 0}%</td>
</tr>

</table>

`;

}
function tutupMonitoring(){

document.getElementById("modalMonitoring").style.display="none";

}
function uploadDokumen(){

let file =
document.getElementById(
"uploadDokumen"
).files[0];

if(!file){

alert(
"Pilih file terlebih dahulu"
);

return;

}

let jenis =
document.getElementById(
"jenisDokumen"
).value;

let dokumen =
JSON.parse(
localStorage.getItem(
"dokumen"
)
) || [];

dokumen.push({

jenis,
nama:file.name

});

localStorage.setItem(
"dokumen",
JSON.stringify(dokumen)
);

tampilkanDokumen();

alert(
"Dokumen berhasil diupload"
);

}function tampilkanDokumen(){

let data =
JSON.parse(
localStorage.getItem(
"dokumen"
)
) || [];

let tbody =
document.querySelector(
"#tabelDokumen tbody"
);

if(!tbody) return;

tbody.innerHTML="";

data.forEach((item,index)=>{

tbody.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${item.jenis}</td>

<td>${item.nama}</td>

</tr>

`;

});

document.getElementById(
"totalDokumen"
).innerHTML =
data.length;

}function exportExcel(){

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

if(data.length===0){

alert("Belum ada data");

return;

}

let worksheet =
XLSX.utils.json_to_sheet(data);

let workbook =
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
workbook,
worksheet,
"Perencanaan"
);

XLSX.writeFile(
workbook,
"SIPANDAKU_Perencanaan.xlsx"
);

}async function cetakPDF(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

let totalAnggaran = 0;
let totalRealisasi = 0;

data.forEach((item,index)=>{

totalAnggaran +=
Number(item.anggaran || 0);

totalRealisasi +=
Number(item.realisasi1 || 0);

totalRealisasi +=
Number(item.realisasi2 || 0);

totalRealisasi +=
Number(item.realisasi3 || 0);

totalRealisasi +=
Number(item.realisasi4 || 0);

});

let rata = 0;

if(data.length > 0){

rata =
Math.round(
totalRealisasi / data.length
);

}

doc.setFontSize(16);

doc.text(
"PEMERINTAH KABUPATEN TABALONG",
105,
15,
{align:"center"}
);

doc.text(
"KECAMATAN JARO",
105,
25,
{align:"center"}
);

doc.setFontSize(11);

doc.text(
"LAPORAN TRIWULAN SIPANDAKU",
105,
35,
{align:"center"}
);

doc.line(
20,
40,
190,
40
);

let y = 55;

doc.text(
"Ringkasan Kinerja",
20,
y
);

y += 10;

let jumlahProgram =
new Set(
data.map(item=>item.program)
).size;

doc.text(
"Total Program : " + jumlahProgram,
20,
y
);
y += 10;

doc.text(
"Total Anggaran : Rp " +
totalAnggaran.toLocaleString("id-ID"),
20,
y
);

y += 10;

doc.text(
"Rata-rata Realisasi : " +
rata + "%",
20,
y
);

y += 20;

doc.text(
"Daftar Program",
20,
y
);

y += 10;

data.forEach((item,index)=>{

doc.text(
(index+1)+". "+
item.program+
" - "+
item.kegiatan,
25,
y
);

y += 8;

});

y += 20;

doc.text(
"Jaro, " +
new Date().toLocaleDateString("id-ID"),
130,
y
);

y += 10;

doc.text(
"Camat Jaro",
145,
y
);

y += 30;

doc.text(
"(................................)",
130,
y
);
doc.addPage();

doc.setFontSize(16);

doc.text(
"EXECUTIVE DASHBOARD",
105,
20,
{align:"center"}
);

doc.setFontSize(12);

doc.text(
"Total Program : " + jumlahProgram,
20,
50
);

doc.text(
"Total Anggaran : Rp " +
totalAnggaran.toLocaleString("id-ID"),
20,
65
);

doc.text(
"Rata-rata Realisasi : " +
rata + "%",
20,
80
);
doc.save(
"Laporan_Triwulan_SIPANDAKU.pdf"
);

}
let chartAnggaran;

function updateGrafikAnggaran(){

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

let total = 0;

data.forEach(item=>{

total +=
Number(item.anggaran);

});

const ctx =
document.getElementById(
"grafikAnggaran"
);

if(!ctx) return;

if(chartAnggaran){

chartAnggaran.destroy();

}

chartAnggaran =
new Chart(ctx,{

type:"doughnut",

data:{

labels:["Anggaran"],

datasets:[{

data:[total]

}]

}

});

}function tampilkanLaporan(){

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

let tbody =
document.querySelector(
"#tabelLaporan tbody"
);

if(!tbody) return;

tbody.innerHTML = "";

let totalAnggaran = 0;
let totalRealisasi = 0;

data.forEach(item=>{

totalAnggaran +=
Number(item.anggaran || 0);

totalRealisasi += Number(item.realisasi1 || 0);
totalRealisasi += Number(item.realisasi2 || 0);
totalRealisasi += Number(item.realisasi3 || 0);
totalRealisasi += Number(item.realisasi4 || 0);

tbody.innerHTML += `

<tr>

<td>${item.program}</td>

<td>${item.kegiatan}</td>

<td>
Rp ${Number(item.anggaran)
.toLocaleString("id-ID")}
</td>

<td>${item.realisasi}%</td>

</tr>

`;

});
let jumlahProgram =
new Set(
data.map(item=>item.program)
).size;

document.getElementById(
"lapProgram"
).innerHTML =
jumlahProgram;
document.getElementById(
"lapAnggaran"
).innerHTML =
"Rp " +
totalAnggaran.toLocaleString("id-ID");

let rata = 0;

if(data.length > 0){

rata =
Math.round(
totalRealisasi / data.length
);

}

document.getElementById(
"lapRealisasi"
).innerHTML =
rata + "%";

}
let chartKinerja;

function updateGrafikKinerja(
rataTW1,
rataTW2,
rataTW3,
rataTW4
){

const ctx =
document.getElementById(
"grafikKinerja"
);

if(!ctx) return;

if(chartKinerja){

chartKinerja.destroy();

}

chartKinerja =
new Chart(ctx,{

type:"line",

data:{

labels:[
"TW I",
"TW II",
"TW III",
"TW IV"
],

datasets:[{

label:"Kinerja (%)",

data:[
rataTW1,
rataTW2,
rataTW3,
rataTW4
],

tension:0.4,
fill:false

}]

},

options:{

responsive:true,

scales:{
y:{
beginAtZero:true,
max:100
}
}

}

});

}
let chartTriwulan;

function updateGrafikTriwulan(){

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

let totalRealisasi = 0;

data.forEach(item=>{

totalRealisasi +=
Number(item.realisasi || 0);

});

let rata = 0;

if(data.length > 0){

rata =
Math.round(
totalRealisasi / data.length
);

}

const ctx =
document.getElementById(
"grafikTriwulan"
);

if(!ctx) return;

if(chartTriwulan){

chartTriwulan.destroy();

}

chartTriwulan =
new Chart(ctx,{

type:"line",

data:{

labels:[
"TW I",
"TW II",
"TW III",
"TW IV"
],

datasets:[{

label:"Realisasi (%)",

data:[
Math.round(rata*0.25),
Math.round(rata*0.50),
Math.round(rata*0.75),
rata
],

tension:0.4

}]

},

options:{
responsive:true
}

});
}
let chartPenyerapan;

function updateGrafikPenyerapan(){

let data =
JSON.parse(
localStorage.getItem("data")
) || [];
let totalAngkas1 = 0;
let totalRealisasi1 = 0;

let totalAngkas2 = 0;
let totalRealisasi2 = 0;

let totalAngkas3 = 0;
let totalRealisasi3 = 0;

let totalAngkas4 = 0;
let totalRealisasi4 = 0;

data.forEach(item=>{

    totalAngkas1 += Number(item.angkas1 || 0);
    totalRealisasi1 += Number(item.realisasi1 || 0);

    totalAngkas2 += Number(item.angkas2 || 0);
    totalRealisasi2 += Number(item.realisasi2 || 0);

    totalAngkas3 += Number(item.angkas3 || 0);
    totalRealisasi3 += Number(item.realisasi3 || 0);

    totalAngkas4 += Number(item.angkas4 || 0);
    totalRealisasi4 += Number(item.realisasi4 || 0);

});

let rataTW1 = totalAngkas1 > 0
? Math.round((totalRealisasi1 / totalAngkas1) * 100)
: 0;

let rataTW2 = totalAngkas2 > 0
? Math.round((totalRealisasi2 / totalAngkas2) * 100)
: 0;

let rataTW3 = totalAngkas3 > 0
? Math.round((totalRealisasi3 / totalAngkas3) * 100)
: 0;

let rataTW4 = totalAngkas4 > 0
? Math.round((totalRealisasi4 / totalAngkas4) * 100)
: 0;

// Sinkronkan Card Dashboard
if(document.getElementById("cardTW1")){


    document.getElementById("cardTW1").innerHTML = rataTW1 + "%";
    document.getElementById("cardTW2").innerHTML = rataTW2 + "%";
    document.getElementById("cardTW3").innerHTML = rataTW3 + "%";
    document.getElementById("cardTW4").innerHTML = rataTW4 + "%";

}

// Sinkronkan Tabel Kinerja
if(document.getElementById("tw1Persen")){

    document.getElementById("tw1Persen").innerHTML = rataTW1 + "%";
    document.getElementById("tw2Persen").innerHTML = rataTW2 + "%";
    document.getElementById("tw3Persen").innerHTML = rataTW3 + "%";
    document.getElementById("tw4Persen").innerHTML = rataTW4 + "%";
// Sinkronkan Tabel Penyerapan
if(document.getElementById("serapanTW1")){

    document.getElementById("serapanTW1").innerHTML = rataTW1 + "%";
    document.getElementById("serapanTW2").innerHTML = rataTW2 + "%";
    document.getElementById("serapanTW3").innerHTML = rataTW3 + "%";
    document.getElementById("serapanTW4").innerHTML = rataTW4 + "%";

}
}updateGrafikKinerja(
    rataTW1,
    rataTW2,
    rataTW3,
    rataTW4
);
const ctx =
document.getElementById(
"grafikPenyerapan"
);

if(!ctx) return;

if(chartPenyerapan){

chartPenyerapan.destroy();

}

chartPenyerapan =
new Chart(ctx,{

type:"bar",

data:{

labels:[
"TW I",
"TW II",
"TW III",
"TW IV"
],

datasets:[{

label:"Penyerapan (%)",

data:[
rataTW1,
rataTW2,
rataTW3,
rataTW4
]

}]

},

options:{

responsive:true,

scales:{
y:{
beginAtZero:true,
max:100
}
}

}

});
}

function updateTanggalJam(){

let sekarang =
new Date();

let tanggal =
sekarang.toLocaleDateString(
"id-ID",
{
weekday:'long',
year:'numeric',
month:'long',
day:'numeric'
}
);

let jam =
sekarang.toLocaleTimeString(
"id-ID"
);

let el =
document.getElementById(
"tanggalJam"
);

if(el){

el.innerHTML =
"📅 " +
tanggal +
" | 🕒 " +
jam;

}

}

setInterval(
updateTanggalJam,
1000
);
function updateDashboardNominal(){

    let data = JSON.parse(localStorage.getItem("data")) || [];
    let tw1 = 0;
    let tw2 = 0;
    let tw3 = 0;
    let tw4 = 0;

    data.forEach(item=>{

        tw1 += Number(item.realisasi1 || 0);
        tw2 += Number(item.realisasi2 || 0);
        tw3 += Number(item.realisasi3 || 0);
        tw4 += Number(item.realisasi4 || 0);

    });

    document.getElementById("tw1Nominal").innerHTML =
    "Rp " + tw1.toLocaleString("id-ID");

    document.getElementById("tw2Nominal").innerHTML =
    "Rp " + tw2.toLocaleString("id-ID");

    document.getElementById("tw3Nominal").innerHTML =
    "Rp " + tw3.toLocaleString("id-ID");

    document.getElementById("tw4Nominal").innerHTML =
    "Rp " + tw4.toLocaleString("id-ID");

};
function hapusBaris(index){

let data =
JSON.parse(
localStorage.getItem("data")
) || [];

if(confirm(
"Yakin ingin menghapus data ini?"
)){

data.splice(index,1);

localStorage.setItem(
"data",
JSON.stringify(data)
);

tampilkanData();
tampilkanRealisasi();
tampilkanMonitoring();
tampilkanLaporan();
updateGrafik();
}

}let editIndex = -1;
function editData(index){

    showPage("perencanaan");   // PINDAHKAN KE ATAS

    let data =
    JSON.parse(localStorage.getItem("data")) || [];

    let item = data[index];

    document.getElementById("program").value = item.program;
    document.getElementById("kegiatan").value = item.kegiatan;
    document.getElementById("subKegiatan").value = item.subKegiatan;
    document.getElementById("indikator").value = item.indikator;
    document.getElementById("target").value = item.target;
    document.getElementById("anggaran").value = item.anggaran;
    document.getElementById("penanggungJawab").value = item.penanggungJawab;
    document.getElementById("status").value = item.status;

    editIndex = index;

}
document.addEventListener("DOMContentLoaded", function(){

document.getElementById("username")
.addEventListener("keydown", function(e){

if(e.key === "Enter"){

login();

}

});

document.getElementById("password")
.addEventListener("keydown", function(e){

if(e.key === "Enter"){

login();

}

});

});
function showPerencanaan(menu){

    document.getElementById("dataPerencanaan").style.display="none";
    document.getElementById("realisasiTriwulan").style.display="none";

    document.getElementById(menu).style.display="block";

    if(menu==="realisasiTriwulan"){
        tampilkanRealisasi();
    }

}
let dataTerpilih = -1;function pilihData(index){


    dataTerpilih = index;

    let semuaBaris =
    document.querySelectorAll("#tabelData tbody tr");

    semuaBaris.forEach(baris=>{

        baris.style.background="";

    });

    semuaBaris[index].style.background="#d6eaff";


}function editDataTerpilih(){

    

    if(dataTerpilih == -1){


        return;

    }

    editData(dataTerpilih);

}
function formatRupiah(input){

let angka = input.value.replace(/\D/g,'');

input.value = angka.replace(/\B(?=(\d{3})+(?!\d))/g,".");

}
function tambahProgram(){

let program =
document.getElementById(
"masterProgram"
).value.trim();

if(program==""){

alert("Isi nama Program");

return;

}

let data =
JSON.parse(
localStorage.getItem("masterProgram")
) || [];

if(data.includes(program)){

alert("Program sudah ada");

return;

}

data.push(program);

localStorage.setItem(

"masterProgram",

JSON.stringify(data)

);

document.getElementById(
"masterProgram"
).value="";

tampilkanProgram();

}
function tampilkanProgram(){

let data =
JSON.parse(
localStorage.getItem(
"masterProgram"
)
)||[];

let tbody =
document.querySelector(
"#tabelProgram tbody"
);

if(!tbody) return;

tbody.innerHTML="";

data.forEach((item,index)=>{

tbody.innerHTML +=`

<tr>

<td>${index+1}</td>

<td>${item}</td>

<td>

<button
onclick="hapusProgram(${index})">

🗑 Hapus

</button>

</td>

</tr>

`;

});

}function hapusProgram(index){

let data =
JSON.parse(
localStorage.getItem(
"masterProgram"
)
)||[];

data.splice(index,1);

localStorage.setItem(

"masterProgram",

JSON.stringify(data)

);

tampilkanProgram();

}
function tampilkanRealisasi(){

let data =
JSON.parse(localStorage.getItem("data")) || [];

let tbody =
document.querySelector("#tabelRealisasi tbody");

if(!tbody) return;

tbody.innerHTML="";

data.forEach((item,index)=>{

// Ambil progres triwulan terakhir

let progres = 0;

if(Number(item.persen4) > 0){

    progres = Number(item.persen4);

}else if(Number(item.persen3) > 0){

    progres = Number(item.persen3);

}else if(Number(item.persen2) > 0){

    progres = Number(item.persen2);

}else{

    progres = Number(item.persen1 || 0);

}

// Tentukan status

let status = "";
let warna = "";

if(progres == 0){

    status = "Belum";
    warna = "#dc3545";

}else if(progres < 100){

    status = "Berjalan";
    warna = "#ffc107";

}else{

    status = "Selesai";
    warna = "#198754";

}tbody.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${item.program}</td>

<td>${item.subKegiatan}</td>

<td>${item.indikator}</td>

<td>${item.target}</td>

<td>
Rp ${Number(item.anggaran || 0).toLocaleString("id-ID")}
</td>

<!-- STATUS -->

<td>

<span
class="badge-status"
style="background:${warna};">

${status}

</span>

</td>

<!-- KELOLA -->

<td>

<button
class="btn-kelola"
onclick="bukaKelola(${index})">

✏ Kelola

</button>

</td>

</tr>

`;

});

}
function simpanTW1(index){

    let data = JSON.parse(localStorage.getItem("data")) || [];

    let angkas = Number(
        (document.getElementById("angkas1_"+index).value || "0")
        .replace(/\./g,"")
    );

    let realisasi = Number(
        (document.getElementById("realisasi1_"+index).value || "0")
        .replace(/\./g,"")
    );

    let persen = 0;

    if(angkas > 0){
        persen = Math.round((realisasi / angkas) * 100);
    }

    data[index].angkas1 = angkas;
    data[index].realisasi1 = realisasi;
    data[index].persen1 = persen;

    // dipakai dashboard lama
    data[index].tw1 = persen;

    localStorage.setItem("data", JSON.stringify(data));

    document.getElementById("persen1_"+index).innerHTML = persen + "%";

   tampilkanData();
tampilkanRealisasi();
tampilkanMonitoring();
tampilkanLaporan();
updateGrafik();
updateGrafikPenyerapan();
    alert("Realisasi TW I berhasil disimpan");

}function simpanTW2(index){

    let data = JSON.parse(localStorage.getItem("data")) || [];

    let angkas = Number(
        (document.getElementById("angkas2_"+index).value || "0")
        .replace(/\./g,"")
    );

    let realisasi = Number(
        (document.getElementById("realisasi2_"+index).value || "0")
        .replace(/\./g,"")
    );

    let persen = 0;

    if(angkas > 0){
        persen = Math.round((realisasi / angkas) * 100);
    }

    data[index].angkas2 = angkas;
    data[index].realisasi2 = realisasi;
    data[index].persen2 = persen;

    data[index].tw2 = persen;

    localStorage.setItem("data", JSON.stringify(data));

    document.getElementById("persen2_"+index).innerHTML = persen + "%";

    tampilkanData();
tampilkanRealisasi();
tampilkanMonitoring();
tampilkanLaporan();
updateGrafik();
updateGrafikPenyerapan();
    alert("Realisasi TW II berhasil disimpan");

}
function simpanTW3(index){

    let data = JSON.parse(localStorage.getItem("data")) || [];

    let angkas = Number(
        (document.getElementById("angkas3_"+index).value || "0")
        .replace(/\./g,"")
    );

    let realisasi = Number(
        (document.getElementById("realisasi3_"+index).value || "0")
        .replace(/\./g,"")
    );

    let persen = 0;

    if(angkas > 0){
        persen = Math.round((realisasi / angkas) * 100);
    }

    data[index].angkas3 = angkas;
    data[index].realisasi3 = realisasi;
    data[index].persen3 = persen;

    data[index].tw3 = persen;

    localStorage.setItem("data", JSON.stringify(data));

    document.getElementById("persen3_"+index).innerHTML = persen + "%";

  tampilkanData();
tampilkanRealisasi();
tampilkanMonitoring();
tampilkanLaporan();
updateGrafik();

    alert("Realisasi TW III berhasil disimpan");

}function simpanTW4(index){

    let data = JSON.parse(localStorage.getItem("data")) || [];

    let angkas = Number(
        (document.getElementById("angkas4_"+index).value || "0")
        .replace(/\./g,"")
    );

    let realisasi = Number(
        (document.getElementById("realisasi4_"+index).value || "0")
        .replace(/\./g,"")
    );

    let persen = 0;

    if(angkas > 0){
        persen = Math.round((realisasi / angkas) * 100);
    }

    data[index].angkas4 = angkas;
    data[index].realisasi4 = realisasi;
    data[index].persen4 = persen;

    data[index].tw4 = persen;

    localStorage.setItem("data", JSON.stringify(data));

    document.getElementById("persen4_"+index).innerHTML = persen + "%";

   tampilkanData();
tampilkanRealisasi();
tampilkanMonitoring();
tampilkanLaporan();
updateGrafik();

    alert("Realisasi TW IV berhasil disimpan");

}let indexKelola = -1;
function bukaKelola(index){

    let data =
    JSON.parse(localStorage.getItem("data")) || [];

    let item = data[index];

    indexKelola = index;

    // Isi informasi data master
    document.getElementById("formProgram").value =
    item.program || "";

    document.getElementById("formSubKegiatan").value =
    item.subKegiatan || "";

    document.getElementById("formIndikator").value =
    item.indikator || "";

    document.getElementById("formTarget").value =
    item.target || "";

    // Ambil data sesuai Triwulan yang dipilih
    loadPanelTW();

}
function loadPanelTW(){

    if(indexKelola == -1) return;

    let data =
    JSON.parse(localStorage.getItem("data")) || [];

    let item = data[indexKelola];

    let tw =
    document.getElementById("formTW").value;

    // Anggaran
    document.getElementById("formAngkas").value =
    item["angkas"+tw]
    ? Number(item["angkas"+tw]).toLocaleString("id-ID")
    : "";

    document.getElementById("formRealisasi").value =
    item["realisasi"+tw]
    ? Number(item["realisasi"+tw]).toLocaleString("id-ID")
    : "";

    // Kinerja
    document.getElementById("formRealisasiKinerja").value =
    item["realisasiKinerja"+tw] || "";
// Tampilkan Persentase Anggaran

document.getElementById("persenAnggaranForm").innerHTML =
(item["persen"+tw] || 0) + "%";
}
function hitungPersentasePanel(){

    let angkas = Number(
        document.getElementById("formAngkas").value.replace(/\./g,"") || 0
    );

    let realisasi = Number(
        document.getElementById("formRealisasi").value.replace(/\./g,"") || 0
    );

    // ==========================
    // Persentase Anggaran
    // ==========================

    let persenAnggaran = 0;

    if(angkas > 0){

        persenAnggaran = Math.round((realisasi / angkas) * 100);

    }

    document.getElementById("persenAnggaranForm").innerHTML =
    persenAnggaran + "%";

    // Simpan sementara ke LocalStorage

    let tw = document.getElementById("formTW").value;

    let data =
    JSON.parse(localStorage.getItem("data")) || [];

    if(indexKelola != -1){

        data[indexKelola]["persen"+tw] = persenAnggaran;

        localStorage.setItem(
            "data",
            JSON.stringify(data)
        );

    }

    // ==========================
    // Persentase Kinerja
    // ==========================

    let target =
    document.getElementById("formTarget").value;

    let realisasiKinerja =
    document.getElementById("formRealisasiKinerja").value;

    let angkaTarget =
    parseFloat(target.replace(/[^0-9]/g,"")) || 0;

    let angkaRealisasi =
    parseFloat(realisasiKinerja.replace(/[^0-9]/g,"")) || 0;

    let persenKinerja = 0;

    if(angkaTarget > 0){

        persenKinerja =
        Math.round((angkaRealisasi / angkaTarget) * 100);

    }

    document.getElementById("persenKinerjaForm").innerHTML =
    persenKinerja + "%";

}
function tutupKelola(){

    document.getElementById("modalKelola").style.display="none";

}
function loadDataTriwulan(){

    let data =
    JSON.parse(localStorage.getItem("data")) || [];

    if(indexKelola==-1) return;

    let item=data[indexKelola];

    let tw=
    document.getElementById("pilihTW").value;

    // =====================
    // ANGGARAN
    // =====================

    document.getElementById("modalAngkas").value=
    item["angkas"+tw]
    ? Number(item["angkas"+tw]).toLocaleString("id-ID")
    : "";

    document.getElementById("modalRealisasi").value=
    item["realisasi"+tw]
    ? Number(item["realisasi"+tw]).toLocaleString("id-ID")
    : "";

    // =====================
    // KINERJA
    // =====================

    document.getElementById("modalTarget").value=
    item["targetKinerja"+tw] || "";

    document.getElementById("modalKinerja").value=
    item["realisasiKinerja"+tw] || "";

    // =====================
    // PERSENTASE
    // =====================

    document.getElementById("persenAnggaranModal").innerHTML=
    (item["persen"+tw] || 0)+"%";

}function simpanKelola(){
 return;
 /*
    let data =
    JSON.parse(localStorage.getItem("data")) || [];

    let item = data[indexKelola];

    let tw =
    document.getElementById("pilihTW").value;

    // =====================
     // Kode lama dinonaktifkan sementara
    
    // =====================

    let angkas =
    Number(
    document.getElementById("modalAngkas")
    .value.replace(/\./g,"")
    ||0);

    let realisasi =
    Number(
    document.getElementById("modalRealisasi")
    .value.replace(/\./g,"")
    ||0);

    let target =
    document.getElementById("modalTarget").value;

    let realisasiKinerja =
    document.getElementById("modalKinerja").value;

    // =====================
    // SIMPAN
    // =====================

    item["angkas"+tw]=angkas;

    item["realisasi"+tw]=realisasi;

    item["targetKinerja"+tw]=target;

    item["realisasiKinerja"+tw]=realisasiKinerja;

    // =====================
    // HITUNG %
    // =====================

    let persenAnggaran = 0;

    if(angkas>0){

        persenAnggaran =
        Math.round(
        realisasi/angkas*100
        );

    }

    item["persen"+tw]=persenAnggaran;

    // =====================
    // SIMPAN LOCAL STORAGE
    // =====================

    data[indexKelola]=item;

    localStorage.setItem(
        "data",
        JSON.stringify(data)
    );

    // =====================
    // UPDATE MODAL
    // =====================

    document.getElementById(
        "persenAnggaranModal"
    ).innerHTML=
    persenAnggaran+"%";

    // =====================
    // REFRESH SEMUA
    // =====================

    tampilkanMonitoring();

    tampilkanDashboard();

    tampilkanRealisasi();

    updateGrafikPenyerapan();

    tutupKelola();
       */

}function simpanPanel(){
    if(indexKelola == -1){

        alert("Silakan pilih data terlebih dahulu.");
        return;

    }

    let data = JSON.parse(localStorage.getItem("data")) || [];

    let item = data[indexKelola];

    let tw = document.getElementById("formTW").value;

    let angkas = Number(
        document.getElementById("formAngkas").value.replace(/\./g,"") || 0
    );

    let realisasi = Number(
        document.getElementById("formRealisasi").value.replace(/\./g,"") || 0
    );

    let realisasiKinerja =
    document.getElementById("formRealisasiKinerja").value;

    // ==========================
    // Simpan sesuai Triwulan
    // ==========================

    item["angkas"+tw] = angkas;
    item["realisasi"+tw] = realisasi;
    item["realisasiKinerja"+tw] = realisasiKinerja;
let target =
document.getElementById("formTarget").value;

let angkaTarget =
parseFloat(target.replace(/[^0-9]/g,"")) || 0;

let angkaRealisasi =
parseFloat(realisasiKinerja.replace(/[^0-9]/g,"")) || 0;

let persenKinerja = 0;

if(angkaTarget > 0){

    persenKinerja =
    Math.round((angkaRealisasi / angkaTarget) * 100);

}

item["persenKinerja"+tw] = persenKinerja;
    // ==========================
    // Hitung Persentase Anggaran
    // ==========================

    let persen = 0;

    if(angkas > 0){

        persen = Math.round((realisasi / angkas) * 100);

    }

    item["persen"+tw] = persen;
    item["persen"+tw] = persen;

// Status

if(persen >= 100){

    item.status = "Selesai";

}else if(persen > 0){

    item.status = "Berjalan";

}else{

    item.status = "Belum";

}
// Simpan persentase untuk Dashboard
item["tw"+tw] = persen;
    // ==========================
    // Simpan LocalStorage
    // ==========================

    data[indexKelola] = item;

    localStorage.setItem(
        "data",
        JSON.stringify(data)
    );
  // Refresh seluruh tampilan

tampilkanData();

tampilkanRealisasi();

tampilkanMonitoring();

if(typeof tampilkanLaporan === "function"){
    tampilkanLaporan();
}

if(typeof updateGrafik === "function"){
    updateGrafik();
}

if(typeof updateGrafikPenyerapan === "function"){
    updateGrafikPenyerapan();
}

if(typeof updateDashboardNominal === "function"){
    updateDashboardNominal();
}

alert("✅ Data berhasil disimpan.");

}function hapusTerpilih(){

    let data =
    JSON.parse(localStorage.getItem("data")) || [];

    let checkbox =
    document.querySelectorAll(".cekHapus:checked");

    if(checkbox.length == 0){

        alert("Pilih data yang akan dihapus.");

        return;

    }

    if(!confirm("Yakin ingin menghapus data yang dipilih?")){

        return;

    }

    let indexHapus = [];

    checkbox.forEach(item=>{

        indexHapus.push(Number(item.value));

    });

    // Hapus dari belakang supaya index tidak berubah

    indexHapus.sort((a,b)=>b-a);
indexHapus.forEach(i=>{

    // Kirim ke Google Spreadsheet
    simpanKeCloud({

        action:"hapus",

        id:data[i].id

    });

    // Hapus dari localStorage
    data.splice(i,1);

});
    localStorage.setItem(
        "data",
        JSON.stringify(data)
    );

    tampilkanData();

    tampilkanMonitoring();

    tampilkanDashboard();

    tampilkanRealisasi();

    tampilkanLaporan();

    updateGrafik();

    updateGrafikTriwulan();

    updateGrafikAnggaran();

    updateGrafikPenyerapan();

    sukses(
    "Berhasil",
    "Data berhasil dihapus."
);
setTimeout(()=>{

    refreshDataCloud();

},1000);
}// ============================
// CEK LOGIN SAAT HALAMAN DIBUKA
// ============================
window.onload = function(){

    if(localStorage.getItem("login") == "true"){

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboardPage").style.display = "flex";

    }

    tampilkanData();
    tampilkanRealisasi();
    tampilkanMonitoring();
    tampilkanLaporan();

    updateGrafik();
    updateGrafikTriwulan();
    updateGrafikAnggaran();
    updateGrafikPenyerapan();
    updateDashboardNominal();
    updateTanggalJam();

    ambilDataCloud();

};async function simpanKeCloud(data){


    try{

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzpTq0gjEP1wvgoX9e3VvZ3bCx2gHYGEZSACjYBO5gBCcEg-DLG-HY62RAbDbPdM0VK/exec",
            {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data)
            }
        );

        const hasil = await response.text();

        alert("Respon Apps Script: " + hasil);

    }catch(err){

        alert("Error: " + err);

    }

}async function ambilDataCloud(){

    try{

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzpTq0gjEP1wvgoX9e3VvZ3bCx2gHYGEZSACjYBO5gBCcEg-DLG-HY62RAbDbPdM0VK/exec"
        );

      const sheet = await response.json();

console.log(sheet);
        const dataCloud = [];

        for(let i=1;i<sheet.length;i++){

            dataCloud.push({

                id: sheet[i][0],

                program: sheet[i][1],

                kegiatan: sheet[i][2],

                subKegiatan: sheet[i][3],

                indikator: sheet[i][4],

                target: sheet[i][5],

                anggaran: sheet[i][6],

                penanggungJawab: sheet[i][7],

                status: sheet[i][8],

                realisasi:0,

                tw1:0,
                tw2:0,
                tw3:0,
                tw4:0,

                angkas1:0,
                realisasi1:0,
                persen1:0,

                angkas2:0,
                realisasi2:0,
                persen2:0,

                angkas3:0,
                realisasi3:0,
                persen3:0,

                angkas4:0,
                realisasi4:0,
                persen4:0

            });

        }

        localStorage.setItem(
            "data",
            JSON.stringify(dataCloud)
        );

        tampilkanData();

    }catch(err){

        console.error(err);

    }

}
async function refreshDataCloud(){

    try{

        await ambilDataCloud();

        tampilkanData();
        tampilkanRealisasi();
        tampilkanMonitoring();
        tampilkanLaporan();

        updateGrafik();
        updateGrafikTriwulan();
        updateGrafikAnggaran();
        updateGrafikPenyerapan();
        updateDashboardNominal();


    }catch(err){

        alert("❌ Gagal memperbarui data.");
        console.error(err);

    }

}// ==============================
// NOTIFIKASI MODERN
// ==============================
function sukses(judul, pesan){

    Swal.fire({
        icon: "success",
        title: judul,
        text: pesan,
        confirmButtonColor: "#1e88e5",
        confirmButtonText: "OK"
    });

}

function gagal(judul, pesan){

    Swal.fire({
        icon: "error",
        title: judul,
        text: pesan,
        confirmButtonColor: "#d33",
        confirmButtonText: "OK"
    });

}

function info(judul, pesan){

    Swal.fire({
        icon: "info",
        title: judul,
        text: pesan,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    });

}

function konfirmasi(judul, pesan){

    return Swal.fire({
        icon: "warning",
        title: judul,
        text: pesan,
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33"
    });

}
