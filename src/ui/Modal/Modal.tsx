import { Button, Input } from 'antd';
import styles from 'src/ui/Modal/Modal.module.scss';

interface RegistrationProps {
  handleOk: () => void;
  handleCancel:  () => void;
}

export default function Modal() {

  return (
    <section className={styles.registration}>
      <h3 className={styles.title}>Введите имя команды</h3>
      <form className={styles.container} >
        <Input
          className={styles.input}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder='введите текст'
        ></Input>
        <Button htmlType='submit' className={styles.button}>
          Отправить
        </Button>
      </form>
    </section>
  );
}
