import { useState, useEffect } from "react";

// this hook will help you filter out array element based on inputed array data
// import useSearchBar from "./../Hooks/useSearchBar";
// const [FilteredSearchData] = useSearchBar(arrayData, propertyKey, searchValue);
// arrayData: is where you will insert the array of data you want to filter from
// propertyKey: is what key you want to filter through for each element in array
// searchValue: is the input value where the search word comes from

function useSearchBar(ArrayData, propertyKey, searchValue) {
  const [FilteredSearchData, setFilteredSearchData] = useState(ArrayData);

  useEffect(() => {
    let filtered = ArrayData.filter(data => {
      return (
        data[propertyKey].toLowerCase().indexOf(searchValue.toLowerCase()) !==
        -1
      );
    });
    setFilteredSearchData(filtered);
    console.log("running filtered Effect");
  }, [searchValue, ArrayData, propertyKey]);

  return [FilteredSearchData];
}

export default useSearchBar;
