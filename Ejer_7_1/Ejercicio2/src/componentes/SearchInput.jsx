export default function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre o email"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

  