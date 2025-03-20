import { useRef, useState } from 'react';

import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import useInputFocus from '../../hooks/use-input-focus';
import useTrapFocus from '../../hooks/use-trap-focus';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getSelectCamera, getSelectPhoneOrder } from '../../store/selectors';
import BasketItemShort from '../basket-item-short/basket-item-short';
import PhoneNumberInput from '../phone-number-input/phone-number-input';


type BasketModalProps = {
  onCloseModal: () => void;
  isOpen: boolean;
}

function BasketModal({ onCloseModal, isOpen}: BasketModalProps) : JSX.Element {
  const selectedCamera = useAppSelector(getSelectCamera);
  const selectedPhone = useAppSelector(getSelectPhoneOrder);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const modalRef = useRef(null);
  const telInputRef = useRef<HTMLInputElement>(null);
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  console.log(selectedPhone);

  const handleModalCloseClick = () => {
    onCloseModal();
  };

  const handlePhoneNumberChange = () => {
    //console.log('Стандартизованный номер:', phoneNumber);


    //console.log('номер из стейта:',selectedPhone);
    // Здесь можно отправить номер на сервер или сохранить его в состоянии
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
        <PhoneNumberInput onPhoneNumberChange={handlePhoneNumberChange} inputRef={telInputRef} setIsButtonDisabled={setIsButtonDisabled}/>
        <div className="modal__buttons">
          <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" disabled={!isButtonDisabled} >
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
