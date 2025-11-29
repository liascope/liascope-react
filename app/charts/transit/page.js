import Charts from "@/app/_components/Charts"

export const metadata = {
  title: 'Transit'
};
  
export default function Page() {   
 return <>
 <h2 className="chartHeader">
     Transit
   </h2>
 <Charts chartID='transit'></Charts></>
}
