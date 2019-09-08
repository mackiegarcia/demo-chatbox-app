//Install express server
import { environment } from './src/environments/environment';
import * as express from 'express';
import * as path from 'path';

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/demo-chatbox-app'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/demo-chatbox-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || environment.appServerPort);