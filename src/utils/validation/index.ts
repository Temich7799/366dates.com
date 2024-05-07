import { emailregex } from './regex';

export const emailValidator = {
  required: 'Поле обязательно к заполнению',
  pattern: {
    value: emailregex,
    message: 'Некорректно введена почта',
  },
};

export const baseValidator = {
  required: 'Поле обязательно к заполнению',
};
