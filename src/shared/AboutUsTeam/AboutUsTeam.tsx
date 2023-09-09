import './_AboutUsTeam.scss';
import aleksandra from '../../assets/img/aleksandra.jpg';
import masha from '../../assets/img/masha.jpg';
import valeriya from '../../assets/img/valeriya.jpg';
const AboutUsTeam = () => {
  return (
    <>
      <div className='about-container__photos'>
        <img src={aleksandra} alt='team-photo' />
        <img src={masha} alt='team-photo' />
        <img src={valeriya} alt='team-photo' />
      </div>
    </>
  );
};
export default AboutUsTeam;
