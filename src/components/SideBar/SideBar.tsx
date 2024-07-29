import {
  ClusterOutlined,
  DatabaseOutlined,
  FileOutlined,
  HomeOutlined,
  LeftOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import styles from 'src/components/SideBar/SideBar.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

export default function SideBar() {
  const [shortWindow, setShortWindow] = useState(false);

  return (
    <div className={cx(styles.sideBar, {[styles.sideBar_short] : shortWindow})}>
      <ul className={styles.list}>
        <li className={cx(styles.item, {[styles.item_short]: shortWindow })}>
          <UserOutlined />
          <p className={cx(styles.text, {[styles.text_short]: shortWindow })}>
            Личный кабинет
          </p>
        </li>
        <li className={cx(styles.item, {[styles.item_short] : shortWindow})}>
          <HomeOutlined />
          <p className={cx(styles.text, {[styles.text_short]: shortWindow })}>
            Главная
          </p>
        </li>
        <li className={cx(styles.item, {[styles.item_short] : shortWindow})}>
          <DatabaseOutlined />
          <p className={cx(styles.text, {[styles.text_short]: shortWindow })}>
            Справочник
          </p>
        </li>
        <li className={cx(styles.item, {[styles.item_short] : shortWindow})}>
          <TeamOutlined />
          <p className={cx(styles.text, {[styles.text_short]: shortWindow })}>
            Сотрудники
          </p>
        </li>
        <li className={cx(styles.item, {[styles.item_short] : shortWindow})}>
          <ClusterOutlined />
          <p className={cx(styles.text, {[styles.text_short]: shortWindow })}>
            Команды
          </p>
        </li>
        <li className={cx(styles.item, {[styles.item_short] : shortWindow})}>
          <FileOutlined />
          <p className={cx(styles.text, {[styles.text_short]: shortWindow })}>
            Проекты
          </p>
        </li>
      </ul>
      <Button
        className={cx(styles.sideBarButton, {
          [styles.sideBarButton_short]: shortWindow,
        })}
        onClick={() => setShortWindow(!shortWindow)}
      >
        Скрыть
        <LeftOutlined />
      </Button>
    </div>
  );
}
