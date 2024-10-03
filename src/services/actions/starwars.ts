import APICall from "../APICALL";

const getStarWars = async (resource: string, payload?: any) => {
  const filters = stringifyFilter(payload);
  const res = await APICall(`${resource}${filters}`, "GET");
  return res;
};

export const stringifyFilter = (filter: any, allowNull?: boolean) => {
  let filterString = "";
  if (!filter || typeof filter !== "object") {
    return "";
  }

  for (const item in filter) {
    if (
      item &&
      filter[item] !== undefined &&
      filter[item] !== "" &&
      (filter[item] !== null || allowNull)
    ) {
      filterString = filterString ? `${filterString}&` : filterString;
      filterString += `${item}=${filter[item]}`;
    }
  }
  filterString = filterString ? `?${filterString}` : filterString;
  return filterString;
};

const starWarServices = {
  getStarWars,
};

export default starWarServices;
