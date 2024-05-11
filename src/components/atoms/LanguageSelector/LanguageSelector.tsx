'use client'

import React, { useState } from 'react';
import { languages } from '../../../../app/i18n/settings';
import styles from './LanguageSelector.module.scss'
import { useLanguageContext } from '@/contexts/CurrentLanguageContext';
import { useTranslation } from '../../../../app/i18n/client';

export const LanguageSelector = () => {

  const { language } = useLanguageContext();

  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const { i18n } = useTranslation(selectedLanguage);

  const handleChange = ({ target }: any) => {
    setSelectedLanguage(target.value);
    i18n.changeLanguage(target.value);
  }

  return (
    <select value={selectedLanguage} onChange={handleChange} className={styles.langselector} >
      {languages.map((language: string, index: number) => <option key={index} value={language}>{language.toUpperCase()}</option>)}
    </select>
  );
};