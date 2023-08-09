import ButtonWithRoute from '../../entities/ButtonWithRoute/ButtonWithRoute';

const WelcomeBackSection = () => {
  return (
    <section>
      <h2>Welcome Back</h2>
      <p>
        To keep connected with us please
        <br />
        log in with your personal info
      </p>
      <ButtonWithRoute
        className={'button-signIn'}
        path={'/signIn'}
        data={'Sign in'}
      />
    </section>
  );
};

export default WelcomeBackSection;
