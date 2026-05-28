"use client";

import { useRouter } from "next/navigation";
import { validateRegisterForm } from "@/lib/validate";
import { register } from "@/services/authService";
import { Formik } from "formik";

const RegisterView = () => {
  const router = useRouter(); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            address: "",
            phone: "",
          }}
          validate={validateRegisterForm}
          onSubmit={async (values) => {
            await register(values);
            router.push("/login");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <input
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                placeholder="Enter your address"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.address && touched.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}

              <input
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="Enter your phone"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                {isSubmitting ? "Loading..." : "Create Account"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterView;