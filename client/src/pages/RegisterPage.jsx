import Form from "../components/Form";

const RegisterPage = () => {
  return (
    <Form>
      <h2 className="text-3xl font-extrabold  mx-auto p-3">
        Create an account
      </h2>
      <Form.Email />
      <Form.Username />
      <Form.Password />
      <Form.ConfirmPassword />
      <button
        type="submit"
        className="w-full p-2 rounded-sm bg-blue-500 text-white"
      >
        Sign Up
      </button>
      <p className="mt-1 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="ml-2 text-blue-500">
          Login
        </a>
      </p>
    </Form>
  );
};

export default RegisterPage;
