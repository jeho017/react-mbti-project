import React from "react";
import { Navigate } from "react-router-dom";

// 사용자가 로그인된 상태에서만 접근 가능한 보호된 라우트
const ProtectedRoute = ({ user, children }) => {
  // user 정보가 없으면 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" />;
  }

  // user가 존재하면 보호된 페이지 접근 허용
  return children;
};

export default ProtectedRoute;
