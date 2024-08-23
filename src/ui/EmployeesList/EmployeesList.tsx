import styles from 'src/ui/EmployeesList/EmployeesList.module.scss';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  fetchGetMembers,
  selectMembers,
  setCurrentPage,
  setSearch,
} from 'src/store/features/slice/membersSlice';
import {
  fetchSelects,
  selectFilter,
  setDepartment,
  setPosition,
} from 'src/store/features/slice/filterSlice';
import { useEffect } from 'react';
import Select from 'src/ui/Select/Select';

export default function EmployeesList() {
  const { search } = useAppSelector(selectMembers);
  const { selects, department, position } = useAppSelector(selectFilter);

  const dispatch = useAppDispatch();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setSearch(value));
    dispatch(setCurrentPage(1));
    await dispatch(
      fetchGetMembers({ page: 1, search: value, position, department })
    );
  };

  const handleSelectChange = (value: string, type: 'position' | 'department') => {
    if (type === 'position') {
        dispatch(setPosition(value));
    } else {
        dispatch(setDepartment(value));
    }
    dispatch(setCurrentPage(1));
};

  useEffect(() => {
    dispatch(fetchSelects());
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      <li className={styles.containerItem}>
        <Input
          placeholder='ФИО'
          className={styles.input}
          onChange={handleChange}
          value={search}
        />
      </li>
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
    </ul>
  );
}
