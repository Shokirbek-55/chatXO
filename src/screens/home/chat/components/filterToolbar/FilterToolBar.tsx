import FilterSilderComponent from "../../../../../components/FilterSlider/FilterSlider";
import styles from "./index.module.css";

interface Props {
  isOpen: boolean;
  otherCard: boolean;
}

const FilterToolbar = ({ isOpen, otherCard }: Props) => {
  const OtherReplyMessage = otherCard ? styles.container : styles.noneContainer;

  return (
    <div>
      {isOpen ? (
        <div className={OtherReplyMessage}>
          <FilterSilderComponent />
        </div>
      ) : null}
    </div>
  );
};

export default FilterToolbar;
