import FilterSilderComponent from "../../../../../components/FilterSlider/FilterSlider";
import styles from "./index.module.css";

interface Props {
    isOpen: boolean;
}

const FilterToolbar = ({ isOpen }: Props) => {
    return (
        <>
            {isOpen ? (
                <div className="container">
                    <FilterSilderComponent />
                </div>
            ) : null}
        </>
    );
};

export default FilterToolbar;
