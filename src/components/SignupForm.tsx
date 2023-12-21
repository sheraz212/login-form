import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=]|[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;


const SignupFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Must be atleast 3 characters")
    .max(15, "Maximun 15 characters allowed"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(passwordRegex, 'Password must be at least 8 characters and contain at least one special character, one number, one uppercase letter, and one lowercase letter')
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .nullable()
    .required("Confirm Password is required"),
});

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupFormSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <hr className="mb-4 border-gray-300" />

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Username
          </label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="username"
                placeholder="Enter your username"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
            )}
          />
          <p className="text-red-500 text-xs italic text-start">
            {errors.username?.message}
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            )}
          />
          <p className="text-red-500 text-xs italic text-start">
            {errors.email?.message}
          </p>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
            )}
          />
          <p className="text-red-500 text-xs italic text-start">
            {errors.password?.message}
          </p>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
            )}
          />
          <p className="text-red-500 text-xs italic text-start">
            {errors.confirmPassword?.message}
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <div className="mb-4 text-center text-gray-600">
          <span>Or sign up with</span>
        </div>

        <div className="flex items-center justify-around">
          <button
            className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 m-1"
            type="button"
          >
            Facebook
          </button>
          <button
            className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 m-1"
            type="button"
          >
            Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
