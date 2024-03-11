import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./components/Input";
import InputError from "./components/InputError";
import { Isignup, signupSchema } from "../src/validations/Auth";

function App() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Isignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<Isignup> = ({
    first_name,
    last_name,
    email,
    password,
  }) => {
    const user = {
      first_name,
      last_name,
      email,
      password,
    };
    reset();
    console.log(user);
  };
  const signupInputs = [
    {
      type: "text",
      placeholder: "Enter your first name",
      register: register("first_name"),
      error: errors.first_name,
    },
    {
      type: "text",
      placeholder: "Enter your last name",
      register: register("last_name"),
      error: errors.last_name,
    },
    {
      type: "email",
      placeholder: "Enter your email",
      register: register("email"),
      error: errors.email,
    },
    {
      type: "password",
      placeholder: "Enter your password",
      register: register("password"),
      error: errors.password,
    },
    {
      type: "password",
      placeholder: "Enter your confirm password",
      register: register("confirm_password"),
      error: errors.confirm_password,
    },
  ];

  return (
    <>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {signupInputs.map((input) => (
          <div key={input.placeholder}>
            <Input
              type={input.type}
              placeholder={input.placeholder}
              register={input.register}
            />
            <InputError error={input.error} />
          </div>
        ))}

        <button type="submit" disabled={isSubmitting}>
          Signup
        </button>
      </form>
    </>
  );
}

export default App;
