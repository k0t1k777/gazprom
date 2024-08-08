import { Button, Input } from 'antd';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from 'src/pages/Registration/Registration.module.scss';

interface RegistrationProps {
  handleRegister: (data: { email: string; password: string }) => void;
}

export default function Registration() {
  const { handleRegister } = useOutletContext<RegistrationProps>();

  const [email, setEmail] = useState<string>('');
  console.log('email: ', email);
  const [password, setPassword] = useState<string>('');
  console.log('password: ', password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister({
      email,
      password,
    });
  };

  return (
    <div className={styles.registration}>
      <h1 className={styles.title}>Авторизация</h1>
      <form className={styles.container} onSubmit={handleSubmit}>
        <Input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Логин'
        ></Input>
        <Input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Введите пароль'
        ></Input>
        <Button type='primary' htmlType='submit' className={styles.button}>Войти</Button>
      </form>
    </div>
  );
}
