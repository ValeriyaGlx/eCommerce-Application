import ButtonWithRoute from '../../shared/components/ButtonWithRoute/ButtonWithRoute';

const WelcomeBackSection = () => {
  return (
    <section className={'welcome-back'}>
      <h2 className={'welcome-back-inner'}>Welcome Back!</h2>
      <p>
        To keep connected with us please
        <br />
        log in with your personal info
      </p>
      <ButtonWithRoute
        className={'button-signIn button-signIn-blue'}
        path={'/signIn'}
        data={'Sign in'}
      />
    </section>
  );
};

export default WelcomeBackSection;
