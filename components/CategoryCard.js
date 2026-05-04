"use client";
import Link from 'next/link';
import Image from 'next/image';

const CategoryCard = ({ img, title, desc, href, linkText }) => (
  <div className="p-6 bg-white/80 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-md flex flex-col h-full">
    <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg">
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover object-top hover:scale-110 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
    <h3 className="text-2xl font-bold text-indigo-950 mb-2">{title}</h3>
    <p className="text-gray-700 mb-6 flex-grow leading-relaxed">{desc}</p>
    <Link 
      href={href} 
      className="inline-block py-3 px-6 bg-yellow-800 text-white font-bold rounded-md hover:bg-yellow-700 transition-colors text-center mt-auto"
    >
      {linkText}
    </Link>
  </div>
);

export default CategoryCard;