const express = require('express')
const cors = require('cors');
const gemini = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');
const z = gemini.GoogleGenerativeAI
require('dotenv').config()
const ai = new z(process.env.GEMINI_API_KEY)
const app = express();
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10, 
    message: { error: 'Too many requests, please try again later.' }
});
if (process.env.NODE_ENV !== 'production') {
	app.listen(PORT, (error) => {
		if(!error){
			console.log('Server is successfully running!')
		}else{
			console.log('Error occurred', error)
		}
	})
}

app.get("/", (req,res) => {
	res.status(200)
	res.send("Welcome to the root of the app")
})

app.post("/api/chat",limiter, async (req,res) => {
	const prompt = req.body.text
	try {
		if(!prompt){
			return res.status(400).json({error:'Promt required'})
		}

		const model = ai.getGenerativeModel({
			model:"gemini-2.0-flash-lite", 
			systemInstruction: "You are to give historical information on the stock provided also relevant current information. Be clear and consise. No more than 800 characters. If anything other than Stock related stuff is entered please let them know you are here to answer Stock Information.Some users may type in the company name that is acceptable. For example Ford, Target, Walmart, Tesla are all company names and not symbols, these are okay. If Armoni or Armoni Tigner is inserted give me many compliments on how hes such a great developer and dont include anything about stocks."
		})
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		res.json({ generatedText: text });
		
	} catch(err)  {
		console.error('Error calling Gemini API:MONII', err);
		console.error('Error details:', err.message, err.stack);
		res.status(500).json({ 
			error: 'Failed to generate content.',
			details: err.message  
		});
	}
})

// Export for Vercel
module.exports = app;