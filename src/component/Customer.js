import { useEffect, useState } from "react";

export default function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    fetch(`http://localhost/customerList/${pageNum}`)
      .then((res) => res.json())
      .then((data) => setCustomerList(data.content));
  }, [pageNum]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Customer List</h1>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((c) => (
              <tr key={c.customerId} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{c.firstName}</td>
                <td className="py-2 px-4 border-b">{c.lastName}</td>
              </tr>
            ))}
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
          className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          다음
        </button>
      </div>
    </div>
  );
}
