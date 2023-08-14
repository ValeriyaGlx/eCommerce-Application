import './_ModalFailed.scss';
import logoFailed from '../../assets/icons/modal-logo-failed.png';

const ModalFailed = () => {
  return (
    <div className={'background'}>
      <div className={'modal'}>
        <div className={'modal-content'}>
          <img src={logoFailed} alt={'logo-failed'} />
          <h2>Login Failed !</h2>
          <p>Please, recheck the username and password and try again</p>
          <button>TRY AGAIN</button>
        </div>
      </div>
    </div>
  );
};

export default ModalFailed;
