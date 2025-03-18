import React, { useState, ChangeEvent } from 'react';

interface Props {
  onPhoneNumberChange: (phoneNumber: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const PhoneNumberInput: React.FC<Props> = ({ onPhoneNumberChange, inputRef }) => {
  const [inputValue, setInputValue] = useState('');


  const normalizePhoneNumber = (value: string): string => {
    // Удаляем все символы, кроме цифр
    const digitsOnly = value.replace(/\D/g, '');

    // Обрабатываем случай с 8 в начале
    const normalizedDigits = digitsOnly.startsWith('8') ? `7${ digitsOnly.slice(1)}` : digitsOnly;

    // Добавляем +7 в начало, если еще нет
    const withCountryCode = normalizedDigits.startsWith('7') ? `+${ normalizedDigits}` : `+7${ normalizedDigits}`;

    // Ограничиваем длину до 12 символов (+7 + 10 цифр)
    return withCountryCode.slice(0, 12);
  };

  const formatPhoneNumber = (value: string): string => {
    const normalizedValue = normalizePhoneNumber(value);

    if (normalizedValue.length <= 2) {
      return normalizedValue; // +7
    }

    if (normalizedValue.length <= 5) {
      return `+7(${normalizedValue.slice(2)}`; // +7(9XX
    }

    if (normalizedValue.length <= 8) {
      return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5)}`; // +7(9XX)XXX
    }

    if (normalizedValue.length <= 10) {
      return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5, 8)}-${normalizedValue.slice(8)}`; // +7(9XX)XXX-XX
    }

    return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5, 8)}-${normalizedValue.slice(8, 10)}-${normalizedValue.slice(10)}`; // +7(9XX)XXX-XX-XX
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatPhoneNumber(rawValue);

    setInputValue(formattedValue);

    // Отправляем на сервер стандартизованный формат
    const standardizedFormat = normalizePhoneNumber(rawValue);
    onPhoneNumberChange(standardizedFormat);
  };

  return (
    <input
      type="tel"
      name="user-tel"
      placeholder="Введите ваш номер +7(9XX)XXX-XX-XX"
      required
      ref={inputRef}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default PhoneNumberInput;
