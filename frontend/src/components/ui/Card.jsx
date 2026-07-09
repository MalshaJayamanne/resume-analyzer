export default function Card({ children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow">
      {children}
    </div>
  );
}