import '../styles/ScrollTop.scss';
import { ChevronDoubleUp } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';

const ScrollTop = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled >= 401 && visible === false) {
        setVisible(true);
      } else if (scrolled <= 400 && visible === true) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  return (
    <div 
      className={'scrolltop'} 
      onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'});}}
      style={{display: visible? 'flex' : 'none'}}
    >
      <ChevronDoubleUp size={30} />
    </div>
  );
};

export default ScrollTop;