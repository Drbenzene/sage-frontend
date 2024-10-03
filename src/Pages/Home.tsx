import { useEffect, useState } from "react";
import HomeLayout from "../components/Layout/HomeLayout";
import StarWarCards from "../components/Cards/StarWarCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../services/store";
import { getStarWarsAction } from "../services/reducers/starWarsReducer";
import StarWarPagination from "../components/Pagination/Starwarpagination";
function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { starwars } = useSelector((state: RootState) => state.getStarWars);
  const [resource, setResource] = useState(
    sessionStorage.getItem("resource") || "planets"
  );

  let filters = {
    resource: resource,
  };

  useEffect(() => {
    dispatch(getStarWarsAction(filters));
  }, [dispatch]);

  const resourceTypes = ["planets", "people", "films"];

  return (
    <HomeLayout>
      <div className="">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8 flex justify-between items-center mb-5">
          <p className="font-extrabold text-3xl capitalize">{resource}</p>
          <div className="flex flex-col  my-2">
            <select
              id="type"
              name="type"
              value={resource}
              onChange={(e) => {
                setResource(e.target.value);
                sessionStorage.setItem("resource", e.target.value);
                dispatch(
                  getStarWarsAction({
                    resource: e.target.value,
                  })
                );
              }}
              className="block w-full rounded-md py-2 text-gray-900 shadow-sm placeholder:text-[#B1B1B1] border border-[#B1B1B1] focus:border-none focus:border-0 sm:text-sm sm:leading-6"
            >
              <option className="disabled hidden">
                Select Starwar Resource
              </option>
              <option value="" disabled>
                Select Starwar Resource
              </option>
              {resourceTypes.map((item) => (
                <option value={item} key={item}>
                  {item?.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <StarWarCards items={starwars} />

        <StarWarPagination />
      </div>
    </HomeLayout>
  );
}

export default Home;
