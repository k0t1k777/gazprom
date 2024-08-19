import styles from 'src/pages/Projects/Projects.module.scss';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useEffect, useState } from 'react';
import ProjectsItem from 'src/ui/ProjectsItem/ProjectsItem';
import {
  fetchGetProjects,
  selectProjects,
} from 'src/store/features/slice/projectsSlice';

export default function Projects() {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector(selectProjects);
  console.log('projects: ', projects);
  const [visibleItems, setVisibleItems] = useState(12)
  console.log('visibleItems: ', visibleItems);


  const handleScroll = () => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    if (scrollY + windowHeight >= documentHeight - 400) {
      setVisibleItems(prev => Math.min(prev + 4, projects.length))
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      await dispatch(fetchGetProjects());
    };
    fetchProjects();
  }, [dispatch])

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
