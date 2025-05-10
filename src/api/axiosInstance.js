import axios from "axios";
// import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "/api", // 빈 문자열로 설정, 프록시 설정 사용
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 응답 인터셉터
// api.interceptors.response.use(
//   (response) => response, // 성공 시 응답 반환
//   (error) => {
//     if (error.response && error.response.status === 403) {
//       toast.error("😣 오류가 발생했습니다...", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         style: {
//           color: "#eee", // 텍스트 색상
//           fontWeight: "bold", // 글자 굵기
//           fontSize: "14px", // 글자 크기
//         },
//       });
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
