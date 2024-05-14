import React from 'react';
import { SearchIcon } from '../../assets/icons/icons';
import styles from './SearchInput.module.css';
interface Props {
    placeholder?: string;
    onChange: (e: any) => void;
    value?: any;
}

const SearchInput: React.FC<Props> = ({ placeholder, value, onChange }) => {
    return (
        <div className={styles.searchBox}>
            <div className={styles.iconBox}>
                <SearchIcon />
            </div>
            <input
                className={styles.input}
                placeholder={placeholder}
                type="text"
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
