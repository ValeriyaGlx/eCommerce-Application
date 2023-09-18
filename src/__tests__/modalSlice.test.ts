import modalReducer, {
  openModal,
  closeModal,
  setSingUpModalValue,
  setSingUpSuccess,
} from '../app/store/actions/modalSliceAction/modalSlice';

describe('modal', () => {
  it('should handle initial state', () => {
    const initialState = {
      isOpen: false,
      isSignUpModal: false,
      isSignUpSuccessful: false,
    };

    expect(modalReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle openModal', () => {
    const initialState = {
      isOpen: false,
      isSignUpModal: false,
      isSignUpSuccessful: false,
    };

    const nextState = modalReducer(initialState, openModal());

    expect(nextState.isOpen).toBe(true);
  });

  it('should handle closeModal', () => {
    const initialState = {
      isOpen: true,
      isSignUpModal: false,
      isSignUpSuccessful: false,
    };

    const nextState = modalReducer(initialState, closeModal());

    expect(nextState.isOpen).toBe(false);
  });

  it('should handle setSingUpModalValue', () => {
    const initialState = {
      isOpen: false,
      isSignUpModal: false,
      isSignUpSuccessful: false,
    };

    const nextState = modalReducer(initialState, setSingUpModalValue({ isOpen: true }));

    expect(nextState.isSignUpModal).toBe(true);
  });

  it('should handle setSingUpSuccess', () => {
    const initialState = {
      isOpen: false,
      isSignUpModal: false,
      isSignUpSuccessful: false,
    };

    const nextState = modalReducer(initialState, setSingUpSuccess({ isSuccess: true }));

    expect(nextState.isSignUpSuccessful).toBe(true);
  });
});
