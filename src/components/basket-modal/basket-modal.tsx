import { useRef } from 'react';

import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import useInputFocus from '../../hooks/use-input-focus';
import useTrapFocus from '../../hooks/use-trap-focus';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getSelectCamera } from '../../store/selectors';
import BasketItemShort from '../basket-item-short/basket-item-short';


type BasketModalProps = {
  onCloseModal: () => void;
  isOpen: boolean;
}

function BasketModal({ onCloseModal, isOpen}: BasketModalProps) : JSX.Element {
  const selectedCamera = useAppSelector(getSelectCamera);

  const modalRef = useRef(null);
  const telInputRef = useRef<HTMLInputElement>(null);
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  const handleModalCloseClick = () => {
    onCloseModal();
  };

  useOnClickOutside(modalRef, handleModalCloseClick);
  useKeydownEscClose(handleModalCloseClick);
  useInputFocus(isOpen,telInputRef);
  useTrapFocus(telInputRef, buttonCloseRef,isOpen);

  return (
    <div className="modal__wrapper">
      <div className="modal__overlay"></div>
      <div className="modal__content" ref={modalRef}>
        <p className="title title--h4">Свяжитесь со мной</p>
        {selectedCamera && <BasketItemShort camera={selectedCamera}/>}
        <div className="custom-input form-review__item">
          <label>
            <span className="custom-input__label">Телефон
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input type="tel" name="user-tel" placeholder="Введите ваш номер" required ref={telInputRef} />
          </label>
          <p className="custom-input__error">Нужно указать номер</p>
        </div>
        <div className="modal__buttons">
          <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Заказать
          </button>
        </div>
        <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalCloseClick} ref={buttonCloseRef}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BasketModal;
