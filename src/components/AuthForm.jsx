import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ mode, onSubmit }) => {
  const navigate = useNavigate();
  // 폼 데이터 상태 관리 (id, password는 공통, nickname은 회원가입에만 사용)
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: mode === "signup" ? "" : undefined,
  });

  // 입력값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(formData);
      if (mode === "signup") {
        navigate("/login");
      }
    } catch (error) {
      console.error("회원가입 또는 로그인 처리 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 아이디 입력 필드 */}
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="아이디"
        required
        className="w-full p-4 border border-gray-300 rounded-lg"
      />

      {/* 비밀번호 입력 필드 */}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
        required
        className="w-full p-4 border border-gray-300 rounded-lg"
      />

      {/* 회원가입일 때만 표시되는 닉네임 입력 필드 */}
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full p-4 bg-blue-500 text-white rounded-lg"
      >
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
