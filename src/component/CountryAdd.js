import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CountryAdd() {
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/country", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("등록 실패");
        return res.text();
      })
      .then(() => navigate("/country"))
      .catch((err) => alert(err));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">🌍 Country 추가</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country name"
          className="w-full border rounded px-3 py-2"
          required
        />
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
          등록
        </button>
      </form>
    </div>
  );
}
