import { useState, useEffect } from 'react';
import { useAuth } from "/src/hooks/Auth/useAuth.jsx";
import { useNavigate } from "@tanstack/react-router"

export function useProfile() {
    const [editing, setEditing] = useState(false);
    const [initialAvatar, setInitialAvatar] = useState("src/assets/images/3d_avatar_26.png");
    const [avatar, setAvatar] = useState("src/assets/images/3d_avatar_26.png");
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: "",
    });

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        const storedAvatar = localStorage.getItem("avatar");

        setSignupData((prevData) => ({
            ...prevData,
            username: storedUsername || "Amazing User",
            email: storedEmail || "email@provider.dominio",
        }));

        if (storedAvatar) {
            setAvatar(storedAvatar);
            setInitialAvatar(storedAvatar); 
        }
    }, []);

    const handleEditClick = () => setEditing(true);

    const handleDiscardClick = () => {
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        const storedAvatar = localStorage.getItem("avatar");

        setSignupData({
            username: storedUsername || "Amazing User",
            email: storedEmail || "email@provider.dominio",
            password: "",
            confirmPass: "",
        });

        setAvatar(initialAvatar);

        setEditing(false);
    };

    const handleSaveClick = () => {
        localStorage.setItem("username", signupData.username);
        localStorage.setItem("email", signupData.email);
        if (signupData.password === signupData.confirmPass && signupData.password !== "") {
            localStorage.setItem("password", signupData.password);
        }
        setEditing(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result);
            localStorage.setItem("avatar", reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSignupInput = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return {
        editing,
        avatar,
        signupData,
        handleEditClick,
        handleSaveClick,
        handleAvatarChange,
        handleSignupInput,
        handleDiscardClick,
    };
}
