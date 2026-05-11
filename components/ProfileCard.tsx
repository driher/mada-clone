import Image from "next/image";

type ProfileCardProps = {
  label: string;
  name: string;
  image?: string;
  content: string;
  color?: "green" | "pink" | "orange";
};

export default function ProfileCard({
  label,
  name,
  image,
  content,
  color = "green",
}: ProfileCardProps) {
  const colorMap: Record<string, string> = {
    green: "bg-green-600",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
  };

  const safeImage = image?.trim() ? image : "/no-image.jpg";

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex flex-col md:flex-row">

        {/* FOTO */}
        <div className="md:w-1/3 w-full h-64 relative">
         <Image
  src={safeImage}
  alt={name}
  fill
  loading="lazy"
  className="object-cover object-top transition duration-500 hover:scale-105"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
      
        </div>

        {/* TEXT */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">

          <span
            className={`inline-block text-xs font-semibold text-white px-3 py-1 rounded-full mb-3 ${colorMap[color]}`}
          >
            {label}
          </span>

          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
            {name}
          </h2>

          <div className={`w-12 h-1 ${colorMap[color]} mt-3 mb-4 rounded`} />

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {content}
          </p>

        </div>
      </div>
    </div>
  );
}