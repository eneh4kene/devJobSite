type SearchFormProp = {
  searchText: string;
  setSearchText: (searchText: string)=> void;
}

export default function SearchForm({ searchText, setSearchText }:SearchFormProp) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
