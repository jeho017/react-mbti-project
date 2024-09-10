import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

// 회원가입 API 요청
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log("response:", response);
    return response.data;
  } catch (error) {
    console.error("회원가입 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 로그인 API 요청 (JWT 토큰 발급)
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  console.log("로그인 응답:", response.data);
  if (response.data.accessToken) {
    // 받은 JWT 토큰을 localStorage에 저장
    localStorage.setItem("token", response.data.accessToken);
    console.log("토큰 저장됨:", response.data.accessToken);
  } else {
    console.error("토큰이 응답에 포함되어 있지 않다.");
  }
  console.log("userData:", userData);
  return response.data;
};

// JWT 토큰을 통해 사용자 프로필 정보 조회
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  console.log("저장된 토큰:", token);

  if (!token) {
    throw new Error("사용자가 로그인되어 있지 않습니다.");
  }

  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("프로필 응답:", response.data);
  return response.data;
};

// 프로필 업데이트 API 요청
export const updateProfile = async (formData) => {
  const token = localStorage.getItem("token");
  console.log("저장된 토큰:", token);

  if (!token) {
    throw new Error("사용자가 로그인되어 있지 않습니다.");
  }

  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
      "Content-Type": "application/json",
    },
  });
  console.log("프로필 업데이트 응답:", response.data);
  return response.data;
};

// 로그아웃 함수: 토큰 제거
export const logout = () => {
  localStorage.removeItem("token");
};
