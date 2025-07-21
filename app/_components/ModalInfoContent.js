import { items, intro } from "@/app/_lib/data";

export default function ModalInfoContent() {
  return (
    <div className="px-12 space-y-4 text-sm">
      <h2 className="text-4xl text-center font-light tracking-wider text-[rgba(230,193,85,0.8)] font-[Dancing_Script]">
        Liascope
      </h2>
      <h2 className="text-2xl text-center -mt-3 font-light tracking-widest text-[rgba(230,193,85,0.8)] font-[Dancing_Script]">
        your sun your scope
      </h2>
      <p>
       {intro}
      </p>
      {items.map(({ title, description }, index) => (
        <div key={index}>
          <h3 className="font-semibold">{title}</h3>
          <p>{description}</p>
        </div>
      ))}
      <p className="text-xs text-gray-600 py-5">
        Liascope is for informational and entertainment purposes only. <br />
        © 2025 Liascope | Developed & Created with ✨ by Zeliha Akin. All rights reserved.
      </p>
    </div>
  );
}
