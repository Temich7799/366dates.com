import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: React.FC<ButtonProps> = (props) => {

  const { children, onClick, className, disabled } = props;

  return (
    <button {...props} onClick={onClick} className={styles.btn}>{children}</button>
  )
}
