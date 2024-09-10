import React, { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ user }) => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async (user) => {
      try {
        if (!user) {
          return;
        }
        // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
        const profile = await getUserProfile();
        setNickname(profile.nickname || "");
        // setIsLogin(true);
      } catch (error) {
        console.error("프로필을 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ nickname });
      alert("프로필이 업데이트되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("프로필 업데이트 중 오류가 발생했습니다:", error);
      alert("프로필 업데이트 실패.");
    }
  };

  if (!user) {
    return <div>로그인 해주세요.</div>; // 적절한 메시지 또는 리다이렉트 처리
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">프로필 수정</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            닉네임:
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-600"
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
