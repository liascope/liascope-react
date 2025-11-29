import Charts from "@/app/_components/Charts"

export const metadata = {
  title: 'Progression'
};

export default function Page() {   
 return <> <h2 className="chartHeader">
    Progression
   </h2><Charts chartID='progression'></Charts></>
}
