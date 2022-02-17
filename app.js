const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

app.post(process.env.BITBUCKET_HOOK_ADDRESS, (request, response) => {
    response.status(200).end();
    pullrequest = request.body.pullrequest;
    actor = request.body.actor;

    sendDiscordHook(pullrequest.title, pullrequest.description, request.body.pullrequest.links.html.href,
        "5814783", actor.display_name, request.body.actor.links.avatar.href, pullrequest.created_on);
});

function sendDiscordHook(title, description, titleUrl, color, footer, footerIconUrl, time) {
    axios.post(process.env.DISCORD_HOOK_ADDRESS, {
        embeds: [
            {
                title: title,
                description: description,
                url: titleUrl,
                color: color,
                footer: {
                    text: footer,
                    icon_url: footerIconUrl
                },
                timestamp: time
            }
        ]
    }).catch(function (error) {
        console.log(error);
    });
}
