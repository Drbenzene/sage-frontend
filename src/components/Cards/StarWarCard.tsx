import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";
import { motion } from "framer-motion";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface StarCardDto {
  items: any[];
}

export default function StarWarCards({ items }: StarCardDto) {
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  /**
   * @param item
   */
  const toggleFavorite = (item: any) => {
    let updatedFavorites = [...favorites];

    // Define a unique identifier for the item based on its properties
    const identifier = item.name || item.title;

    // Check if the identifier exists in the current favorites list
    if (
      updatedFavorites.some(
        (fav: any) => (fav.name || fav.title) === identifier
      )
    ) {
      // If it exists, remove it
      updatedFavorites = updatedFavorites.filter(
        (fav: any) => (fav.name || fav.title) !== identifier
      );
    } else {
      // If it doesn't exist, add it
      updatedFavorites.push(item);
    }

    // Update the favorites and save to localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <div className="-mx-px gap-3 grid grid-cols-1 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {items?.map((item: any, index: number) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.5 },
              }}
              key={index}
              className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 relative"
            >
              {/* Favorite Action */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    toggleFavorite(item);
                    toast.success("Favorites updated successfully");
                  }}
                >
                  <StarIcon
                    className={classNames(
                      "h-6 w-6",
                      favorites?.some((fav: any) => {
                        const favIdentifier = fav.id || fav.name || fav.title;
                        const itemIdentifier =
                          item.id || item.name || item.title;
                        return favIdentifier === itemIdentifier;
                      })
                        ? "text-yellow-400"
                        : "text-gray-300"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="px-6 py-4">
                <h2 className="md:text-xl font-bold text-gray-900 mb-2">
                  {item.name || item.title}
                </h2>

                {item?.director && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Director:</span>{" "}
                    {item?.director}
                  </p>
                )}

                {item?.producer && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Producer:</span>{" "}
                    {item?.producer}
                  </p>
                )}

                {item?.release_date && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Release Date:</span>{" "}
                    {item?.release_date}
                  </p>
                )}

                {item?.climate && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Climate:</span>{" "}
                    {item?.climate}
                  </p>
                )}

                {item.diameter && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Diameter:</span>{" "}
                    {item.diameter} km
                  </p>
                )}

                {item.gravity && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Gravity:</span>{" "}
                    {item.gravity}
                  </p>
                )}

                {item.orbital_period && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Orbital Period:</span>{" "}
                    {item.orbital_period} days
                  </p>
                )}

                {item.rotation_period && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Rotation Period:</span>{" "}
                    {item.rotation_period} hours
                  </p>
                )}

                {item.population && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Population:</span>{" "}
                    {item.population}
                  </p>
                )}

                {item.terrain && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Terrain:</span>{" "}
                    {item.terrain}
                  </p>
                )}

                {item.surface_water && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Surface Water:</span>{" "}
                    {item.surface_water}%
                  </p>
                )}

                {item.birth_year && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Birth Year:</span>{" "}
                    {item.birth_year}
                  </p>
                )}

                {item.eye_color && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Eye Color:</span>{" "}
                    {item.eye_color}
                  </p>
                )}

                {item.gender && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Gender:</span> {item.gender}
                  </p>
                )}

                {item.hair_color && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Hair Color:</span>{" "}
                    {item.hair_color}
                  </p>
                )}

                {item.height && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Height:</span> {item.height}{" "}
                    cm
                  </p>
                )}

                {item.mass && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Mass:</span> {item.mass} kg
                  </p>
                )}

                <div className="mt-4">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    More Info
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
