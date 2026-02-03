export default function Skills({
  groups,
}: {
  groups: { category: string; items: string[] }[];
}) {
  if (!groups?.length) return null;

  return (
    <section className="text-xs">
      <h2 className="font-semibold tracking-wide uppercase text-neutral-800 border-b border-neutral-200">
        Skills
      </h2>

      {groups.map((g) => (
          <div key={g.category}>
            <span className="font-medium text-neutral-900">{g.category}: </span>
            <span className="text-neutral-800">{g.items.join(", ")}</span>
          </div>
        ))}
    </section>
  );
}
