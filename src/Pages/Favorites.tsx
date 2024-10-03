import StarWarCards from "../components/Cards/StarWarCard";
import HomeLayout from "../components/Layout/HomeLayout";
function Favorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return (
    <HomeLayout>
      {favorites.length === 0 && (
        <div>
          <p className="font-extrabold text-2xl text-center w-full">
            No Favorite Added
          </p>
        </div>
      )}
      <StarWarCards items={favorites} />
    </HomeLayout>
  );
}

export default Favorites;
