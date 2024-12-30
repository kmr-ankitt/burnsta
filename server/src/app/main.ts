import express from 'express';
import { praiser, roaster } from '../ai/ai';

const PORT = 3000;
const app = express();

app.get('/api/roast', async (req, res) => {
    const id = "kmr_ankitt";
    try {
        const roast = await roaster(id);
        console.log(roast);
        res.send(roast);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching Instagram details.");
    }
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});