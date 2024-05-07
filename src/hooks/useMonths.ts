import { useTranslation } from "../../app/i18n";

export default async function useMonths(language: string) {

  const { t } = await useTranslation(language);

  return [
    {
      name: t('jan'),
      num: '1',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('feb'),
      num: '2',
      countDates: Array.from({ length: 29 }, (_, i) => i + 1),
    },
    {
      name: t('mar'),
      num: '3',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('apr'),
      num: '4',
      countDates: Array.from({ length: 30 }, (_, i) => i + 1),
    },
    {
      name: t('may'),
      num: '5',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('jun'),
      num: '6',
      countDates: Array.from({ length: 30 }, (_, i) => i + 1),
    },
    {
      name: t('jul'),
      num: '7',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('aug'),
      num: '8',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('sep'),
      num: '9',
      countDates: Array.from({ length: 30 }, (_, i) => i + 1),
    },
    {
      name: t('oct'),
      num: '10',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
    {
      name: t('nov'),
      num: '11',
      countDates: Array.from({ length: 30 }, (_, i) => i + 1),
    },
    {
      name: t('dec'),
      num: '12',
      countDates: Array.from({ length: 31 }, (_, i) => i + 1),
    },
  ];
};
