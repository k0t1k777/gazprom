import styles from 'src/pages/Main/Main.module.scss'

import SideBar from 'src/components/SideBar/SideBar';

export default function Main() {

  return (
    <div className={styles.main}>
     <SideBar />
    </div>    
  )
}
