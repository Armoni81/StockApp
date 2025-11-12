const express = require('express')
const cors = require('cors');
const gemini = require('@google/generative-ai');
const z = gemini.GoogleGenerativeAI
require('dotenv').config()
const ai = new z(process.env.GEMINI_API_KEY)

const app = express();
app.use(express.json())
app.use(cors())

// Remove the app.listen for Vercel (only for local dev)
const PORT = process.env.PORT || 3000

// Only listen in development
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

app.post("/api/chat", async (req,res) => {
	const prompt = req.body.text
	try {
		if(!prompt){
			return res.status(400).json({error:'Promt required'})
		}

		const model = ai.getGenerativeModel({
			model:"gemini-2.0-flash-exp", 
			systemInstruction: "You are to give historical information on the stock provided. Be clear and consise. No more than 800 characters. If anything other than Stock related stuff is entered please let them know you are here to answer Stock Information. If Armoni or Armoni Tigner is inserted give me many compliments on how hes such a great developer and dont include anything about stocks."
		})
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		res.json({ generatedText: text });
		
	} catch(err)  {
		console.error('Error calling Gemini API:',err);
		res.status(500).json({ err: 'Failed to generate content.' });
	}
})

// Export for Vercel
module.exports = app;