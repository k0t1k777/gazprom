import styles from 'src/components/Header/Header.module.scss';
import Logo from 'src/assets/Logo.svg?react';
import { Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <Logo />
      </Link>
      <div className={styles.container}>
        <Input className={styles.input} placeholder='Поиск' />
        <FilterOutlined className={styles.headerIcon} />
      </div>
    </header>
  );
}
