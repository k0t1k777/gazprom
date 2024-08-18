import styles from 'src/components/PopupProfile/PopupProfile.module.scss';
import { useEffect, useRef } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import FilterList from 'src/ui/FilterList/FilterList';
import { setIsFilterOpen } from 'src/store/features/slice/membersSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectUsers } from 'src/store/features/slice/userSlice';



export default function PopupProfile() {
  const dispatch = useAppDispatch();
  const { isProfileOpen } = useAppSelector(selectUsers);

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
        <Input className={styles.input} placeholder='Поиск' />
        <div className={styles.container}>
          <CloseOutlined className={styles.img} />
          <p className={styles.text}>Фильтры</p>
        </div>
        <FilterList teams='Подразделение' positions='Должность' city='Город' />
        <div className={styles.containerResult}>
         
        </div>
      </div>
    </div>
  );
}
