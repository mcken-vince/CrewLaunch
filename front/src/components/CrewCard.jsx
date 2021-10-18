import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

const CrewCard = (props) => {
  const { foreman_name, crew_size, avatar } = props.crew;

  return (
    <div className='crewCard-container' >
      <Image src={avatar && avatar} alt='crew avatar' roundedCircle />
      <div className='crewCard-info'>
        <h1>{foreman_name}</h1>
        <p>Size: {crew_size} </p>
      </div>
    </div>
  )
};

export default CrewCard;