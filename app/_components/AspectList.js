export default function AspectList({ data }) {

if (!data) return null;

const chunks = [data.aspectList];

  return (<div>
  {chunks.map((chunk, colIdx) => (
    <ul key={colIdx} className="space-y-1">
      {chunk.map((a, i) => (
        <li key={i}>{a}</li>
      ))}
    </ul>
  ))}
</div>
  );
}
