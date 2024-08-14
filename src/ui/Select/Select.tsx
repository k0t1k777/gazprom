import { useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import cn from 'classnames/bind';
import useOutsideClick from 'src/hooks/useOutsideClick';
import 'src/ui/Select/SimpleBar.scss';
import styles from 'src/ui/Select/Select.module.scss';
import { DownOutlined } from '@ant-design/icons';

const cx = cn.bind(styles);

export interface ISelect {
  text?: string;
  value?: string;
  setValue?: (value: string) => void;
  options?: string[];
}

export default function Select({ text, setValue, value, options }: ISelect) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  useOutsideClick(ref, toggleOpen);

  return (
    <div
      ref={isOpen ? ref : null}
      className={cx('select', {
        'select--open': isOpen,
      })}
      onClick={toggleOpen}
      aria-hidden='true'
    >
      {!value && <span className={cx('select__title')}>{text}</span>}
      <span className={cx('select__title')} onClick={toggleOpen}>
        {value}
      </span>
      <DownOutlined className={cx('select__arrow')} />
      {isOpen && options && (
        <ul
          className={cx('select__optionContainer', {
            'select__optionContainer--open': isOpen,
          })}
        >
          <SimpleBar style={{ maxHeight: 'inherit' }}>
            {options.map((option, index) => (
              <li
                // onClick={() => {
                //   setValue(option);
                // }}
                className={styles.select__option}
                key={index}
                aria-hidden='true'
              >
                <p className={cx('select__optionName')}>{option}</p>
              </li>
            ))}
          </SimpleBar>
        </ul>
      )}
    </div>
  );
}
