import { Button, Input } from 'antd'
import styles from 'src/pages/Profile/Profile.module.scss'

export default function Profile() {

  return (
    <div className={styles.profile}>
     <h1 className={styles.title}>Авторизация</h1>
     <div className={styles.container}>
      <Input className={styles.input} placeholder='Логин'></Input>
      <Input className={styles.input} placeholder='Введите пароль'></Input>
      <Button className={styles.button}>Войти</Button>
     </div>
    </div>    
  )
}
