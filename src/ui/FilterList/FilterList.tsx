import { DownOutlined } from '@ant-design/icons';
import styles from 'src/ui/FilterList/FilterList.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

interface FilterListProps {
  teams: string;
  positions: string;
  city: string;
}

export default function FilterList({
  teams,
  positions,
  city,
}: FilterListProps) {
  return (
    <ul className={styles.list}>
      <li className={styles.containerItem}>
        <p className={cx(styles.item)}>{teams}</p>
        <DownOutlined className={styles.arrow} />
      </li>
      <li className={styles.containerItem}>
        <p className={cx(styles.item)}>{positions}</p>
        <DownOutlined className={styles.arrow} />
      </li>
      <li className={styles.containerItem}>
        <p className={cx(styles.item)}>{city}</p>
        <DownOutlined className={styles.arrow} />
      </li>
    </ul>
  );
}
