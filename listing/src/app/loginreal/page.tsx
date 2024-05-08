import * as React from "react";

interface FormInputProps {
  type: string;
  placeholder: string;
  name: string;
  className: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ type, placeholder, name, className, required = false }) => {
  return <input type={type} placeholder={placeholder} name={name} className={className} required={required} />;
};

const MyComponent: React.FC = () => {
  return (
    <div className="box-border relative overflow-hidden mt-5 w-full min-h-screen">
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F25fd6ed351994175ac507a1dcdcba146%2F3cb9462f99064364b1c99132a8587f9c"
        alt=""
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div className="box-border absolute inset-0 flex flex-col justify-center px-5 pb-4 mx-auto text-xs" style={{ maxWidth: 1200, fontFamily: 'Roboto, sans-serif' }}>
        <header className="box-border relative pb-4 text-center">
          <h1 style={{ fontSize: "100px" }}>Cartier</h1>
        </header>
        <div className="box-border relative self-center mt-5 text-4xl">
          <p>
            <br />
          </p>
        </div>
        <form className="box-border flex flex-col items-center mt-5">
          <FormInput
            type="text"
            placeholder="Username"
            name="Username"
            className="box-border flex relative flex-col shrink-0 py-2.5 pr-16 pl-2.5 rounded border border-solid border-stone-300"
          />
          <FormInput
            type="password"
            placeholder="Password"
            name="Password"
            className="box-border flex relative flex-col shrink-0 py-2.5 pr-16 pl-2.5 mt-5 rounded border border-solid border-stone-300"
          />
          <div className="flex mt-5 space-x-4">
            <button
              type="submit"
              className="box-border flex-1 px-6 py-4 text-center rounded appearance-none cursor-pointer bg-[black] text-[white]"
            >
              Login
            </button>
            <button
              type="button"
              className="box-border flex-1 px-6 py-4 text-center rounded appearance-none cursor-pointer bg-[black] text-[white]"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyComponent;
