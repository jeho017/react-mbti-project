import React, { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import { login, getUserProfile } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser, setIsLogin }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handleLogin = async (formData) => {
  //   try {
  //     // 로그인 API 호출
  //     const data = await login(formData);
  //     const userProfile = await getUserProfile();

  //     // 로그인 성공 시 사용자 정보 설정 및 페이지 이동
  //     setUser(userProfile);
  //     navigate("/profile");
  //   } catch (error) {
  //     setError("로그인에 실패했습니다. 다시 시도해주세요.");
  //   }
  // };

  const handleLogin = async (formData) => {
    try {
      // 로그인 API 호출
      const userData = await login(formData);

      setUser(userData);
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-4 text-center">
          <p>
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
