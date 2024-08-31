import styles from 'src/components/PopupProfile/PopupProfile.module.scss';
import { useEffect, useRef } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { CloseOutlined } from '@ant-design/icons';
import { setIsFilterOpen } from 'src/store/features/slice/membersSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectUsers,
  setIsProfileOpen,
} from 'src/store/features/slice/userSlice';

export default function PopupProfile() {
  const dispatch = useAppDispatch();
  const { isProfileOpen } = useAppSelector(selectUsers);
  const { selectedMember } = useAppSelector(selectUsers);

  if (!isProfileOpen) return null;

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    dispatch(setIsFilterOpen(false));
  });

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef.current) {
      const modal = modalRef.current;

      if (isProfileOpen) {
        modal.style.display = 'block';
        modal.style.opacity = '0';
        modal.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 400,
          easing: 'ease-in-out',
          fill: 'forwards',
        });
      } else {
        modal.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 400,
          easing: 'ease-in-out',
          fill: 'forwards',
        }).onfinish = () => {
          modal.style.display = 'none';
        };
      }
    }
  }, [isProfileOpen]);

  return (
    <div ref={ref} className={styles.popupProfile}>
      <div ref={modalRef}>
        <div className={styles.container}>
          <CloseOutlined
            className={styles.img}
            onClick={() => dispatch(setIsProfileOpen(false))}
          />
          <p className={styles.text}>Карточка сотрудника</p>
        </div>
        <div className={styles.containerProfile}>
          <div className={styles.photoContainer}>
            <img
              src={selectedMember?.image}
              alt='ваше фото'
              className={styles.photo}
            />
            <div className={styles.containerText}>
              <p className={styles.name}>{selectedMember?.full_name}</p>
              <p className={`${styles.text} ${styles.text_bold}`}>
                {selectedMember?.department}
              </p>
            </div>
          </div>
          <div className={styles.containerText}>
            <p className={styles.textInfo}>Tел 8 (812) 002 00 00</p>
            <p className={styles.textInfo}>Email icpdir@yandex.ru</p>
            <p className={styles.textInfo}>
              Местонахождение: Санкт-Петербург GMT+3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
