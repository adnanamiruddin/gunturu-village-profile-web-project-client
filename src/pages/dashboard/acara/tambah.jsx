import schedulesApi from "@/api/modules/schedules.api";
import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function DashboardAddSchedulePage() {
  const router = useRouter();
  const { editScheduleId } = router.query;

  const [loadingSave, setLoadingSave] = useState(false);

  const handleCreateSchedule = async ({ values }) => {
    const { response, error } = await schedulesApi.createSchedule({
      name: values.name,
      date: values.date,
      location: values.location,
    });
    if (response) {
      toast.success("Data acara berhasil dibuat");
      router.push("/dashboard/acara");
    }
    if (error) {
      toast.error(error.message || "Gagal membuat data acara");
    }
  };
  //
  const handleUpdateSchedule = async ({ values }) => {
    const { response, error } = await schedulesApi.editSchedule({
      scheduleId: editScheduleId,
      name: values.name,
      date: values.date,
      location: values.location,
    });
    if (response) {
      toast.success("Data acara berhasil diperbarui");
      router.push("/dashboard/acara");
    }
    if (error) {
      toast.error(error.message || "Gagal memperbarui data acara");
    }
  };

  const dataForm = useFormik({
    initialValues: {
      name: "",
      date: "",
      location: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama acara tidak boleh kosong"),
      date: Yup.date().required("Tanggal acara tidak boleh kosong"),
      location: Yup.string().required("Lokasi acara tidak boleh kosong"),
    }),
    onSubmit: async (values) => {
      if (loadingSave) return;

      setLoadingSave(true);
      try {
        if (!editScheduleId) {
          // CREATE MODE
          await handleCreateSchedule({ values });
        } else {
          // EDIT MODE
          await handleUpdateSchedule({ values });
        }
      } finally {
        setLoadingSave(false);
      }
    },
  });

  // EDIT MODE
  const fetchExistingData = async () => {
    const { response, error } = await schedulesApi.getScheduleById({
      scheduleId: editScheduleId,
    });
    if (response) {
      dataForm.setValues({
        name: response.name,
        date: response.date,
        location: response.location,
      });
    }
    if (error) {
      toast.error(error.message);
    }
  };
  //
  useEffect(() => {
    if (editScheduleId) fetchExistingData();
  }, [editScheduleId]);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>ACARA</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Form Agenda Acara</h2>
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

        <Input
          label="Nama Acara"
          placeholder="Masukkan nama acara..."
          name="name"
          value={dataForm.values.name}
          onChange={dataForm.handleChange}
          error={dataForm.touched.name && dataForm.errors.name !== undefined}
          helperText={dataForm.touched.name && dataForm.errors.name}
        />

        <div className="flex gap-5">
          <div className="mt-4 w-1/2">
            <h3 className="mb-3 font-semibold text-lg">Tanggal</h3>
            <input
              type="date"
              name="date"
              value={dataForm.values.date}
              onChange={dataForm.handleChange}
              className="block bg-white text-black w-full p-3 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-[#18CDCA] focus:border-[#18CDCA] custom-time-input"
            />
            {/* Error Message */}
            {dataForm.touched.date && dataForm.errors.date ? (
              <div className="label">
                <span className="label-text-alt text-error -mb-2">
                  {dataForm.errors.date}
                </span>
              </div>
            ) : null}
          </div>
          {/*  */}
          <div className="w-1/2">
            <Input
              label="Lokasi"
              placeholder="Masukkan lokasi..."
              name="location"
              value={dataForm.values.location}
              onChange={dataForm.handleChange}
              error={
                dataForm.touched.location &&
                dataForm.errors.location !== undefined
              }
              helperText={dataForm.touched.location && dataForm.errors.location}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
