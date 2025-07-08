import Image from "next/image";
import Input from "../functions/Input";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import usersApi from "@/api/modules/users.api";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/api/config/firebase.config";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setUser } from "@/redux/features/userSlice";
import { toast } from "react-toastify";

export default function RegisterModal() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const signUpForm = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email harus diisi"),
      firstName: Yup.string().required("Nama depan harus diisi"),
      lastName: Yup.string().required("Nama belakang harus diisi"),
      password: Yup.string()
        .min(8, "Setidaknya 8 karakter untuk password")
        .required("Password harus diisi"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password tidak cocok")
        .min(8, "Setidaknya 8 karakter untuk password")
        .required("Konfirmasi password harus diisi"),
    }),
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { response, error } = await usersApi.signUp({
          userUID: userCredential.user.uid,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        });
        if (response) {
          signUpForm.resetForm();
          dispatch(setUser(response));
          document.getElementById("register_modal").close();
          toast.success(`Selamat datang ${values.firstName}`);
          router.push("/dashboard");
        }
        if (error) setErrorMessage(error.message);
      } catch (error) {
        setErrorMessage("Pendaftaran gagal. Silahkan coba lagi");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <dialog id="register_modal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg border border-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Registrasi
        </h1>

        <form className="flex flex-col" onSubmit={signUpForm.handleSubmit}>
          <div className="flex gap-2">
            <Input
              name="firstName"
              placeholder="Nama Depan"
              type="text"
              value={signUpForm.values.firstName}
              onChange={signUpForm.handleChange}
              error={
                signUpForm.touched.firstName &&
                signUpForm.errors.firstName !== undefined
              }
              helperText={
                signUpForm.touched.firstName && signUpForm.errors.firstName
              }
            />
            <Input
              name="lastName"
              placeholder="Nama Belakang"
              type="text"
              value={signUpForm.values.lastName}
              onChange={signUpForm.handleChange}
              error={
                signUpForm.touched.lastName &&
                signUpForm.errors.lastName !== undefined
              }
              helperText={
                signUpForm.touched.lastName && signUpForm.errors.lastName
              }
            />
          </div>

          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={signUpForm.values.email}
            onChange={signUpForm.handleChange}
            error={
              signUpForm.touched.email && signUpForm.errors.email !== undefined
            }
            helperText={signUpForm.touched.email && signUpForm.errors.email}
          />

          <Input
            name="password"
            placeholder="Kata Sandi"
            type="password"
            value={signUpForm.values.password}
            onChange={signUpForm.handleChange}
            error={
              signUpForm.touched.password &&
              signUpForm.errors.password !== undefined
            }
            helperText={
              signUpForm.touched.password && signUpForm.errors.password
            }
          />

          <Input
            name="confirmPassword"
            placeholder="Konfirmasi Kata Sandi"
            type="password"
            value={signUpForm.values.confirmPassword}
            onChange={signUpForm.handleChange}
            error={
              signUpForm.touched.confirmPassword &&
              signUpForm.errors.confirmPassword !== undefined
            }
            helperText={
              signUpForm.touched.confirmPassword &&
              signUpForm.errors.confirmPassword
            }
          />
        </form>

        <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
          <ModalSubmitButton
            fullWidth
            loading={loading}
            onClick={() => signUpForm.handleSubmit()}
          >
            Register
          </ModalSubmitButton>
        </div>

        {errorMessage ? (
          <div className="alert alert-error mt-4 text-white text-sm font-semibold">
            <MdErrorOutline className="text-3xl" />
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
