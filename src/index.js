import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
	initialState: {
		h5: {
			config: {
				size:{
					width:366,
					height:640
				}
			},
			pages: []
		}
	}
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/example'));
app.model(require('./models/presentation'));
app.model(require('./models/show'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');