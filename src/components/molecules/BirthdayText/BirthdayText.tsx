import React from 'react'
import { birthdaysRU, birthdaysEN, birthdaysDE } from '@/lib/json/locales/birthdays'
import { Text } from '../../atoms/Text/Text';
import styles from './BirthdayText.module.scss'

type Birthday = {
  day: number;
  month: number;
  text: string[];
}

type BirthdayTextProps = {
  month: string;
  day: string;
  language: string;
}

export const BirthdayText: React.FC<BirthdayTextProps> = ({ month, day, language }) => {

  const birthdays: any = {
    ru: birthdaysRU.find((birthday) => birthday.day === +day && birthday.month === +month),
    en: birthdaysEN.find((birthday) => birthday.day === +day && birthday.month === +month),
    de: birthdaysDE.find((birthday) => birthday.day === +day && birthday.month === +month),
  }

  //todo

  const birthday = language && birthdays[language];

  return birthday && (
    <div>
      <Text tag='p' className={styles.text}>{birthday.text}</Text>
    </div>
  )
}
