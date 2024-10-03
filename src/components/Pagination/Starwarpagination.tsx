import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../services/store";
import { getStarWarsAction } from "../../services/reducers/starWarsReducer";

function StarWarPagination() {
  const dispatch = useDispatch<AppDispatch>();
  const { starwars } = useSelector((state: RootState) => state.getStarWars);
  return (
    <div className="mt-10 flex h-28 w-full flex-col items-center justify-between rounded-sm bg-white md:h-20 md:flex-row">
      <div className="m-3 flex items-center justify-start space-x-3 px-3 md:m-0">
        <p className="text-hervestText text-sm ">Showing 1 to 10</p>
      </div>

      <div className="">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(selected: any) => {
            dispatch(
              getStarWarsAction({
                page: selected.selected + 1,
              })
            );
          }}
          pageRangeDisplayed={2}
          pageCount={5}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="flex text-sm md:pb-0 pb-5 space-x-5 justify-start items-center px-3 "
          nextClassName="cursor-pointer py-2 px-4 bg-secondary border border-gray-300 rounded-md"
          previousClassName="cursor-pointer py-2 px-4 bg-white border border-gray-300 rounded-md"
          pageClassName="cursor-pointer  py-2 px-4 bg-white border border-gray-300 rounded-md"
          activeClassName="bg-black text-white  "
          activeLinkClassName="text-white  bg-black w-full"
          disabledClassName="cursor-not-allowed"
          breakClassName="cursor-not-allowed"
          marginPagesDisplayed={1}
          pageLinkClassName="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default StarWarPagination;
