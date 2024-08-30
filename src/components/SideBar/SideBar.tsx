import { Button } from 'antd';
import styles from 'src/components/SideBar/SideBar.module.scss';
import cn from 'classnames/bind';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ClusterOutlined,
  DatabaseOutlined,
  DownOutlined,
  FileOutlined,
  HomeOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  TeamOutlined,
  UpOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectMembers,
  setIsFilterOpen,
  setShortWindow,
} from 'src/store/features/slice/membersSlice';
import { selectUsers, setShorMore } from 'src/store/features/slice/userSlice';

const cx = cn.bind(styles);

export default function SideBar() {
  const { shortWindow } = useAppSelector(selectMembers);
  const { showMore } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const newTeamRout = location.pathname === '/new-team';
  const teamsRout = location.pathname === '/teams';

  function openFilter() {
    navigate('/new-team');
    dispatch(setIsFilterOpen(true));
  }

  return (
    <div
      className={cx(styles.sideBarWrapper, {
        [styles.sideBarWrapper_short]: shortWindow,
      })}
    >
      <div
        className={cx(styles.sideBar, { [styles.sideBar_short]: shortWindow })}
      >
        <ul className={styles.list}>
          {[
            { icon: <HomeOutlined />, text: 'Главная', link: '/main' },
            {
              icon: <UserOutlined />,
              text: 'Личный кабинет',
              link: '/profile',
            },
            {
              icon: <DatabaseOutlined />,
              arrow: (
                <span
                  className={cx(styles.arrow, {
                    [styles.arrow_short]: shortWindow,
                  })}
                >
                  {showMore ? <UpOutlined /> : <DownOutlined />}
                </span>
              ),
              text: 'Справочник',
              onClick: () => dispatch(setShorMore(!showMore)),
            },
          ].map((item, index) =>
            item.link ? (
              <Link to={item.link} key={index} className={styles.link}>
                <li
                  className={cx(styles.item, {
                    [styles.item_short]: shortWindow,
                    [styles.item_active]: location.pathname === item.link,
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
                    transition={{ duration: 0.4 }}
                    onClick={item.onClick}
                  >
                    {item.text}
                    <span>{item.arrow}</span>
                  </motion.p>
                </li>
              </Link>
            ) : (
              <li
                key={index}
                className={cx(styles.item)}
                onClick={() => dispatch(setShorMore(!showMore))}
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
                  transition={{ duration: 0.4 }}
                  onClick={item.onClick}
                >
                  {item.text}
                  <span>{item.arrow}</span>
                </motion.p>
              </li>
            )
          )}

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
                <Link to={item.link} key={index} className={styles.link}>
                  <li
                    key={index}
                    className={cx(styles.item, styles.item_grey, {
                      [styles.item_short]: shortWindow,
                      [styles.item_active]: location.pathname === item.link,
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
                      transition={{ duration: 0.4 }}
                    >
                      {item.text}
                    </motion.p>
                  </li>
                </Link>
              ))}
            </>
          )}
        </ul>
        <Button
          className={cx(styles.sideBarButton, {
            [styles.sideBarButton_short]: shortWindow,
          })}
          onClick={() => dispatch(setShortWindow(!shortWindow))}
        >
          Скрыть
          {shortWindow ? <RightOutlined /> : <LeftOutlined />}
        </Button>
      </div>

      {!shortWindow && (teamsRout || newTeamRout) ? (
        <Button className={styles.button} onClick={openFilter}>
          Создать
        </Button>
      ) : (
        <>
          {shortWindow && (teamsRout || newTeamRout) && (
            <PlusOutlined
              onClick={openFilter}
              className={cx(styles.button, {
                [styles.button_mini]:
                  (shortWindow && teamsRout) || (shortWindow && newTeamRout),
              })}
            />
          )}
        </>
      )}
    </div>
  );
}
