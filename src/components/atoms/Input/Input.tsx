import React, {
  DetailedHTMLProps,
  FormEvent,
  HTMLAttributes,
  forwardRef,
  useRef,
  useState,
} from 'react';

import styles from './Input.module.scss';
import { useCombinedRef } from '@/hooks/useCombinedRef';
import classNames from 'classnames';

export interface IInput
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  readonly value?: string;
  readonly label?: string;
  readonly isError?: boolean;
  readonly placeholder?: string;
  readonly className?: string;
  readonly type: string;
  readonly name?: string;
  readonly maxLength?: number;
  readonly resetField?: () => void;
  readonly resetMask?: () => void;
  readonly handleSearch?: () => void;
  readonly handleCalendar?: () => void;
  readonly white?: boolean;
  readonly required?: boolean;
  readonly id?: string;
  readonly list?: string;
  readonly defaultValue?: string;
  readonly wrappDataTestid?: string;
  readonly size?: 'm' | 's' | 'l';
  readonly textAlign?: string;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      label,
      isError = false,
      placeholder,
      onBlur,
      onChange,
      onFocus,
      onInput,
      list,
      resetField,
      resetMask,
      handleSearch,
      handleCalendar,
      value,
      type,
      maxLength,
      className,
      white,
      required,
      id,
      defaultValue,
      wrappDataTestid,
      size = 'm',
      textAlign,
      ...rest
    },
    ref,
  ): JSX.Element => {

    const [valueInput, setValueInput] = useState<string | undefined>(value || defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRefCombine = useCombinedRef(ref, inputRef);

    const handleChangeValue: (e: FormEvent<HTMLInputElement>) => void = (e) => {
      setValueInput(e.currentTarget.value);
      if (onChange) {
        onChange(e);
      }
    };

    const inputClasses = classNames(styles.input, {
      [className as string]: className,
    })

    return (
      <div className={styles.inputBlock}>
        <label
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className={inputClasses}
          defaultValue={defaultValue}
          id={id}
          list={list}
          maxLength={maxLength}
          onChange={handleChangeValue}
          placeholder={placeholder}
          ref={inputRefCombine}
          required={required}
          type={type}
          value={value}
          {...rest}
        />
      </div>
    );
  },
);