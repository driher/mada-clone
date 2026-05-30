export default function SidebarFilter() {
  return (
    <div className="bg-white rounded-2xl border p-5 sticky top-5">

      <h3 className="font-bold text-lg mb-5">
        Filter Pencarian
      </h3>

      <div className="space-y-4">

        <select className="w-full border rounded-xl p-3">
          <option>Semua Bidang</option>
        </select>

        <select className="w-full border rounded-xl p-3">
          <option>Semua Kota</option>
        </select>

        <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl">
          Terapkan Filter
        </button>

      </div>
    </div>
  );
}