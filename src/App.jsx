import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import TestPage from "./pages/TestPage";
import TestResultPage from "./pages/TestResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { getUserProfile } from "./api/auth";

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 사용자가 로그인된 상태라면 사용자 정보를 가져옴
        const Profile = await getUserProfile();
        setUser(Profile);
      } catch (error) {
        console.log("로그인된 사용자가 없습니다.");
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <Layout
        user={user}
        setUser={setUser}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      >
        <Routes>
          {/* 홈 페이지 */}
          <Route path="/" element={<Home />} />

          {/* 로그인 페이지 */}
          <Route
            path="/login"
            element={<Login setUser={setUser} setIsLogin={setIsLogin} />}
          />

          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<Signup />} />

          {/* 보호된 라우트 - 로그인된 사용자만 접근 가능 */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <ProfilePage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/test"
            element={
              <ProtectedRoute user={user}>
                <TestPage user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/results"
            element={
              <ProtectedRoute user={user}>
                <TestResultPage user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
