module.exports = (function () {
  //const responseBuilder = require('../builders/responseBuilder');
  const
    { entryIds } = require('../constants/index'),
    Attachment = require('../models/Attachment'),
    Button = require('../models/Button'),
    Element = require('../models/Element'),
    Message = require('../models/Message');


  function assignPayload(event) {
    switch (true) {
      case !!event.referral:
        return event.referral.ref;

      case !!event.message:
        return event.message.text;

      case !!event.postback:
        return event.postback.payload;
    }
  }

  function processEntryId(entryId) {
    switch (entryId) {
      case entryIds.FMS2019:
        return process.env.FMS2019;

      case entryIds.OXC2019:
        return process.env.OXC2019;

      default:
        //throw error. entry from unauthorized source page
        break;
    }
  }

  function processPayload(payload) {
    let message = new Message();
    switch (payload) {
      case 'Home':
        // message = responseBuilder.home();
        const attachment = new Attachment('generic', [new Element('Welcome!', 'Feel free to browse around', 'https://via.placeholder.com/1910x1000', [new Button('Agenda', 'postback', 'Agenda')])])
        message.attachment = attachment;
        return message;

      case 'Test':
        message = {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'Test',
              buttons: [new Button('Testing', 'postback', 'Home')]
            }
          }
        }

        return message
      // case 'General_Information':
      //   message = responseBuilder.generalInformation();
      //   return message;

      // case 'About_Application':
      //   message = responseBuilder.aboutApplication();
      //   return message;

      // case 'About_Application_Why':
      //   message = responseBuilder.aboutApplicationWhy();
      //   return message;

      // case 'About_Developer':
      //   message = responseBuilder.aboutDeveloper();
      //   return message;

      // case 'About_Contact':
      //   message = responseBuilder.aboutContact();
      //   return message;

      // case 'About_Developer_Bio':
      //   message = responseBuilder.aboutDeveloperBio();
      //   return message;

      // case 'About_Developer_Stack':
      //   message = responseBuilder.aboutDeveloperStack();
      //   return message;

      // case 'About_Developer_Projects':
      //   message = responseBuilder.aboutDeveloperProjects();
      //   return message;

      default:
        return {
          text: 'I\'m sorry... I don\'t recognize that input :('
        };
    }
  }

  return {
    assignPayload: assignPayload,
    processEntryId: processEntryId,
    processPayload: processPayload
  };
})();