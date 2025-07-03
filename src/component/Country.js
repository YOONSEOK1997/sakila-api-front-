import { useEffect, useState } from "react";
import { Link , useNavigate } from 'react-router-dom';
export default function Country() {
  const [countryList, setCountryList] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetch(`http://localhost/countryList/${pageNum}`)
      .then((res) => res.json())
      .then((data) => {
        setCountryList(data.content)
        setTotalPages(data.totalPages);
    });
      
  }, [pageNum]);

  // 페이징 블럭 설정 (10페이지 단위)
  const pageBlockSize = 10;
  const currentBlock = Math.floor((pageNum - 1) / pageBlockSize);
  const startPage = currentBlock * pageBlockSize + 1;
  const endPage = Math.min(startPage + pageBlockSize - 1, totalPages);

  // 이전 10페이지 블럭 이동
  const handlePrevBlock = () => {
    const prevPage = Math.max(startPage - 1 - pageBlockSize + 1, 1);
    setPageNum(prevPage);
  };

  // 다음 10페이지 블럭 이동
  const handleNextBlock = () => {
    const nextPage = Math.min(endPage + 1, totalPages);
    setPageNum(nextPage);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Country List</h1>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="py-2 px-4 border-b">Country ID</th>
              <th className="py-2 px-4 border-b">Country</th>
            </tr>
          </thead>
          <tbody>
            {countryList.map((c) => (
              <tr key={c.countryId} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{c.countryId}</td>
                <td className="py-2 px-4 border-b"><Link to={`/CountryOne/` + c.countryId}> {c.country} </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

          {/* 페이징 버튼 */}
      <div className="mt-6 flex justify-center space-x-2">
        {/* 처음 페이지 */}
        <button
          onClick={() => setPageNum(1)}
          disabled={pageNum === 1}
          className={`px-3 py-1 rounded text-white ${
            pageNum === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {"맨 처음"}
        </button>

        {/* 이전 10페이지 */}
        <button
          onClick={handlePrevBlock}
          disabled={startPage === 1}
          className={`px-3 py-1 rounded text-white ${
            startPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {"이전"}
        </button>

        {/* 페이지 번호 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            onClick={() => setPageNum(page)}
            className={`px-3 py-1 rounded ${
              page === pageNum ? "bg-indigo-700 text-white font-bold" : "bg-indigo-100 text-indigo-700 hover:bg-indigo-300"
            }`}
          >
            {page}
          </button>
        ))}

        {/* 다음 10페이지 */}
        <button
          onClick={handleNextBlock}
          disabled={endPage === totalPages}
          className={`px-3 py-1 rounded text-white ${
            endPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {"다음"}
        </button>

        {/* 마지막 페이지 */}
        <button
          onClick={() => setPageNum(totalPages)}
          disabled={pageNum === totalPages}
          className={`px-3 py-1 rounded text-white ${
            pageNum === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {"맨 끝"}
        </button>
      </div>
        <br>
        </br>
          <button
            onClick={() => navigate("/countryAdd")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            등록
          </button>
  
    </div>
  );
}
