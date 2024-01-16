import { Form, Formik } from "formik";
import { LoginRequest } from "../api/users.api";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            const response = await LoginRequest(values);

            window.localStorage.setItem("user_id", response.user_id);
            navigate("/notes");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className=" bg-zinc-700 max-w-sm rounded-xl p-4 mx-auto"
          >
            <h1 className="text-5xl text-white font-bold text-center pb-2">
              {" "}
              Login
            </h1>
            <label className="text-white">email</label>
            <input
              className="px-2 py-1 rounded-md w-full mb-3"
              type="text"
              name="email"
              placeholder="example@hotmail.com"
              onChange={handleChange}
            />
            <label className="text-white"> password</label>
            <input
              className="px-2 py-1 rounded-md w-full mb-3"
              type="password"
              name="password"
              placeholder="**********"
              onChange={handleChange}
            />
            <button
              className="bg-slate-500 text-white hover:text-gray-300 hover:bg-slate-600 font-bold py-2 px-4 rounded-md w-full"
              type="submit"
            >
              {" "}
              Log in{" "}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
