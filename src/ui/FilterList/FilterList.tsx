import styles from 'src/ui/FilterList/FilterList.module.scss';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setCurrentPage } from 'src/store/features/slice/membersSlice';
import {
  fetchSelects,
  selectFilter,
  setCitie,
  setDepartment,
  setPosition,
} from 'src/store/features/slice/filterSlice';
import { useEffect } from 'react';
import Select from 'src/ui/Select/Select';

export default function FilterList() {
  const { selects, department, position, citie } = useAppSelector(selectFilter);

  const dispatch = useAppDispatch();

  const handleSelectChange = (
    value: string,
    type: 'position' | 'department' | 'citie'
  ) => {
    if (type === 'position') {
      dispatch(setPosition(value));
    } else if (type === 'department') {
      dispatch(setDepartment(value));
    } else if (type === 'citie') {
      console.log(value) 
      dispatch(setCitie(value));
    }
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    return () => {
      dispatch(setPosition(''));
      dispatch(setDepartment(''));
      dispatch(setCitie(''));
      dispatch(setCurrentPage(1));
    };
  }, [location.pathname, dispatch]);

  useEffect(() => {
    dispatch(fetchSelects());
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      <li className={styles.containerItem}>
        <Select
          text='Должность'
          options={selects.positions}
          value={position}
          setValue={(value) => handleSelectChange(value, 'position')}
        />
      </li>
      <li className={styles.containerItem}>
        <Select
          text='Отдел'
          options={selects.departments}
          value={department}
          setValue={(value) => handleSelectChange(value, 'department')}
        />
      </li>
      <li className={styles.containerItem}>
        <Select
          text='Город'
          options={selects.cities}
          value={citie}
          setValue={(value) => handleSelectChange(value, 'citie')}
        />
      </li>
    </ul>
  );
}
