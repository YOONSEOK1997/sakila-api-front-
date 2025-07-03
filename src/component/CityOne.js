import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CityOne() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null); // 초기값 null로 수정

  useEffect(() => {
    fetch(`http://localhost/cityOne/${cityId}`)
      .then(res => res.json())
      .then(data => setCity(data))
      .catch(err => console.error("데이터 로딩 실패:", err));
  }, [cityId]);

  if (!city) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    fetch(`http://localhost/city/${cityId}`, {
      method: "DELETE",
    })
      .then(res => {
        if (res.ok) {
          alert("삭제 성공");
          navigate("/city");
        } else {
          return res.text().then(msg => {
            throw new Error(msg || "삭제 실패");
          });
        }
      })
      .catch(err => {
        alert("삭제 실패: " + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-white-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">City Detail</h1>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">City ID:</span>
            <span>{city.cityId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">City:</span>
            <span>{city.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Last Update:</span>
            <span>{city.lastUpdate}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/city")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            목록으로
          </button>
          <button
            onClick={() => navigate(`/cityEdit/${city.cityId}`)}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
