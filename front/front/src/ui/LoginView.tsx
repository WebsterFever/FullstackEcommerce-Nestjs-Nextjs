"use client";

import { useAuth } from "@/context/AuthContext";
import { validateLoginForm } from "@/lib/validate";
import { login } from "@/services/authService";
import { Formik } from "formik";
import { useRouter } from "next/navigation";

const LoginView = () => {

  const {setUserData} = useAuth()
  const router = useRouter();

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

      <h1 className="text-2xl font-bold text-center mb-6">
        Welcome to WSL Store
      </h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validateLoginForm}
        onSubmit={async (values) => {
          const response = await login(values)
          const { user, token } = response;
          setUserData({token, user})
          router.push("/")
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

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>

          </form>
        )}
      </Formik>
    </div>
  </div>
);
}

export default LoginView;