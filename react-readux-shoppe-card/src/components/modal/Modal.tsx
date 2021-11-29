import React from "react";

const Modal: React.FC = () => {
  return (
    <div className="modal">
      <div className="modal__overlay"></div>
      <div className="modal__body">
        <div className="modal__inner">
          {/* Login */}

          <div className="auth-form">
            <div className="auth-form__header">
              <h3 className="auth-form__heading">Đăng kí</h3>
              <span className="auth-form__switch-btn">Đăng nhập</span>
              <div className="auth-form__form">
                <div className="auth-form__group">
                  <input type="text" className="auth-form__input" placeholder="Email của bạn" />
                </div>
                <div className="auth-form__group">
                  <input
                    type="password"
                    className="auth-form__input"
                    placeholder="Mật khẩu của bạn"
                  />
                </div>
                <div className="auth-form__group">
                  <input
                    type="password"
                    className="auth-form__input"
                    placeholder="Nhâp lại mật khẩu của bạn"
                  />
                </div>
              </div>
              .auth_form
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
