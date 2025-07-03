import { useParams, useNavigate } from "react-router-dom";  // useNavigate 추가
import { useState } from "react";

export default function CityAdd() {
  const { countryId } = useParams();
  const navigate = useNavigate();  // navigate 선언
  const [city, setCity] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const cityData = {
      city,
      countryId: parseInt(countryId),
    };

    fetch("http://localhost/city", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cityData)
    })
    .then((res) => {
      if (!res.ok) throw new Error("등록 실패");
      return res.text();
    })
    .then(() => {
      alert("등록 성공");  // 등록 성공 alert 추가
      navigate("/city");
    })
    .catch((err) => alert(err));
  };  // handleSubmit 닫는 중괄호 여기서 닫아야 함

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">City 등록 (Country ID: {countryId})</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="도시 이름"
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          등록
        </button>
      </form>
    </div>
  );
}
