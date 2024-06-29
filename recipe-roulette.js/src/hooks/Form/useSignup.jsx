import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

export function useSignup() {
    const [data, setData] = useState(createData())
    const [passError, setPassError] = useState(null)
    const [isRegistered, setisRegistered] = useState()
    const navigate = useNavigate();

    //ho importato questi per settare nel localStorage i dati dell'utente ed effettuare l'accesso
    

    function createData() {
        return {
            username: ``,
            email: ``,
            password: ``,
            confirmPass: ``,
            check: false,
        }
    }

    function setItem(data) {
        try {
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          localStorage.setItem("password", data.password);
        } catch (error) {
          console.error("Error while saving to localStorage:", error);
        }
      }

    function handleInput(e) {
        const name = e.target.name
        const value = e.target.value
        const checked = e.target.checked
        const type = e.target.type

        setData((d) => {
            return {
                ...d,
                [name]: type === `checkbox` ? checked : value,
            }
        })
    }

    async function handlePostSignUpData(data) {
        try {
          const response = await fetch("http://localhost:3000/api/users/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: data.username,
              email: data.email, 
              password: data.password,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
    
          const responseData = await response.json();
          console.log(responseData);
          return responseData;
        } catch (error) {
          console.error("Error while fetching data:", error);
          throw error;
        }
      }

      const mutation = useMutation({
        mutationFn: handlePostSignUpData,
        onSuccess: (data) => {
          console.log(data);
          setItem(data);
          navigate("/login");
        },
        onError: (error) => {
          console.error("Signup failed:", error.message);
        },
      });

      function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
        if (data.password === data.confirmPass && data.check) {
            mutation.mutate({ email: data.email, username: data.username, password: data.password });
            setisRegistered(true)
        } else {
            console.log("Please, confirm your password correctly")
            setPassError(`Please, confirm your password correctly`)
        }
    }

    return {
        data,
        passError,
        isRegistered,
        handleInput,
        handleSubmit,
    }
}

