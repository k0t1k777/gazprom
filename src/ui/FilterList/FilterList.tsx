import { DownOutlined } from '@ant-design/icons';
import styles from 'src/ui/FilterList/FilterList.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

interface FilterListProps {
  employesRout?: boolean;
  teams: string;
  positions: string;
  city: string;
}

export default function FilterList({
  employesRout,
  teams,
  positions,
  city,
}: FilterListProps) {
  console.log('employesRout: ', employesRout);

  return (
    <ul
      className={cx(styles.list, { [styles.list_employesRout]: employesRout })}
    >
      <li className={styles.containerItem}>
        <p
          className={cx(styles.item, {
            [styles.item_employesRout]: employesRout,
          })}
        >
          {teams}
        </p>
        <DownOutlined className={styles.arrow} />
      </li>
      <li className={styles.containerItem}>
        <p
          className={cx(styles.item, {
            [styles.item_employesRout]: employesRout,
          })}
        >
          {positions}
        </p>
        <DownOutlined className={styles.arrow} />
      </li>
      <li className={styles.containerItem}>
        <p
          className={cx(styles.item, {
            [styles.item_employesRout]: employesRout,
          })}
        >
          {city}
        </p>
        <DownOutlined className={styles.arrow} />
      </li>
    </ul>
  );
}
