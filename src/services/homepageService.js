import { URL_WEB_VIEW_SURVEY } from '../config/index.js';

export const handleGetStartedButton = () => {
  const response = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'Welcome to the Donut Express new chatbot!',
            image_url:
              'https://res.cloudinary.com/keystone-demo/image/upload/v1565391007/zgfyq7a2i9mtuyglrqou.jpg',
            subtitle: '(saving data to google sheet)',
            default_action: {
              type: 'web_url',
              url: 'https://github.com/AlexMartin998?tab=repositories',
              webview_height_ratio: 'tall',
            },

            buttons: [
              {
                type: 'web_url',
                title: 'Donut Express Survey',
                url: `${URL_WEB_VIEW_SURVEY}`,
                webview_height_ratio: 'tall',
                messenger_extensions: true, // false: open the webview in new tab
              },
              {
                type: 'web_url',
                title: 'My GitHub',
                url: `https://github.com/AlexMartin998`,
              },
            ],
          },
        ],
      },
    },
  };

  return response;
};
