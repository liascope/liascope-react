
import Charts from "@/app/_components/Charts"

export const metadata = {
  title: 'Natal'
};

export default function Page() {   

  return (

      <div>
        <h2 className="chartHeader">
          Natal
        </h2>
        <Charts chartID='natal' />
      </div>
  )
}
