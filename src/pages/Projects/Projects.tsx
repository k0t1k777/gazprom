import styles from 'src/pages/Projects/Projects.module.scss';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useEffect } from 'react';
import ProjectsItem from 'src/ui/ProjectsItem/ProjectsItem';
import {
  fetchGetProjects,
  selectProjects,
} from 'src/store/features/slice/projectsSlice';

export default function Projects() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector(selectProjects);
  console.log('projects: ', projects);



  useEffect(() => {
    dispatch(fetchGetProjects());
  }, []);

  return (
    <section className={styles.projects}>
      {projects.map((item) => (
        <ProjectsItem
          key={item.id}
          name={item.name}
          teams={item.teams}
        />
      ))}
    </section>
  );
}
