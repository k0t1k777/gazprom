import { Button, Input } from 'antd'
import styles from 'src/pages/Registration/Registration.module.scss'

export default function Registration() {

  return (
    <div className={styles.registration}>
     <h1 className={styles.title}>Авторизация</h1>
     <div className={styles.container}>
      <Input className={styles.input} placeholder='Логин'></Input>
      <Input className={styles.input} placeholder='Введите пароль'></Input>
      <Button className={styles.button}>Войти</Button>
     </div>
    </div>    
  )
}
