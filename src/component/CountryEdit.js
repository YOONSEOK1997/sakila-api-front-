import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CountryEdit() {
  const { countryId } = useParams();
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost/countryOne/${countryId}`)
      .then((res) => res.json())
      .then((data) => setCountry(data.country));
  }, [countryId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/country", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ countryId, country }),
    })
      .then((res) => res.text())
      .then(() => navigate(`/CountryOne/${countryId}`))
      .catch((err) => alert("수정 실패"));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4"> Country 수정</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
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
