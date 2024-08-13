import { useEffect } from 'react';
import styles from 'src/pages/Teams/Teams.module.scss'
import { fetchGetTeams, selectTeams } from 'src/store/features/slice/teamsSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

export default function Teams() {

  const dispatch = useAppDispatch();
  const { teams } = useAppSelector(selectTeams);
  console.log('teams: ', teams);
  useEffect(() => {
    dispatch(fetchGetTeams)
  }, [])

  return (
    <div className={styles.teams}>
     Teams
    </div>    
  )
}
