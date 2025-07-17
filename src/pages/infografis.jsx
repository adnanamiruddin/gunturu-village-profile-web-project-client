import EnvironmentDiagramChart from "@/components/layouts/EnvironmentDiagramChart";
import PageHeaderTitle from "@/components/layouts/globals/PageHeaderTitle";
import {
  FaPeopleGroup,
  FaSchool as Fa6School,
  FaSchoolFlag,
} from "react-icons/fa6";
import { FaSchool, FaMosque } from "react-icons/fa";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { MdFamilyRestroom } from "react-icons/md";
import PopulationAdministration from "@/components/layouts/PopulationAdministration";
import { AiOutlineEnvironment } from "react-icons/ai";
import { TbBellSchool } from "react-icons/tb";
import { RiHospitalLine } from "react-icons/ri";
import { PiHospitalFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import infographicsApi from "@/api/modules/infographics.api";
import NotFound from "@/components/layouts/globals/NotFound";
import Loading from "@/components/layouts/globals/Loading";
import { toast } from "react-toastify";

export default function InfographicsPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const [infographicsData, setInfographicsData] = useState(null);
  const [environmentMaleArrayData, setEnvironmentMaleArrayData] = useState([]);
  const [environmentFemaleArrayData, setEnvironmentFemaleArrayData] = useState(
    []
  );

  const fetchInfographicsData = async () => {
    const { response, error } = await infographicsApi.getInfographic();
    if (response) {
      setInfographicsData(response);
      setEnvironmentMaleArrayData([
        response.dalobaMale,
        response.kassiMale,
        response.jalayaMale,
        response.barangMale,
        response.nanasayaMale,
      ]);
      setEnvironmentFemaleArrayData([
        response.dalobaFemale,
        response.kassiFemale,
        response.jalayaFemale,
        response.barangFemale,
        response.nanasayaFemale,
      ]);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 500);
    }
    if (error) {
      toast.error(error.message);
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    fetchInfographicsData();
  }, []);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="pb-4 md:px-24 md:mt-4 md:pb-10">
          <PageHeaderTitle
            title="INFOGRAFIS"
            description="Infografis seputar Desa Gunturu"
          />

          <div>
            <h1 className="text-2xl font-bold text-center mb-2 text-sky-700 md:text-4xl md:text-start">
              ADMINISTRASI KEPENDUDUKAN
            </h1>
            <p className="text-center mb-6 px-6 md:text-start md:px-0 md:text-lg">
              Sistem digital yang berfungsi mempermudah pengelolaan data dan
              informasi terkait dengan kependudukan dan pendayagunaannya untuk
              pelayanan publik yang efektif dan efisien
            </p>

            <div className="mb-6 grid grid-cols-2 px-6 gap-x-6 gap-y-8 md:flex md:justify-center md:flex-wrap md:gap-4 md:gap-y-12 md:mb-12">
              <div className="w-[30%] mx-auto">
                <PopulationAdministration
                  amount={infographicsData.totalPopulation}
                  type="Penduduk"
                >
                  <FaPeopleGroup className="text-6xl md:text-9xl" />
                </PopulationAdministration>
              </div>
              <div className="w-[30%] mx-auto">
                <PopulationAdministration
                  amount={infographicsData.totalMale}
                  type="Laki-Laki"
                >
                  <IoIosMan className="text-6xl md:text-9xl" />
                </PopulationAdministration>
              </div>
              <div className="w-[30%] mx-auto">
                <PopulationAdministration
                  amount={infographicsData.totalFemale}
                  type="Perempuan"
                >
                  <IoIosWoman className="text-6xl md:text-9xl" />
                </PopulationAdministration>
              </div>

              <div className="w-[30%] mx-auto">
                <PopulationAdministration
                  amount={infographicsData.totalFamily}
                  type="Kepala Keluarga"
                >
                  <MdFamilyRestroom className="text-6xl md:text-9xl" />
                </PopulationAdministration>
              </div>

              <div className="col-span-2 md:w-[20%] mx-auto">
                <PopulationAdministration
                  amount={infographicsData.totalEnvironment}
                  type="Lingkungan"
                >
                  <AiOutlineEnvironment className="text-6xl md:text-9xl" />
                </PopulationAdministration>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl text-center font-semibold mb-2 md:text-3xl md:mb-4">
                Distribusi Penduduk per Lingkungan
              </h2>
              <EnvironmentDiagramChart
                maleArrayData={environmentMaleArrayData}
                femaleArrayData={environmentFemaleArrayData}
              />
            </div>

            <div>
              <h2 className="text-xl text-center font-semibold mb-4 md:text-3xl md:mb-8">
                Jumlah Bangunan
              </h2>
              <div className="flex justify-center flex-wrap gap-y-8">
                <div className="w-[40%] md:w-[30%]">
                  <PopulationAdministration
                    amount={infographicsData.totalPlayground}
                    type="TK"
                  >
                    <TbBellSchool className="text-6xl md:text-9xl" />
                  </PopulationAdministration>
                </div>
                <div className="w-[40%] md:w-[30%]">
                  <PopulationAdministration
                    amount={infographicsData.totalElementarySchool}
                    type="SD"
                  >
                    <FaSchool className="text-6xl md:text-9xl" />
                  </PopulationAdministration>
                </div>

                <div className="w-[40%] md:w-[30%]">
                  <PopulationAdministration
                    amount={infographicsData.totalJuniorHighSchool}
                    type="SMP/MTs"
                  >
                    <Fa6School className="text-6xl md:text-9xl" />
                  </PopulationAdministration>
                </div>
                <div className="w-[40%] md:w-[30%]">
                  <PopulationAdministration
                    amount={infographicsData.totalSeniorHighSchool}
                    type="SMK"
                  >
                    <FaSchoolFlag className="text-6xl md:text-9xl" />
                  </PopulationAdministration>
                </div>

                <div className="w-[40%] md:w-[30%]">
                  <PopulationAdministration
                    amount={infographicsData.totalMosque}
                    type="Masjid"
                  >
                    <FaMosque className="text-6xl md:text-9xl" />
                  </PopulationAdministration>
                </div>
                <div className="w-[40%] md:w-[30%]">
                  <PopulationAdministration
                    amount={infographicsData.totalHealthCenter}
                    type="Puskesmas"
                  >
                    <PiHospitalFill className="text-6xl md:text-9xl" />
                  </PopulationAdministration>
                </div>

                <div className="w-[40%] md:w-[30%]">
                  <PopulationAdministration
                    amount={infographicsData.totalPosyandu}
                    type="Posyandu"
                  >
                    <RiHospitalLine className="text-6xl md:text-9xl" />
                  </PopulationAdministration>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
