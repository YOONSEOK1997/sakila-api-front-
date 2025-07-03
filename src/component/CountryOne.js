import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CountryOne() {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null); // 초기값 null로 수정

  useEffect(() => {
    fetch(`http://localhost/countryOne/${countryId}`)
      .then(res => res.json())
      .then(data => setCountry(data))
      .catch(err => console.error("데이터 로딩 실패:", err));
  }, [countryId]);

  if (!country) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    fetch(`http://localhost/country/${countryId}`, {
      method: "DELETE",
    })
      .then(res => {
        if (res.ok) {
          alert("삭제 성공");
          navigate("/country");
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
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">Country Detail</h1>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Country ID:</span>
            <span>{country.countryId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Country:</span>
            <span>{country.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Last Update:</span>
            <span>{country.lastUpdate}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/country")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            목록으로
          </button>
          <button
            onClick={() => navigate(`/countryEdit/${country.countryId}`)}
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
          <button
  onClick={() => navigate(`/cityAdd/${country.countryId}`)}
  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
>
  City등록
</button>
        </div>
      </div>
    </div>
  );
}
