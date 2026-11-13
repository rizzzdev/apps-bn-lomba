/**
 * Data Master Aplikasi Sekolah Ekosistem SMK Bagimu Negeriku
 * Sumber data: Excel / Spreadsheet Resmi
 */
const schoolApplications = [
  {
    id: 1,
    name: "Akademik-BN",
    description: "Akademik-BN adalah platform manajemen operasional sekolah yang dirancang khusus untuk menstrukturkan dan memetakan relasi akademik—mulai dari pembagian jurusan dan rombongan belajar (kelas) siswa, penugasan guru mata pelajaran, penetapan wali kelas dan kepala jurusan, hingga penyusunan jadwal pelajaran—secara sistematis, terintegrasi, dan bebas bentrok.",
    link: "https://akademik.smkbagimunegeriku.sch.id",
    order: 1,
    icon: "school",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Magang-BN",
    description: "Magang-BN adalah platform kolaboratif yang dirancang untuk mengatur dan memantau seluruh siklus Praktik Kerja Lapangan (PKL) siswa—mulai dari pendataan mitra industri, penempatan siswa, pengisian jurnal kegiatan harian, pemantauan kehadiran, hingga evaluasi dan penilaian akhir oleh pembimbing sekolah dan pihak industri.",
    link: "https://magang.smkbagimunegeriku.sch.id",
    order: 2,
    icon: "work_outline",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Learn-BN",
    description: "Learn-BN adalah platform pembelajaran elektronik (e-learning) yang dirancang untuk mendistribusikan materi pelajaran, mengelola penugasan dan kuis, memfasilitasi interaksi virtual antara guru dan siswa, serta memantau progres belajar secara daring, interaktif, dan fleksibel.",
    link: "https://learn.smkbagimunegeriku.sch.id",
    order: 3,
    icon: "cast_for_education",
    status: "ACTIVE"
  },
  {
    id: 4,
    name: "Exam",
    description: "Exam-BN adalah platform evaluasi digital yang dirancang untuk menyusun, mendistribusikan, dan menyelenggarakan ujian secara daring (online) maupun luring (offline). Aplikasi ini memastikan proses penilaian berjalan secara objektif, efisien, aman dari kecurangan, serta mampu mengkalkulasi dan menampilkan hasil secara real-time.",
    link: "https://exam.smkbagimunegeriku.sch.id",
    order: 4,
    icon: "quiz",
    status: "ACTIVE"
  },
  {
    id: 5,
    name: "AKBN",
    description: "AKBN adalah platform evaluasi digital yang berfokus pada pengamatan, pencatatan, dan pelaporan perkembangan sikap, etika, kecerdasan emosional, serta perilaku individu guna mendukung pembentukan karakter yang positif.",
    link: "https://nilaikarakter.smkbagimungeriku.sch.id",
    order: 5,
    icon: "self_improvement",
    status: "ACTIVE"
  },
  {
    id: 6,
    name: "Sidis",
    description: "Sidis adalah platform digital terpadu yang dirancang untuk merekam data kehadiran harian sekaligus memantau dan mencatat riwayat kedisiplinan (indisipliner) siswa secara real-time, guna mewujudkan lingkungan sekolah yang tertib, transparan, dan terpantau.",
    link: "https://sidis.smkbagimunegeriku.sch.id",
    order: 6,
    icon: "rule",
    status: "ACTIVE"
  },
  {
    id: 7,
    name: "SPMB",
    description: "SPMB adalah platform pendaftaran digital terpadu yang memfasilitasi dan mengelola seluruh rangkaian proses penerimaan peserta didik baru—mulai dari pengisian formulir pendaftaran, pengumpulan berkas, proses seleksi, hingga pengumuman kelulusan—secara transparan, terstruktur, dan efisien.",
    link: "https://spmb.smkbagimunegeriku.sch.id",
    order: 7,
    icon: "app_registration",
    status: "ACTIVE"
  },
  {
    id: 8,
    name: "Memo",
    description: "Memo merupakan platform manajemen perizinan khusus lingkungan sekolah asrama (boarding school) yang memfasilitasi murid dalam mengajukan hak akses fasilitas (seperti lapangan, aula, lab komputer, atau perpustakaan) di luar waktu Kegiatan Belajar Mengajar (KBM) reguler.",
    link: "https://memo.smkbagimunegeriku.sch.id",
    order: 8,
    icon: "approval",
    status: "ACTIVE"
  },
  {
    id: 9,
    name: "Bagimu Extra",
    description: "Bagimu Extra adalah platform terpadu yang dirancang untuk mengelola seluruh operasional unit kegiatan siswa di luar jam akademik, mencakup proses pendaftaran anggota baru, pencatatan presensi, penjadwalan latihan rutin, hingga pemantauan tingkat keaktifan dan pencapaian siswa secara efisien.",
    link: "https://bagimuextra.smkbagimunegeriku.sch.id",
    order: 9,
    icon: "local_activity",
    status: "ACTIVE"
  },
  {
    id: 10,
    name: "Evoting",
    description: "Aplikasi E-Voting adalah platform pemungutan suara digital yang dirancang untuk memfasilitasi proses pemilihan umum (seperti pemilihan ketua OSIS, PMR, dll) secara aman, transparan, dan efisien.",
    link: "https://evoting.smkbagimunegeriku.sch.id",
    order: 10,
    icon: "how_to_vote",
    status: "ACTIVE"
  },
  {
    id: 11,
    name: "SIM Inventaris",
    description: "Aplikasi SIM Inventaris (Sistem Informasi Manajemen Inventaris) adalah platform pencatatan dan pelacakan aset digital yang dirancang untuk mengelola seluruh siklus hidup barang milik institusi—mulai dari pengadaan, penempatan di berbagai ruangan, mutasi, hingga perawatan dan penghapusan—guna memastikan akurasi stok, mencegah kehilangan, dan mempermudah proses stock opname.",
    link: "https://smi.smkbagimunegeriku.sch.id",
    order: 11,
    icon: "inventory",
    status: "ACTIVE"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { schoolApplications };
}
