import './_AboutUsTeamPhoto.scss';
import school from '../../assets/img/RsSchool.png';
const AboutUsTeamPhoto = () => {
  return (
    <>
      <div className='about-container__img'>
        <div className='about-container__description'>
          <div className='about-container__title'>
            <span className='color'>We are</span> DigiSet
            <span className='color'> team</span>
            <div className='about-container__logo'>
              <a href='https://rs.school/' target='_blank'>
                <img src={school} alt='school-logo' />
              </a>
            </div>
          </div>
          <p className='about-container__story'>
            <span className='color'>This is a story</span> of effective
            cooperation, passion for information technology and the desire to
            help others master this fascinating profession. Cohesive work and
            mutual assistance were able to ensure the succsesful completion of
            the project.
          </p>
        </div>
      </div>
    </>
  );
};
export default AboutUsTeamPhoto;
