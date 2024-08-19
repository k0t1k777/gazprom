import { Button, Input } from 'antd';
import styles from 'src/pages/Registration/Registration.module.scss';
import { selectUsers, setEmail, setPassword } from 'src/store/features/slice/userSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

interface RegistrationProps {
  handleRegister: (data: { email: string; password: string }) => void;
}

export default function Registration({ handleRegister }: RegistrationProps) {
  const { email, password } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister({
      email,
      password,
    });
  };

  return (
    <section className={styles.registration}>
      <h1 className={styles.title}>Авторизация</h1>
      <form className={styles.container} onSubmit={handleSubmit}>
        <Input
          className={styles.input}
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          placeholder='Логин'
        ></Input>
        <Input
          className={styles.input}
          type='current-password'
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          placeholder='Введите пароль'
        ></Input>
        <Button htmlType='submit' className={styles.button}>
          Войти
        </Button>
      </form>
    </section>
  );
}
