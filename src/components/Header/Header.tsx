import styles from 'src/components/Header/Header.module.scss';
import Logo from 'src/assets/Logo.svg?react';
import { Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Filter from 'src/components/Filter/Filter';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

export default function Header() {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  return (
    <>
      <header className={styles.header}>
        <Link to='/'>
          <Logo />
        </Link>
        <div className={styles.container}>
          <Input
            placeholder='Поиск'
            className={cx(styles.input, {
              [styles.input_dissabled]: isFilterOpen,
            })}
          />
          <FilterOutlined
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cx(styles.headerIcon, {
              [styles.headerIcon_dissabled]: isFilterOpen,
            })}
          />
        </div>
      </header>
      {isFilterOpen && (
        <Filter setIsFilterOpen={setIsFilterOpen} isFilterOpen={isFilterOpen} />
      )}
    </>
  );
}
