import { useState, useEffect } from "react";
import styled from "styled-components";

const WatchSearch = ({ handleSelect }) => {
  const [watches, setWatches] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setWatches(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredWatches = watches.filter((watch) => {
    return watch.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <div>
      <div>
        <InputField
          type="text"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              handleSelect(ev.target.value);
            }
          }}
        />
        <Clear onClick={() => setValue("")}>Clear </Clear>
      </div>
      {value.length > 1 && filteredWatches.length > 0 && (
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
                  onClick={() => handleSelect(watch.title)}
                >
                  {firstHalf}
                  <Search>{value}</Search>
                  {secondHalf}
                  <Category>
                    {" "}
                    <In>in </In> {watch.category}
                  </Category>
                </Suggestion>
              );
            })}
          </SuggestionDropDown>
        </SuggestionList>
      )}
    </div>
  );
};

const InputField = styled.input`
    width: 250px;
    height: 25px;
    margin-right: 10px;
    border-radius: 3px;
    border-width: 0.5px;
    border-color: rgba(128, 128, 128, 0.5);
`

const Clear = styled.button`
    width: 50px;
    background-color: blue;
    color: white;
    border-radius: 5px;
    border-style: none;
    padding: 5px 10px 5px 10px;
`
const SuggestionList = styled.div`
    width: 300px;
    max-height: 700px;
    overflow-y: auto;
    box-shadow: 0px 3px 12px 6px rgba(0,0,0,0.22);
    margin-top: 5px;
`
const Suggestion = styled.li`
    padding: 5px;
    padding: 10px;
    font-weight: bold;
    &:hover {
    background: beige;
}
`
const SuggestionDropDown = styled.ul`
    padding: 10px;
`

const Search = styled.span`
    font-weight: lighter;
`
const Category = styled.span`
    color: pink;
`

const In = styled.span`
    color: grey;
    font-style: italic;
`

export default WatchSearch;