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
            <span className='color-orange'>Our journey is </span> a testament to
            the power of effective collaboration, a shared passion for
            information technology, and a drive to empower others in mastering
            this intriguing field. Our success in completing this project was a
            result of seamless teamwork and mutual support.
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
