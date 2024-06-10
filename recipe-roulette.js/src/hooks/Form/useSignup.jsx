import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/Snackbar/useSnackbar";

export function useSignup() {
  const [data, setData] = useState(createData());
  const [passError, setPassError] = useState(null);
  const {handleOpenSnackbar } = useSnackbar()
  const navigate = useNavigate()

  function createData() {
    return {
      username: ``,
      email: ``,
      password: ``,
      confirmPass: ``,
      check: ``,
    };
  }

  function handleInput(e) {
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

  function handleSubmit(e) {
    e.preventDefault();
    if (data.password === data.confirmPass) {
      console.log(data);
      setTimeout(() => {
        navigate("/login")
      }, 1500);
      handleOpenSnackbar("Registration successful, please log in to access the app")
    } else {
      setPassError(`Please, confirm your password correctly`);
    }
  }

  return {
    data,
    passError,
    handleInput,
    handleSubmit,
  };
}
