import './_Footer.scss';
import { FOOTER_LINKS_DATA as footerLinks } from '../../constants/footerConstants/footerConstants';
import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';

const Footer = () => {
  return (
    <footer className={'footer'}>
      {footerLinks.map(({ value, className, id, to }) => (
        <ButtonWithRoute
          className={className}
          path={to}
          data={value}
          key={id}
        />
      ))}
    </footer>
  );
};

export default Footer;
