// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold">무료 성격 테스트</h1>
        <p className="mt-4">
          자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
        </p>
        <Link
          to="/test"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          MBTI 테스트 시작하기
        </Link>
      </div>
    </div>
  );
};

export default Home;
