import './_AboutUs.scss';

import AboutUsTeamPhoto from '../../shared/AboutUsTeamPhoto/AboutUsTeamPhoto';
import AboutUsTeamMembers from '../../shared/AboutUsTeamMembers/AboutUsTeamMembers';
import { ABOUTUS_LINKS_DATA as aboutLinks } from '../../constants/aboutUsConstants/aboutUsConstants';

const AboutUs = () => {
  return (
    <>
      <div className='about'>
        <AboutUsTeamPhoto />
        <div className='about-container__photos'>
          {aboutLinks.map(({ id, img, title, links, linkGithub, icon }) => (
            <AboutUsTeamMembers
              key={id}
              imageUrl={img}
              title={title}
              links={links}
              linkGithub={linkGithub}
              icon={icon}
            />
          ))}
        </div>

        <h2>Сollaboration</h2>
        <div className={'collaboration'}>
          <p className='about-container__story'>
            We're a team of three developers. We all had the same mentor, and to
            our surprise, we're not only from the same country but also from the
            same city. Realizing this unique coincidence, we teamed up early in
            the Code JS interview stages. We supported each other in
            preparation, conducted trial interviews, and shared insights.
          </p>
          <div></div>
        </div>
        <div className={'collaboration'}>
          <div></div>
          <p className='about-container__story'>
            As we progressed to the final project, we became a tight-knit team,
            knowing each other's strengths and weaknesses. This friendship
            enabled seamless collaboration, fostering an environment where each
            of us felt comfortable and equally important.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
