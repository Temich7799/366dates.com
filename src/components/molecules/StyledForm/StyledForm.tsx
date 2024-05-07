import { ReactNode } from 'react';
import styles from './StyledForm.module.scss';
import { ToastContainer } from 'react-toastify';

const StyledForm: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <div className={styles.formWrapper}>
            {children}
            <ToastContainer />
        </div>
    )
}

export default StyledForm;