import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import styled from 'styled-components';
import useRootStore from '../../hooks/useRootStore';

const StyleRangeSilder = styled.div`
    position: relative;
    overflow: hidden;
    width: 95%;
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

const FilterSilderComponent = () => {
    const { setMessageFilterValue, messagesFilterValue } = useRootStore().messageStore;
    const [filter, setFilter] = useState(messagesFilterValue);

    const changeRelevance = (e: number) => {
        setFilter(e);
        setMessageFilterValue(e);
    };

    return (
        <StyleRangeSilder>
            <div className="bassSilder">
                <span>0</span>
                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={filter}
                    onChange={e => changeRelevance(e as number)}
                    railStyle={{
                        backgroundColor: '#ffffff',
                    }}
                />
                <span>{filter}</span>
            </div>
        </StyleRangeSilder>
    );
};

export default FilterSilderComponent;
