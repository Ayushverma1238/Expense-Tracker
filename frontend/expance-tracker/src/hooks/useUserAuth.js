import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPath";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          clearUser();
          navigate("/login");
          return;
        }
        const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data");

        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};
