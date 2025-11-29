import NatalTransit from "@/app/_components/NatalTransit";

export const metadata = {
  title: 'Natal & Transit'
};


export default function Page() {  

  return <> <h2 className="chartHeader">
     Natal & Transit
   </h2> <NatalTransit chartID ='natalTransit'></NatalTransit></>
}
