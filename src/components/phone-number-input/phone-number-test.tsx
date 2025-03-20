import React, { useState, ChangeEvent } from 'react';

interface Props {
  onPhoneNumberChange: (phoneNumber: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onSubmit: (phoneNumber: string) => void;
}

const PhoneNumberInput: React.FC<Props> = ({ onPhoneNumberChange, inputRef, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const normalizePhoneNumber = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, '');
    const normalizedDigits = digitsOnly.startsWith('8') ? `7${digitsOnly.slice(1)}` : digitsOnly;
    const withCountryCode = normalizedDigits.startsWith('7') ? `+${normalizedDigits}` : `+7${normalizedDigits}`;
    return withCountryCode.slice(0, 12);
  };

  const formatPhoneNumber = (value: string): string => {
    const normalizedValue = normalizePhoneNumber(value);

    if (normalizedValue.length <= 2) {
      return normalizedValue;
    }

    if (normalizedValue.length <= 5) {
      return `+7(${normalizedValue.slice(2)}`;
    }

    if (normalizedValue.length <= 8) {
      return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5)}`;
    }

    if (normalizedValue.length <= 10) {
      return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5, 8)}-${normalizedValue.slice(8)}`;
    }

    return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5, 8)}-${normalizedValue.slice(8, 10)}-${normalizedValue.slice(10)}`;
  };

  const validatePhoneNumber = (value: string): string | null => {
    const normalizedValue = normalizePhoneNumber(value);

    if (normalizedValue.length < 12) {
      return 'Номер телефона должен содержать 11 цифр, включая код страны (+7).';
    }

    return null;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatPhoneNumber(rawValue);

    setInputValue(formattedValue);

    const validationError = validatePhoneNumber(rawValue);
    setError(validationError);

    const standardizedFormat = normalizePhoneNumber(rawValue);
    onPhoneNumberChange(standardizedFormat);
  };

  const handleSubmit = () => {
    const standardizedFormat = normalizePhoneNumber(inputValue);
    const validationError = validatePhoneNumber(inputValue);

    if (!validationError) {
      onSubmit(standardizedFormat);
    } else {
      setError(validationError);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumber = /^[0-9]+$/.test(event.key);
    const isAllowedKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key);

    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  };


  return (
    <div>
      <input
        type="tel"
        name="user-tel"
        placeholder="Введите ваш номер +7(9XX)XXX-XX-XX"
        required
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {error && <p style={{ color: 'red', fontSize: '0.875em' }}>{error}</p>}
      <button type="button" onClick={handleSubmit} disabled={!!error || inputValue.length < 12}>
        Отправить
      </button>
    </div>
  );
};

export default PhoneNumberInput;
