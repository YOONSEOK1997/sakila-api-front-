import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import Home from './component/Home';
import Country from './component/Country';
import City from './component/City';
import Address from './component/Address';
import Customer from './component/Customer';
import CountryOne from './component/CountryOne';
import CountryAdd from './component/CountryAdd';
import CountryEdit from "./component/CountryEdit";
import CityOne from './component/CityOne';
import CityAdd from './component/CityAdd';
import CityEdit from "./component/CityEdit";

function Navigation() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Country", to: "/Country" },
    { label: "City", to: "/City" },
    { label: "Address", to: "/Address" },
    { label: "Customer", to: "/Customer" }
  ];

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-6 text-lg font-medium">
        {navItems.map(({ label, to }) => {
          const isActive = pathname === to || pathname.startsWith(to + "/");
          return (
            <li key={to}>
              <Link
                to={to}
                className={`transition ${
                  isActive
                    ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
                    : "hover:text-indigo-500"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
        
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <h1 className="text-3xl font-bold text-center text-indigo-600">Sakila Project</h1>
          <Navigation />
        </header>

        {/* Content */}
        <main className="flex-grow container mx-auto p-6 bg-white rounded-md shadow mt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            
            
            {/*country*/} 
            <Route path="/Country" element={<Country />} />
            <Route path="/countryOne/:countryId" element={<CountryOne />} /> 
            <Route path="/countryEdit/:countryId" element={<CountryEdit />} />
            <Route path="/countryAdd" element={<CountryAdd />} />
            {/*city*/}
            <Route path="/City" element={<City />} />
            <Route path="/cityOne/:cityId" element={<CityOne />} /> 
            <Route path="/cityEdit/:cityId" element={<CityEdit />} />
            <Route path="/cityAdd/:countryId" element={<CityAdd />} />
            {/*Address*/} 
            <Route path="/Address" element={<Address />} />
            {/*Customer*/} 
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
