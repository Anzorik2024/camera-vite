import { useState, useEffect } from 'react';
import { selectPhone } from '../../store/order-slice/order-slice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

interface PhoneNumberInputProps {
  setIsButtonDisabled: (isButtonDisabled: boolean) => void;
  isOpen: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

function PhoneNumberInput({ inputRef, setIsButtonDisabled, isOpen} : PhoneNumberInputProps) :JSX.Element{
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>('Нужно указать номер');

  const dispatch = useAppDispatch();

  useEffect(() => {
    setInputValue('');
    setError('Нужно указать номер');
  }, [isOpen]);

  const normalizePhoneNumber = (value: string): string => {
    // Удаляем все символы, кроме цифр
    const digitsOnly = value.replace(/\D/g, '');

    // Обрабатываем случай с 8 в начале
    const normalizedDigits = digitsOnly.startsWith('8') ? `7${digitsOnly.slice(1)}` : digitsOnly;

    // Добавляем +7 в начало, если еще нет
    const withCountryCode = normalizedDigits.startsWith('7') ? `+${normalizedDigits}` : `+7${normalizedDigits}`;

    // Ограничиваем длину до 12 символов (+7 + 10 цифр)
    return withCountryCode.slice(0, 12);
  };

  // Функция форматирования номера телефона для отображения
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


  // Валидация номера телефона
  const validatePhoneNumber = (value: string): boolean => {
    const normalizedValue = normalizePhoneNumber(value);

    if (!normalizedValue || normalizedValue === '+7') {
      setError('Нужно указать номер');
      return false;
    }

    const isValid = normalizedValue.length === 12; // Проверяем, что номер полный (+7 и 10 цифр)
    setError(isValid ? null : 'Номер должен содержать 10 цифр после +7');
    return isValid;
  };

  const handleBlur = () => {
    if (error) {
      // Если была ошибка, очищаем поле и сбрасываем ошибку
      setInputValue('');
      setError('Нужно указать номер');
    }
  };

  // Обработчик изменения значения в поле ввода
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    // Проверка на наличие букв
    if (/[a-zA-Zа-яА-Я]/.test(rawValue)) {
      setError('Недопустимые символы. Введите только цифры.');
      //setInputValue(''); // Очищаем поле ввода
      return; // Прерываем выполнение, если есть буквы
    }

    if (rawValue.length > 16) {
      setError('Номер — 12 символов. Сотрите лишние символы');
      setIsButtonDisabled(false);
      return; // Прерываем выполнение, если длина превышает 12 символов
    }

    const formattedValue = formatPhoneNumber(rawValue);

    setInputValue(formattedValue);

    // Валидация номера
    validatePhoneNumber(rawValue);

    // Отправляем на сервер стандартизованный формат
    const standardizedFormat = normalizePhoneNumber(rawValue);
    setIsButtonDisabled(validatePhoneNumber(rawValue));

    if(validatePhoneNumber(rawValue)) {
      dispatch(selectPhone(standardizedFormat));
    }
  };
  return (
    <div className={`custom-input form-review__item ${error ? 'is-invalid' : ''}`}>
      <label>
        <span className="custom-input__label">Телефон
          <svg width="9" height="9" aria-hidden="true">
            <use xlinkHref="#icon-snowflake"></use>
          </svg>
        </span>
        <input
          type="tel"
          name="user-tel"
          placeholder="Введите ваш номер +7(9XX)XXX-XX-XX"
          required
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>
      {error && <p className="custom-input__error">{error}</p>}
    </div>

  );
}

export default PhoneNumberInput;
