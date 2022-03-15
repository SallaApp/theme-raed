import BasePage from './base-page';

class ThankYou extends BasePage {
    onReady() {
        
        app.anime('.thanks-item', {translateX: [20, 0]});

        app.onClick('.btn--copy', ({currentTarget: btn}) => app.copyLinkToClipboard(btn.id));

        const sendBtn = document.getElementById('resend-invoice-submit'),
              sendInput = document.getElementById('resend-invoice-input');
        if(!sendBtn) return;
        app.onClick(sendBtn, ({currentTarget: btn}) => {
          if (!sendInput.value.length || !app.isValidEmail(sendInput.value)) return;
          btn.load();
          //added By data-on-success="onSuccess", data-on-fail="onFail"
          window.onFail = window.onSuccess = () => btn.stop();
        })
       
    }
}

ThankYou.intiateWhenReady('ThankYou', ['thank-you']);