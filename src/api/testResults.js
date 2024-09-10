import axios from "axios";

const API_URL = "http://localhost:5000/testResults";

// 테스트 결과 리스트 가져오기 (GET)
export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 새로운 테스트 결과 생성 (POST)
export const createTestResult = async (resultData) => {
  try {
    const response = await axios.post(API_URL, resultData);
    return response.data;
  } catch (error) {
    console.error("테스트 결과 생성 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 특정 테스트 결과 삭제 (DELETE)
export const deleteTestResult = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `테스트 결과 삭제 중 오류가 발생했습니다 (ID: ${id}):`,
      error
    );
    throw error;
  }
};

// 테스트 결과 가시성 업데이트 (PATCH)
export const updateTestResultVisibility = async (id, visibility) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { visibility });
    return response.data;
  } catch (error) {
    console.error(
      `테스트 결과 가시성 업데이트 중 오류가 발생했습니다 (ID: ${id}):`,
      error
    );
    throw error;
  }
};
