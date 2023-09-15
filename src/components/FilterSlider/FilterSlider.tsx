import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import styled from "styled-components";


const StyleRangeSilder = styled.div`
  position: relative;
  overflow: hidden;
  width: 95%;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  .bassSilder {
    position: relative;
    display: flex;
    width: 100%;
    gap: 15px;
    align-items: center;
  }
`;
interface propsType {
  friendId: number;
  friendRelevance: number;
}
const FilterSilderComponent = () => {
  const [filter, setFilter] = useState({
    progress: 0,
  });
  const changeRelevance = (e: number) => {
    setFilter({
      progress: e
    })
  };

  return (
    <StyleRangeSilder>
      <div className="bassSilder">
        <span>0</span>
        <Slider
          min={0}
          max={100}
          step={1}
          value={filter.progress}
          //   disabled={data?.adminId == friendId}
          onChange={(e) => changeRelevance(e as number)}
          railStyle={{
            backgroundColor: "#ffffff",
          }}
        />
        <span>{filter.progress}</span>
      </div>
    </StyleRangeSilder>
  );
};

export default FilterSilderComponent;
