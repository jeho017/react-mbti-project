import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ user, setUser, children, isLogin, setIsLogin }) => {
  const handleLogout = () => {
    setUser(null);
    setIsLogin(false);
    localStorage.removeItem("token"); // JWT 토큰 삭제
  };

  return (
    <div>
      <header>
        <nav className="flex items-center p-4 bg-gray-800 text-white">
          <div className="flex-grow flex items-center">
            <Link to="/" className="text-xl">
              홈
            </Link>
          </div>
          <div className="flex space-x-4">
            {!isLogin ? (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </>
            ) : (
              <>
                <Link to="/profile">프로필</Link>
                <Link to="/test">테스트</Link>
                <Link to="/results">결과 보기</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded text-white"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
