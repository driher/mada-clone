import Link from "next/link";

async function getCategories() {
  const res = await fetch(
    "https://mada.akarmusic.com/wp-json/wp/v2/categories",
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function CategoryNavbar() {
  const categories = await getCategories();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex gap-6 py-3 overflow-x-auto">
          {categories.map((cat: any) => (
            <li key={cat.id}>
              <Link
                href={`/kategori/${cat.id}`}
                className="text-sm font-medium text-gray-700 hover:text-orange-500 whitespace-nowrap"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}