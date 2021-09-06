DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
  id INT GENERATED ALWAYS AS IDENTITY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL,
  tanggal_registrasi TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id) 
);

DROP TABLE IF EXISTS alumni CASCADE;
CREATE TABLE alumni(
  id INT GENERATED ALWAYS AS IDENTITY,
  nisn VARCHAR(50) NOT NULL,
  nama VARCHAR(255) NOT NULL,
  jenis_kelamin VARCHAR(50) NOT NULL,
  tempat_lahir VARCHAR(50) NOT NULL,
  tanggal_lahir DATE NOT NULL,
  jurusan VARCHAR(255) NOT NULL,
  tahun_lulus VARCHAR(5) NOT NULL,
  alamat VARCHAR(255),
  no_hp VARCHAR(50),
  email VARCHAR(50),
  PRIMARY KEY(id) 
);

DROP TABLE IF EXISTS kuesioner CASCADE;
CREATE TABLE kuesioner(
  id INT GENERATED ALWAYS AS IDENTITY,
  alumni_id INT NOT NULL,
  status VARCHAR(255) NOT NULL,
  nama_perusahaan VARCHAR(255),  
  alamat_perusahaan VARCHAR(255),  
  jabatan VARCHAR(255),  
  pekerjaan_sesuai_jurusan VARCHAR(255),  
  gaji VARCHAR(255),  
  nama_perguruan VARCHAR(255),  
  status_perguruan VARCHAR(255),  
  jurusan VARCHAR(255),  
  perguruan_sesuai_jurusan VARCHAR(255),  
  bidang_wirausaha VARCHAR(255),  
  nama_usaha VARCHAR(255),  
  pendapatan VARCHAR(255),  
  PRIMARY KEY(id),
  CONSTRAINT fk_alumni
    FOREIGN KEY(alumni_id)
      REFERENCES alumni(id)
      ON DELETE CASCADE 
);

DROP TABLE IF EXISTS lowongan CASCADE;
CREATE TABLE lowongan(
  id INT GENERATED ALWAYS AS IDENTITY,
  judul VARCHAR(255) NOT NULL,
  isi TEXT,
  gambar VARCHAR(255),
  jurusan TEXT,
  create_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  admin_id INT NOT NULl,
  PRIMARY KEY(id),
  CONSTRAINT fk_admin
    FOREIGN KEY(admin_id)
      REFERENCES users(id)
);

DROP TABLE IF EXISTS pelatihan CASCADE;
CREATE TABLE pelatihan(
  id INT GENERATED ALWAYS AS IDENTITY,
  judul VARCHAR(255) NOT NULL,
  isi TEXT,
  gambar VARCHAR(255),
  jurusan TEXT,
  create_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  admin_id INT NOT NULl,
  PRIMARY KEY(id),
  CONSTRAINT fk_admin
    FOREIGN KEY(admin_id)
      REFERENCES users(id)
);