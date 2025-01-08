  import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={HandleSubmit}>
     <input
          type="text"
          placeholder="Search your order"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-100/50 w-full px-4 py-2 text-sm text-gray-600 placeholder:text-sm placeholder:text-stone-600  rounded-full focus:outline-none focus:border-b-stone-700 hover:border-b-stone-700 transition-all"
          />
    </form>
  );
}
