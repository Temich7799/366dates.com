import { ReactNode } from 'react';
import styles from './StyledSearchPage.module.scss';

const StyledSearchPage: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <div className={styles.searchblock}>
            {children}
        </div>
    )
}

export default StyledSearchPage;