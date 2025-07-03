import { useEffect, useState } from "react";
import { Link , useNavigate } from 'react-router-dom';
export default function City() {
  const [cityList, setCityList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
//  const navigate = useNavigate();
const [totalPages, setTotalPages] = useState(1);
 useEffect(() => {
  fetch(`http://localhost/cityList/${pageNum}`)
    .then(res => res.json())
    .then(data => {
      setCityList(data.content);
      setTotalPages(data.totalPages);  // totalPages 저장
    });
}, [pageNum]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">City List</h1>
      
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="py-2 px-4 border-b">City ID</th>
              <th className="py-2 px-4 border-b">CountryId</th>
              <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {
              cityList.map((c) => (
                <tr key={c.cityId} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{c.cityId}</td>
                  <td className="py-2 px-4 border-b"><Link to={`/CityOne/` + c.cityId}> {c.countryId} </Link></td>
                   <td className="py-2 px-4 border-b"><Link to={`/CityOne/` + c.cityId}> {c.city} </Link></td>
                                      <td className="py-2 px-4 border-b"><Link to={`/CityOne/` + c.cityId}> {c.lastUpdate} </Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

     <div className="mt-6 flex justify-center space-x-4">
  <button
    onClick={() => setPageNum(pageNum - 1)}
    disabled={pageNum === 1}
    className={`px-4 py-2 rounded text-white ${pageNum === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
  >
    이전
  </button>

  <span className="px-4 py-2 text-gray-700">Page {pageNum}</span>

  <button
    onClick={() => setPageNum(pageNum + 1)}
    disabled={pageNum === totalPages}
    className={`px-4 py-2 rounded text-white ${pageNum === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
  >
    다음
  </button>

  <button
    onClick={() => setPageNum(totalPages)}
    disabled={pageNum === totalPages}
    className={`px-4 py-2 rounded text-white ${pageNum === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
  >
    맨끝
  </button>
</div>

    </div>
  );
}
