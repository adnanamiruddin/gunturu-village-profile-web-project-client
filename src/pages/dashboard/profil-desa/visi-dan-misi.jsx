import vissionAndMissionsApi from "@/api/modules/vissionAndMissions.api";
import SaveButton from "@/components/layouts/functions/SaveButton";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import TextEditor from "@/components/layouts/TextEditor";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashboardVissionAndMissionPage() {
  const [vissionTextEditor, setVissionTextEditor] = useState("");
  const [missionTextEditor, setMissionTextEditor] = useState("");
  //
  const [loadingSave, setLoadingSave] = useState(false);

  const fetchData = async () => {
    const { response, error } =
      await vissionAndMissionsApi.getVissionAndMission();
    if (response) {
      setVissionTextEditor(response.vission);
      setMissionTextEditor(response.mission);
    }
    if (error) {
      toast.error(error.message);
    }
  };
  //
  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveButtonClicked = async () => {
    if (loadingSave) return;

    setLoadingSave(true);
    const { response, error } =
      await vissionAndMissionsApi.saveVissionAndMission({
        vission: vissionTextEditor,
        mission: missionTextEditor,
      });
    if (response) {
      toast.success("Berhasil menyimpan data");
    }
    if (error) {
      toast.error(error.message);
    }
    setLoadingSave(false);
  };

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>VISI DAN MISI</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Konten Visi dan Misi</h2>
          {/*  */}
          <SaveButton
            name="saveButton"
            onClick={handleSaveButtonClicked}
            disabled={loadingSave}
          >
            Simpan
          </SaveButton>
        </div>

        <div className="flex gap-5">
          <div className="mt-4 overflow-x-auto">
            <TextEditor
              id="vissionTextEditor"
              label="Visi"
              content={vissionTextEditor}
              setContent={setVissionTextEditor}
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <TextEditor
              id="missionTextEditor"
              label="Misi"
              content={missionTextEditor}
              setContent={setMissionTextEditor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
