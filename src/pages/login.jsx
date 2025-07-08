import LoginButton from "@/components/layouts/functions/LoginButton";
import LoginInput from "@/components/layouts/functions/LoginInput";
import { setUser } from "@/redux/features/userSlice";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/api/config/firebase.config";
import usersApi from "@/api/modules/users.api";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email harus diisi"),
      password: Yup.string()
        .min(8, "Setidaknya 8 karakter untuk password")
        .required("Password harus diisi"),
    }),
    onSubmit: async (values) => {
      if (loading) return;

      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { response, error } = await usersApi.signIn({
          userUID: userCredential.user.uid,
        });
        if (response) {
          // Expire 1 day
          const expireTime = new Date(
            new Date().getTime() + 24 * 60 * 60 * 1000
          );
          Cookies.set("actkn", response.token, {
            expires: expireTime,
          });
          Cookies.set("lggnnusr", JSON.stringify(response.user), {
            expires: expireTime,
          });

          signInForm.resetForm();
          dispatch(setUser(response.user));
          router.push("/dashboard");
          toast.success(
            `Selamat datang kembali ${
              response.user.firstName + " " + response.user.lastName
            }`
          );
        }
        if (error) toast.error(error.message);
      } catch (error) {
        toast.error("Login gagal. Pastikan email dan password benar");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="hidden md:inline">
      {/* Tab - Desktop View Only */}
      <div className="flex items-center gap-6 py-4 px-28 border-b-2 border-gray-300">
        <Image
          src="/logo-regency.png"
          alt="Universitas Hasanuddin"
          width={500}
          height={500}
          className="w-14 h-14 object-contain"
        />
        {/*  */}
        <h2 className="text-3xl font-semibold text-blue-950">
          Desa Sibulu, Kecamatan Kajang, Kab. Bulukumba
        </h2>
      </div>

      <div className="flex justify-center">
        <Image
          priority
          src="/image-home-hero.jpg"
          alt="Desa Sibulu"
          width={500}
          height={500}
          className="w-[50%] h-[90vh] object-fill"
        />

        <div className="w-[60%] font-sans flex flex-col justify-center px-16">
          <h4 className="text-4xl">Masuk</h4>
          {/*  */}
          <form
            onSubmit={signInForm.handleSubmit}
            className="mt-6 bg-gray-200 pt-4 pb-6 px-6 rounded-md flex flex-col gap-5"
          >
            <LoginInput
              placeholder="Masukkan email"
              label="Email"
              type="text"
              name="email"
              value={signInForm.values.email}
              onChange={signInForm.handleChange}
              error={
                signInForm.touched.email &&
                signInForm.errors.email !== undefined
              }
              helperText={signInForm.touched.email && signInForm.errors.email}
            />
            <LoginInput
              placeholder="Masukkan sandi"
              label="Kata Sandi"
              type="password"
              name="password"
              value={signInForm.values.password}
              onChange={signInForm.handleChange}
              error={
                signInForm.touched.password &&
                signInForm.errors.password !== undefined
              }
              helperText={
                signInForm.touched.password && signInForm.errors.password
              }
            />
            <LoginButton name="loginButton" loading={loading} />
          </form>
        </div>
      </div>

      {/* <button
        onClick={() => document.getElementById("register_modal").showModal()}
      >
        Regist
      </button>
      <RegisterModal /> */}
    </div>
  );
}
