import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './component/Home';
import Country from './component/Country';
import City from './component/City';
import Address from './component/Address';
import Customer from './component/Customer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
        
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <h1 className="text-3xl font-bold text-center text-indigo-600">Sakila Project</h1>
          <nav className="mt-4">
            <ul className="flex justify-center space-x-6 text-lg font-medium">
              <li><Link to="/" className="hover:text-indigo-500 transition">Home</Link></li>
              <li><Link to="/Country" className="hover:text-indigo-500 transition">Country</Link></li>
              <li><Link to="/City" className="hover:text-indigo-500 transition">City</Link></li>
              <li><Link to="/Address" className="hover:text-indigo-500 transition">Address</Link></li>
              <li><Link to="/Customer" className="hover:text-indigo-500 transition">Customer</Link></li>
            </ul>
          </nav>
        </header>

        {/* Content */}
        <main className="flex-grow container mx-auto p-6 bg-white rounded-md shadow mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Country" element={<Country />} />
            <Route path="/City" element={<City />} />
            <Route path="/Address" element={<Address />} />
            <Route path="/Customer" element={<Customer />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white text-center py-4 mt-10 border-t">
          <p className="text-sm text-gray-600">Copyright © GDJ91</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
