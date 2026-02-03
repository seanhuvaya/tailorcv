export default function Summary({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <section>
      <h2 className="text-xs font-semibold tracking-wide uppercase text-neutral-800 border-b border-neutral-200">
        Summary
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-justify text-neutral-800">{text}</p>
    </section>
  );
}
