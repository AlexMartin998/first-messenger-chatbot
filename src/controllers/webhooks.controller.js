import request from 'request';

import { PAGE_ACCESS_TOKEN, VERIFY_TOKEN } from '../config/index.js';
import { handleGetStartedButton } from '../services/index.js';

export const getWebhook = (req, res) => {
  // Your verify token. Should be a random string.

  // Parse the query params
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    console.log({ token, VERIFY_TOKEN });
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

export const postWebhook = (req, res) => {
  // Parse the request body from the POST
  const body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      const webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      const sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

// TODO: move to helpers
// Handles messages events

const handleMessage = (sender_psid, received_message) => {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
    };
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Is this the right picture?',
              subtitle: 'Tap a button to answer.',
              image_url: attachment_url,
              buttons: [
                {
                  type: 'postback',
                  title: 'Yes!',
                  payload: 'yes',
                },
                {
                  type: 'postback',
                  title: 'No!',
                  payload: 'no',
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(sender_psid, response);
};

// Handles messaging_postbacks events
const handlePostback = (sender_psid, received_postback) => {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { text: 'Thanks!' };
  } else if (payload === 'no') {
    response = { text: 'Oops, try sending another image.' };

    // Lo q se envia al hacer clic en get started: Envia la generic template
  } else if (payload == '<postback_payload>') {
    response = handleGetStartedButton();
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
};

// Sends response messages via the Send API
const callSendAPI = (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: 'https://graph.facebook.com/v6.0/me/messages',
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      console.log(
        '======================================= Check Error send message 11111111111111111 ======================================= '
      );
      console.log(res);
      console.log(
        '======================================= Check Error send message 2222222222222222 ======================================= '
      );
      if (!err) {
        console.log('message sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    }
  );
};

export const handleSetupInfor = async (req, res) => {
  // call the facebook api
  // Send the HTTP request to the Messenger Platform
  // // Persistent menu
  const request_body = {
    get_started: { payload: '<postback_payload>' },
    persistent_menu: [
      {
        locale: 'default',
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: 'web_url',
            title: 'Repo',
            url: 'https://github.com/AlexMartin998/first-messenger-chatbot',
            webview_height_ratio: 'full',
          },
          {
            type: 'web_url',
            title: 'GitHub',
            url: 'https://github.com/AlexMartin998',
            webview_height_ratio: 'full',
          },
          {
            type: 'postback',
            title: 'Restart the conversation',
            payload: 'RESTART_CONVERSATION',
          },
        ],
      },
    ],
    whitelisted_domains: [
      'https://messenger-chatbot-alx-t1.herokuapp.com',
      'https://first-messenger-chatbot.onrender.com',
    ], // your heroku app
  };

  return new Promise((resolve, reject) => {
    try {
      // TODO: Usar Axios
      request(
        {
          uri: 'https://graph.facebook.com/v15.0/me/messenger_profile',
          qs: { access_token: PAGE_ACCESS_TOKEN },
          method: 'POST',
          json: request_body,
        },
        (err, response, body) => {
          console.log('--------------------------------------------');
          console.log(
            'Logs setup persistent menu & get started button: ',
            response
          );
          console.log('--------------------------------------------');
          if (!err) {
            return res.send('Setup done!');
          } else {
            console.error('Unable to send message:' + err);

            return res.send(
              'Something went wrong with setup, please check logs...'
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// // // EJS - Survey: Enviar una web al Messenger
export const handleGetSurveyPage = (req, res) => {
  return res.render('survey.ejs');
};
