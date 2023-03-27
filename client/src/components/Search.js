import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// WatchSearch Component that renders a search input and a dropdown list of suggestions based on the user input
const WatchSearch = () => {
  const [watches, setWatches] = useState([]);
  const [value, setValue] = useState("");
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  // Fetch the watches data from the API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setWatches(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter the watches based on user input
  const filteredWatches = watches.filter((watch) => {
    return watch.name.toLowerCase().includes(value.toLowerCase());
  });

  // Update the value state with user input
  const searchHandler = (value) => {
    setHide(false);
    setValue(value);
  };

  // Navigate to the selected watch's product page and clear the search input
  const handleSelect = (id) => {
    navigate("/products/" + id);
    setHide(true);
    setValue("");
  };

  // Render the search input, clear button, and suggestion dropdown
  return (
    <MainWrapper>
      <SearchBox>
        <InputField
          type="text"
          placeholder="Search"
          value={value}
          onChange={(ev) => searchHandler(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              handleSelect(ev.target.value);
            }
          }}
        />
        <Clear onClick={() => setValue("")}>Clear </Clear>

        {value.length > 1 && filteredWatches.length > 0 && !hide && (
          <SuggestionList>
            <SuggestionDropDown>
              {filteredWatches.map((watch) => {
                const index = watch.name
                  .toLowerCase()
                  .indexOf(value.toLowerCase());
                const firstHalf = watch.name.slice(0, index);
                const secondHalf = watch.name.slice(index + value.length);
                return (
                  <Suggestion
                    key={watch.id}
                    onClick={() => handleSelect(watch._id)}
                  >
                    {firstHalf}
                    <Search>{value}</Search>
                    {secondHalf}
                  </Suggestion>
                );
              })}
            </SuggestionDropDown>
          </SuggestionList>
        )}
      </SearchBox>
    </MainWrapper>
  );
};

export default WatchSearch;

//Styled components for search
const MainWrapper = styled.div`
  position: relative;
`;

const SearchBox = styled.div`
  position: relative;
`;
const InputField = styled.input`
  width: 400px;
  height: 30px;
  padding-left: 10px;
  font-size: 15px;
  margin-right: 10px;
  border-radius: 3px;
  border-width: 0.5px;
  border-color: rgba(128, 128, 128, 0.5);
`;

const Clear = styled.button`
  height: 30px;
  width: 60px;
  background-color: #aa726c;
  color: white;
  border-radius: 5px;
  border-style: none;
  padding: 3px 7px;
  :hover {
    cursor: pointer;
  }
  :active {
    background-color: var(--color-sunglow);
  }
`;
const SuggestionList = styled.div`
  border-radius: 5px;
  width: 410px;
  max-height: 700px;
  overflow-y: auto;
  box-shadow: 0px 3px 12px 6px rgba(0, 0, 0, 0.22);
  margin-top: 5px;
  position: absolute;
  top: 100%;
  z-index: 10;
  background-color: #fff;
`;
const Suggestion = styled.li`
  padding: 5px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: var(--color-olivine);
  }
`;
const SuggestionDropDown = styled.ul`
  padding: 10px;
`;

const Search = styled.span`
  font-weight: lighter;
`;
