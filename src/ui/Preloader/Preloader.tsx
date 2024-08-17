import 'src/ui/Preloader/Preloader.scss';

export default function Preloader() {

  return (
    <div className='preloader'>
      <div className='preloader__overlay'></div>
      <div
        className='preloader__loader'></div>
    </div>
  );
}
