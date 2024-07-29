import {
  ClusterOutlined,
  DatabaseOutlined,
  FileOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import styles from 'src/components/SideBar/SideBar.module.scss';
import cn from 'classnames/bind';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cx = cn.bind(styles);

export default function SideBar() {
  const [shortWindow, setShortWindow] = useState(false);
  const [showMore, setShorMore] = useState(false);
  console.log('showMore: ', showMore);
  return (
    <div
      className={cx(styles.sideBar, { [styles.sideBar_short]: shortWindow })}
    >
      <ul className={styles.list}>
        {[
          { icon: <UserOutlined />, text: 'Личный кабинет', link: '/profile' },
          { icon: <HomeOutlined />, text: 'Главная', link: '/' },
          {
            icon: (
              <span onClick={() => setShorMore(!showMore)} style={{ cursor: 'pointer' }}>
                <DatabaseOutlined />
              </span>
            ),
            text: 'Справочник',
            link: '/directory',
            onClick: () => setShorMore(!showMore),
            },
        ].map((item, index) => (
          <li
            key={index}
            className={cx(styles.item, { [styles.item_short]: shortWindow })}
          >
            {item.icon}
            <motion.p
              className={cx(styles.text, { [styles.text_short]: shortWindow })}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: shortWindow ? 0 : 1,
                x: shortWindow ? -90 : 0,
              }}
              transition={{ duration: 0.3 }}
              onClick={item.onClick}
            >
              <Link to={item.link} className={styles.link}>
                {item.text}
              </Link>
            </motion.p>
          </li>
        ))}

        {showMore && (
          <>
            {[
              {
                icon: <TeamOutlined />,
                text: 'Сотрудники',
                link: '/employees',
              },
              { icon: <ClusterOutlined />, text: 'Команды', link: '/teams' },
              { icon: <FileOutlined />, text: 'Проекты', link: '/projects' },
            ].map((item, index) => (
              <li
                key={index}
                className={cx(styles.item, {
                  [styles.item_short]: shortWindow,
                })}
              >
                {item.icon}
                <motion.p
                  className={cx(styles.text, {
                    [styles.text_short]: shortWindow,
                  })}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: shortWindow ? 0 : 1,
                    x: shortWindow ? -90 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={item.link} className={styles.link}>
                    {item.text}
                  </Link>
                </motion.p>
              </li>
            ))}
          </>
        )}
      </ul>
      <Button
        className={cx(styles.sideBarButton, {
          [styles.sideBarButton_short]: shortWindow,
        })}
        onClick={() => setShortWindow(!shortWindow)}
      >
        Скрыть
        {shortWindow ? <RightOutlined /> : <LeftOutlined />}
      </Button>
    </div>
  );
}
