import 'src/ui/Preloader/Preloader.scss';

export const Preloader = () => {

  return (
    <div className='preloader'>
      <div className='preloader__overlay'></div>
      <div
        className='preloader__loader'></div>
    </div>
  );
}
