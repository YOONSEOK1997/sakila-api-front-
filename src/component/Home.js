export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-10">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 text-gray-800">
                <h1 className="text-4xl font-bold text-indigo-700 mb-6">🎬 Sakila Dashboard</h1>
                <p className="text-lg text-gray-600 mb-8">
                    영화 대여 서비스를 위한 Sakila 시스템에 오신 것을 환영합니다.<br />
                    아래 메뉴를 통해 각 테이블 정보를 확인하고 관리할 수 있습니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Country" description="국가 데이터 조회 및 관리" link="/Country" />
                    <Card title="City" description="도시 데이터 조회 및 관리" link="/City" />
                    <Card title="Address" description="주소 데이터 확인" link="/Address" />
                    <Card title="Customer" description="고객 정보 목록 확인" link="/Customer" />
                </div>

                <div className="mt-10 text-center text-sm text-gray-400">
                    &copy; 2025 GDJ91 Sakila Project. All rights reserved.
                </div>
            </div>
        </div>
    );
}

function Card({ title, description, link }) {
    return (
        <a href={link} className="block bg-indigo-50 hover:bg-indigo-100 transition rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
        </a>
    );
}
