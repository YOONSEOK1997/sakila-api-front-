import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CityEdit() {
  const { cityId } = useParams();
  const [city, setCity] = useState("");
    const [countryId, setCountryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost/cityOne/${cityId}`)
      .then((res) => res.json())
      .then((data) => setCity(data.city));
  }, [cityId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/city", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cityId, city }),
    })
      .then((res) => res.text())
      .then(() => navigate(`/CityOne/${cityId}`))
      .catch((err) => alert("수정 실패"));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4"> City 수정</h2>
         <h4>countryId</h4>
        <input
          type="text"
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />

      <h4>CityName</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
     
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          저장
        </button>
      </form>
    </div>
  );
}
