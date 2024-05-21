import { createElement, FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

interface TextProps extends HTMLAttributes<HTMLElement> {
  readonly tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  readonly children?: ReactNode;
  readonly size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  readonly weight?: 'bold' | 'medium' | 'regular' | 'light' | 'thin';
  readonly className?: string;
  readonly theme?: 'primary' | 'secondary' | 'alert' | 'success' | 'action';
}

export const Text: FC<TextProps> = ({
  tag,
  children,
  weight,
  className,
  size,
  theme = 'primary',
}) => {
  const Text = ({ ...props }: HTMLAttributes<HTMLElement>) => createElement(tag, props, children);

  const textClasses = classNames(styles.text, styles[`text_${tag}`], {
    [styles[`text_${weight}`]]: weight,
    [styles[`text_${size}`]]: size,
    [styles[`text_${theme}`]]: theme,
    [className as string]: className,
  });

  return <Text className={textClasses}>{children}</Text>;
};
