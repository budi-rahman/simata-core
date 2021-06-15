exports.templateForgotPassword = (payload) => {
  return `
  <h3>Forgot Password request</h3>
  <p>
    We just receive forgot password request, here is the link <a href="${payload.forgotLink}">${payload.forgotLink}</a>
  </p>
  `;
};

exports.resetPassword = (payload) => {
  return `
    <p>
Hello, we got new password reset request. Here is your new password.
<br />
new password: <strong>${payload.password}</strong>

    </p>
  `;
};
