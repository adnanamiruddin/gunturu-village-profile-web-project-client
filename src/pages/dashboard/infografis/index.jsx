import infographicsApi from "@/api/modules/infographics.api";
import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function DashboardInfographicsPage() {
  const [loadingSave, setLoadingSave] = useState(false);

  const fetchData = async () => {
    const { response, error } = await infographicsApi.getInfographic();
    if (response) {
      dataForm.setValues({
        totalPopulation: response.totalPopulation,
        totalFamily: response.totalFamily,
        totalMale: response.totalMale,
        totalFemale: response.totalFemale,
        totalEnvironment: response.totalEnvironment,
        dalobaMale: response.dalobaMale,
        dalobaFemale: response.dalobaFemale,
        kassiMale: response.kassiMale,
        kassiFemale: response.kassiFemale,
        jalayaMale: response.jalayaMale,
        jalayaFemale: response.jalayaFemale,
        barangMale: response.barangMale,
        barangFemale: response.barangFemale,
        nanasayaMale: response.nanasayaMale,
        nanasayaFemale: response.nanasayaFemale,
        totalPlayground: response.totalPlayground,
        totalElementarySchool: response.totalElementarySchool,
        totalJuniorHighSchool: response.totalJuniorHighSchool,
        totalSeniorHighSchool: response.totalSeniorHighSchool,
        totalMosque: response.totalMosque,
        totalHealthCenter: response.totalHealthCenter,
        totalPosyandu: response.totalPosyandu,
      });
    }
    if (error) {
      toast.error(error.message);
    }
  };
  //
  useEffect(() => {
    fetchData();
  }, []);

  const dataForm = useFormik({
    initialValues: {
      totalPopulation: "",
      totalFamily: "",
      totalMale: "",
      totalFemale: "",
      totalEnvironment: 5,
      dalobaMale: "",
      dalobaFemale: "",
      kassiMale: "",
      kassiFemale: "",
      jalayaMale: "",
      jalayaFemale: "",
      barangMale: "",
      barangFemale: "",
      nanasayaMale: "",
      nanasayaFemale: "",
      totalPlayground: "",
      totalElementarySchool: "",
      totalJuniorHighSchool: "",
      totalSeniorHighSchool: "",
      totalMosque: "",
      totalHealthCenter: "",
      totalPosyandu: "",
    },
    validationSchema: Yup.object({
      totalPopulation: Yup.string().required("Data tidak boleh kosong"),
      totalFamily: Yup.string().required("Data tidak boleh kosong"),
      totalMale: Yup.string().required("Data tidak boleh kosong"),
      totalFemale: Yup.string().required("Data tidak boleh kosong"),
      totalEnvironment: Yup.string().required("Data tidak boleh kosong"),
      dalobaMale: Yup.string().required("Data tidak boleh kosong"),
      dalobaFemale: Yup.string().required("Data tidak boleh kosong"),
      kassiMale: Yup.string().required("Data tidak boleh kosong"),
      kassiFemale: Yup.string().required("Data tidak boleh kosong"),
      jalayaMale: Yup.string().required("Data tidak boleh kosong"),
      jalayaFemale: Yup.string().required("Data tidak boleh kosong"),
      barangMale: Yup.string().required("Data tidak boleh kosong"),
      barangFemale: Yup.string().required("Data tidak boleh kosong"),
      nanasayaMale: Yup.string().required("Data tidak boleh kosong"),
      nanasayaFemale: Yup.string().required("Data tidak boleh kosong"),
      totalPlayground: Yup.string().required("Data tidak boleh kosong"),
      totalElementarySchool: Yup.string().required("Data tidak boleh kosong"),
      totalJuniorHighSchool: Yup.string().required("Data tidak boleh kosong"),
      totalSeniorHighSchool: Yup.string().required("Data tidak boleh kosong"),
      totalMosque: Yup.string().required("Data tidak boleh kosong"),
      totalHealthCenter: Yup.string().required("Data tidak boleh kosong"),
      totalPosyandu: Yup.string().required("Data tidak boleh kosong"),
    }),
    onSubmit: async (values) => {
      if (loadingSave) return;

      setLoadingSave(true);
      const { response, error } = await infographicsApi.saveInfographic({
        ...values,
      });
      if (response) {
        toast.success("Berhasil menyimpan data");
      }
      if (error) {
        toast.error(error.message);
      }
      setLoadingSave(false);
    },
  });

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>INFOGRAFIS</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Konten Infografis</h2>
          {/*  */}
          <SaveButton
            name="saveButton"
            onClick={() => {
              dataForm.handleSubmit();
            }}
            disabled={loadingSave}
          >
            Simpan
          </SaveButton>
        </div>

        <div className="border-b-2 border-gray-400 pb-6">
          <h3 className="mt-4 font-semibold text-2xl">
            Data Administrasi Kependudukan
          </h3>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="Jumlah Penduduk"
                placeholder="Masukkan jumlah penduduk..."
                name="totalPopulation"
                value={dataForm.values.totalPopulation}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalPopulation &&
                  dataForm.errors.totalPopulation !== undefined
                }
                helperText={
                  dataForm.touched.totalPopulation &&
                  dataForm.errors.totalPopulation
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="Kepala Keluarga"
                placeholder="Masukkan kepala keluarga..."
                name="totalFamily"
                value={dataForm.values.totalFamily}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalFamily &&
                  dataForm.errors.totalFamily !== undefined
                }
                helperText={
                  dataForm.touched.totalFamily && dataForm.errors.totalFamily
                }
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="Jumlah Laki-Laki"
                placeholder="Masukkan jumlah laki-laki..."
                name="totalMale"
                value={dataForm.values.totalMale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalMale &&
                  dataForm.errors.totalMale !== undefined
                }
                helperText={
                  dataForm.touched.totalMale && dataForm.errors.totalMale
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="Jumlah Perempuan"
                placeholder="Masukkan jumlah perempuan..."
                name="totalFemale"
                value={dataForm.values.totalFemale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalFemale &&
                  dataForm.errors.totalFemale !== undefined
                }
                helperText={
                  dataForm.touched.totalFemale && dataForm.errors.totalFemale
                }
              />
            </div>
          </div>

          <div className="w-1/2">
            <Input
              disabled
              label="Jumlah Lingkungan"
              placeholder="Masukkan jumlah lingkungan..."
              name="totalEnvironment"
              value={dataForm.values.totalEnvironment}
              onChange={dataForm.handleChange}
              error={
                dataForm.touched.totalEnvironment &&
                dataForm.errors.totalEnvironment !== undefined
              }
              helperText={
                dataForm.touched.totalEnvironment &&
                dataForm.errors.totalEnvironment
              }
            />
          </div>
        </div>

        <div className="border-b-2 border-gray-400 pb-6">
          <h3 className="mt-6 font-semibold text-2xl">
            Data Distribusi Penduduk per Lingkungan
          </h3>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="Daloba (Laki-Laki)"
                placeholder="Masukkan jumlah penduduk..."
                name="dalobaMale"
                value={dataForm.values.dalobaMale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.dalobaMale &&
                  dataForm.errors.dalobaMale !== undefined
                }
                helperText={
                  dataForm.touched.dalobaMale && dataForm.errors.dalobaMale
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="Daloba (Perempuan)"
                placeholder="Masukkan jumlah penduduk..."
                name="dalobaFemale"
                value={dataForm.values.dalobaFemale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.dalobaFemale &&
                  dataForm.errors.dalobaFemale !== undefined
                }
                helperText={
                  dataForm.touched.dalobaFemale && dataForm.errors.dalobaFemale
                }
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="Kassi (Laki-Laki)"
                placeholder="Masukkan jumlah penduduk..."
                name="kassiMale"
                value={dataForm.values.kassiMale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.kassiMale &&
                  dataForm.errors.kassiMale !== undefined
                }
                helperText={
                  dataForm.touched.kassiMale && dataForm.errors.kassiMale
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="Kassi (Perempuan)"
                placeholder="Masukkan jumlah penduduk..."
                name="kassiFemale"
                value={dataForm.values.kassiFemale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.kassiFemale &&
                  dataForm.errors.kassiFemale !== undefined
                }
                helperText={
                  dataForm.touched.kassiFemale && dataForm.errors.kassiFemale
                }
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="Jalaya (Laki-Laki)"
                placeholder="Masukkan jumlah penduduk..."
                name="jalayaMale"
                value={dataForm.values.jalayaMale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.jalayaMale &&
                  dataForm.errors.jalayaMale !== undefined
                }
                helperText={
                  dataForm.touched.jalayaMale && dataForm.errors.jalayaMale
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="Jalaya (Perempuan)"
                placeholder="Masukkan jumlah penduduk..."
                name="jalayaFemale"
                value={dataForm.values.jalayaFemale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.jalayaFemale &&
                  dataForm.errors.jalayaFemale !== undefined
                }
                helperText={
                  dataForm.touched.jalayaFemale && dataForm.errors.jalayaFemale
                }
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="Barang (Laki-Laki)"
                placeholder="Masukkan jumlah penduduk..."
                name="barangMale"
                value={dataForm.values.barangMale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.barangMale &&
                  dataForm.errors.barangMale !== undefined
                }
                helperText={
                  dataForm.touched.barangMale && dataForm.errors.barangMale
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="Barang (Perempuan)"
                placeholder="Masukkan jumlah penduduk..."
                name="barangFemale"
                value={dataForm.values.barangFemale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.barangFemale &&
                  dataForm.errors.barangFemale !== undefined
                }
                helperText={
                  dataForm.touched.barangFemale && dataForm.errors.barangFemale
                }
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="Na'nasaya (Laki-Laki)"
                placeholder="Masukkan jumlah penduduk..."
                name="nanasayaMale"
                value={dataForm.values.nanasayaMale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.nanasayaMale &&
                  dataForm.errors.nanasayaMale !== undefined
                }
                helperText={
                  dataForm.touched.nanasayaMale && dataForm.errors.nanasayaMale
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="Na'nasaya (Perempuan)"
                placeholder="Masukkan jumlah penduduk..."
                name="nanasayaFemale"
                value={dataForm.values.nanasayaFemale}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.nanasayaFemale &&
                  dataForm.errors.nanasayaFemale !== undefined
                }
                helperText={
                  dataForm.touched.nanasayaFemale &&
                  dataForm.errors.nanasayaFemale
                }
              />
            </div>
          </div>
        </div>

        <div className="border-b-2 border-gray-400 pb-6">
          <h3 className="mt-6 font-semibold text-2xl">Jumlah Bangunan</h3>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="TK"
                placeholder="Masukkan jumlah TK..."
                name="totalPlayground"
                value={dataForm.values.totalPlayground}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalPlayground &&
                  dataForm.errors.totalPlayground !== undefined
                }
                helperText={
                  dataForm.touched.totalPlayground &&
                  dataForm.errors.totalPlayground
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="SD"
                placeholder="Masukkan jumlah SD..."
                name="totalElementarySchool"
                value={dataForm.values.totalElementarySchool}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalElementarySchool &&
                  dataForm.errors.totalElementarySchool !== undefined
                }
                helperText={
                  dataForm.touched.totalElementarySchool &&
                  dataForm.errors.totalElementarySchool
                }
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="SMP/MTs"
                placeholder="Masukkan jumlah SMP/MTs..."
                name="totalJuniorHighSchool"
                value={dataForm.values.totalJuniorHighSchool}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalJuniorHighSchool &&
                  dataForm.errors.totalJuniorHighSchool !== undefined
                }
                helperText={
                  dataForm.touched.totalJuniorHighSchool &&
                  dataForm.errors.totalJuniorHighSchool
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="SMK"
                placeholder="Masukkan jumlah SMK..."
                name="totalSeniorHighSchool"
                value={dataForm.values.totalSeniorHighSchool}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalSeniorHighSchool &&
                  dataForm.errors.totalSeniorHighSchool !== undefined
                }
                helperText={
                  dataForm.touched.totalSeniorHighSchool &&
                  dataForm.errors.totalSeniorHighSchool
                }
              />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-1/2">
              <Input
                label="Masjid"
                placeholder="Masukkan jumlah masjid..."
                name="totalMosque"
                value={dataForm.values.totalMosque}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalMosque &&
                  dataForm.errors.totalMosque !== undefined
                }
                helperText={
                  dataForm.touched.totalMosque && dataForm.errors.totalMosque
                }
              />
            </div>
            {/*  */}
            <div className="w-1/2">
              <Input
                label="Puskesmas"
                placeholder="Masukkan jumlah puskesmas..."
                name="totalHealthCenter"
                value={dataForm.values.totalHealthCenter}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.totalHealthCenter &&
                  dataForm.errors.totalHealthCenter !== undefined
                }
                helperText={
                  dataForm.touched.totalHealthCenter &&
                  dataForm.errors.totalHealthCenter
                }
              />
            </div>
          </div>

          <div className="w-1/2">
            <Input
              label="Posyandu"
              placeholder="Masukkan jumlah posyandu..."
              name="totalPosyandu"
              value={dataForm.values.totalPosyandu}
              onChange={dataForm.handleChange}
              error={
                dataForm.touched.totalPosyandu &&
                dataForm.errors.totalPosyandu !== undefined
              }
              helperText={
                dataForm.touched.totalPosyandu && dataForm.errors.totalPosyandu
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
