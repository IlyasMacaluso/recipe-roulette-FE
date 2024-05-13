import { useState } from "react";

export function useForm() {
  const [data, setData] = useState(createData());
  const [passError, setPassError] = useState(null);

  function createData() {
    return {
      username: ``,
      email: ``,
      password: ``,
      confirmPass: ``,
      check: ``,
    };
  }

  // functions necessarie per la gestione di form senza checkbox
  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setData((d) => {
      return {
        ...d,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
  }


  // functions necessarie per la gestione di form con checkbox e verifica password


  function handleInputCheckbox(e) {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    const type = e.target.type;

    setData((d) => {
      return {
        ...d,
        [name]: type === `checkbox` ? checked : value,
      };
    });
  }

  function handleSubmitVerifyPassword(e) {
    e.preventDefault();

    if (data.password === data.confirmPass) {
      console.log(data);
    } else {
      setPassError(`Please, confirm your password correctly`);
    }
  }

  return {
    data,
    passError,
    handleInput,
    handleSubmit,
    handleInputCheckbox,
    handleSubmitVerifyPassword,
  };
}
