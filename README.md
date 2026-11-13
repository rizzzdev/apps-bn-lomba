# Apps-BN — Portal Aplikasi SMK Bagimu Negeriku (Pure Static Edition)

Portal peluncur aplikasi ekosistem SMK Bagimu Negeriku versi website statis murni (*zero framework bloat*). Dibangun mengacu pada kaidah UI/UX, sistem semantic token, dan mikro-interaksi dari `apps-bn`.

---

## 🌟 Fitur Utama

1. **Desain & Token Identik (Warm Cream & Deep Maroon)**
   - Mendukung penuh **Mode Terang (*Light Mode*)** dan **Mode Gelap (*Dark Mode*)**.
   - Custom Scrollbar bernuansa krem dan maroon (hanya pada container konten di bawah header).
   - Hero banner dengan badge radar berkedip (*pulsing dot*) dan watermark ikon *school* 130px.
   - Kartu aplikasi dengan efek angkat (*hover lift*), bayangan bernuansa maroon, animasi skala ikon, dan panah interaktif.

2. **Tata Letak & Tipografi Lega**
   - Grid maksimal **4 kolom** responsif.
   - Deskripsi lengkap aplikasi ditampilkan utuh tanpa pemotongan teks.
   - Tinggi kartu seragam (*equal height*) antar-kartu dalam satu baris.
   - Tautan slug URL diletakkan rapi di bawah deskripsi sehingga tombol **"Buka Aplikasi →"** di footer kartu sangat lega.

3. **Zero Auth & Personalisasi Nama Pengguna**
   - Tanpa proteksi autentikasi backend.
   - Saat pertama kali dibuka, muncul popup modal selamat datang untuk mengisi nama.
   - Nama disimpan secara permanen di browser (`localStorage` key: `bn_user_name` & fallback cookie).
   - Nama pengguna di banner hero dapat diklik kapan saja untuk diedit kembali.

4. **Pencarian Reaktif (Deterministic 4-State UI Matrix)**
   - Pencarian instan (*live search filtering*) berdasarkan nama atau deskripsi aplikasi.
   - Counter badge terhubung secara dinamis dengan hasil filter.
   - *Empty state* otomatis jika kata kunci tidak ditemukan, lengkap dengan tombol *Reset Pencarian*.

5. **11 Aplikasi Sekolah Terintegrasi (Dataset .xlsx)**
   - Seluruh 11 data aplikasi dipetakan di `js/data.js` mencakup Akademik-BN, Magang-BN, Learn-BN, Exam, AKBN, Sidis, SPMB, Memo, Bagimu Extra, Evoting, dan SIM Inventaris.

6. **Pojok Kanan Atas Bersih**
   - Profile card dihilangkan, menyisakan tombol **Theme Toggle** (*Dark/Light Mode*).

---

## 🚀 Cara Menjalankan Secara Lokal

### Opsi 1: Langsung Buka File
Cukup klik dua kali (double click) file `index.html` untuk langsung membukanya di browser favorit Anda (Chrome, Edge, Brave, Firefox, dll).

### Opsi 2: Menggunakan Local Web Server
```bash
# Menggunakan Python
python -m http.server 8080

# Atau menggunakan npx serve
npx serve .
```
Lalu buka `http://localhost:8080` di browser Anda.

---

## 🐳 Panduan Deploy ke VPS (Docker & Traefik)

Proyek ini telah dilengkapi dengan `Dockerfile` (berbasis `nginx:alpine`), `nginx.conf.template`, `docker-compose.yml`, serta file konfigurasi `.env`.

### 1. Konfigurasi Environment (`.env`)
Sesuaikan domain host Anda di file `.env`:
```env
ORIGIN=apps.smkbagimunegeriku.sch.id
PORT=3001
TRAEFIK_ROUTER_NAME=apps-bn
CONTAINER_NAME=apps-bn
IMAGE_NAME=apps-bn-static:latest
```

### 2. Jalankan Docker Compose
Pastikan network Traefik eksternal `proxy` sudah ada di VPS:
```bash
# Buat network proxy jika belum ada
docker network create proxy

# Build dan jalankan container
docker compose up -d --build
```

Container akan otomatis:
- Menjalankan web server Nginx Alpine yang sangat ringan (~10MB) dan cepat.
- Mendengarkan pada port internal container `PORT` (default: 3001).
- Terhubung ke network `proxy` dan dikenali oleh Traefik dengan sertifikat SSL otomatis (`myresolver`).
- Memiliki endpoint health check di `/health`.

---

## 📁 Struktur File Proyek

```
apps-bn-lomba/
├── index.html            # Markup semantik portal lengkap
├── css/
│   └── styles.css        # Variabel token tema (:root & .dark), custom scrollbars, dan animasi
├── js/
│   ├── data.js           # Dataset 11 aplikasi sekolah dari spreadsheet .xlsx
│   └── app.js            # Controller logika (tema, filter pencarian, modal nama & localStorage)
├── Dockerfile            # Multi-stage Nginx Alpine image builder
├── nginx.conf.template   # Template Nginx dengan dukungan gzip, caching, & health check
├── docker-compose.yml    # Konfigurasi container dan label Traefik
├── .dockerignore
├── .env.example
├── .env
└── README.md
```
