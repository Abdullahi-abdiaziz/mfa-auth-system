import Form from "../components/Form";

const LoginPage = () => {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Form onSubmit={onSubmit}>
      <h2 className="mx-auto text-3xl font-extrabold p-3">Login account</h2>
      <Form.Email />
      <Form.Password />
      <button
        type="submit"
        className="w-full p-2 rounded-sm bg-blue-500 text-white"
      >
        Login
      </button>
      <p className="mt-1 text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="ml-2 text-blue-500">
          Sign up
        </a>
      </p>
    </Form>
  );
};

export default LoginPage;
