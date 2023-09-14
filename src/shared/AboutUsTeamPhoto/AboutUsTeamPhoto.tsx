import './_AboutUsTeamPhoto.scss';

const AboutUsTeamPhoto = () => {
  return (
    <>
      <div className='about-container__img'>
        <div className='about-container__description'>
          <h1 className='about-container__title'>
            <span className='color'>We are DigiSet team</span>
          </h1>
          <p className='about-container__story'>
            <span className='color-orange'>This is a story</span> of effective
            cooperation, passion for information technology and the desire to
            help others master this fascinating profession. Cohesive work and
            mutual assistance were able to ensure the succseful completion of
            the project.
          </p>
        </div>
        <div className={'about-regards'}>
          <div>Many thanks to</div>
          <a
            href={'https://rs.school/'}
            target='_blank'
            className={'about-rs-button'}
          />
        </div>
      </div>
    </>
  );
};
export default AboutUsTeamPhoto;
