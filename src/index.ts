import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { generateAvatarSvg, convertSvgToPng } from './avatarGenerator';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Avatar API',
      version: '1.0.0',
      description: 'A simple API for generating customizable SVG and PNG avatars using the avataaars library',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'API Support',
        url: 'https://github.com/fangpenlin/avataaars',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/index.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the homepage
 *     description: Serves the homepage with the avatar generator UI
 *     responses:
 *       200:
 *         description: HTML page with the avatar generator UI
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * @swagger
 * /avatar:
 *   get:
 *     summary: Generate a custom avatar in SVG format
 *     description: Returns an SVG avatar based on the provided options
 *     parameters:
 *       - in: query
 *         name: avatarStyle
 *         schema:
 *           type: string
 *           enum: [Circle, Transparent]
 *         description: The avatar style
 *       - in: query
 *         name: topType
 *         schema:
 *           type: string
 *           enum: [NoHair, Eyepatch, Hat, Hijab, Turban, WinterHat1, WinterHat2, WinterHat3, WinterHat4, LongHairBigHair, LongHairBob, LongHairBun, LongHairCurly, LongHairCurvy, LongHairDreads, LongHairFrida, LongHairFro, LongHairFroBand, LongHairNotTooLong, LongHairShavedSides, LongHairMiaWallace, LongHairStraight, LongHairStraight2, LongHairStraightStrand, ShortHairDreads01, ShortHairDreads02, ShortHairFrizzle, ShortHairShaggyMullet, ShortHairShortCurly, ShortHairShortFlat, ShortHairShortRound, ShortHairShortWaved, ShortHairSides, ShortHairTheCaesar, ShortHairTheCaesarSidePart]
 *         description: The top/hair style
 *       - in: query
 *         name: accessoriesType
 *         schema:
 *           type: string
 *           enum: [Blank, Kurt, Prescription01, Prescription02, Round, Sunglasses, Wayfarers]
 *         description: The accessories type
 *       - in: query
 *         name: hairColor
 *         schema:
 *           type: string
 *           enum: [Auburn, Black, Blonde, BlondeGolden, Brown, BrownDark, PastelPink, Platinum, Red, SilverGray]
 *         description: The hair color
 *       - in: query
 *         name: facialHairType
 *         schema:
 *           type: string
 *           enum: [Blank, BeardMedium, BeardLight, BeardMajestic, MoustacheFancy, MoustacheMagnum]
 *         description: The facial hair type
 *       - in: query
 *         name: clotheType
 *         schema:
 *           type: string
 *           enum: [BlazerShirt, BlazerSweater, CollarSweater, GraphicShirt, Hoodie, Overall, ShirtCrewNeck, ShirtScoopNeck, ShirtVNeck]
 *         description: The clothing type
 *       - in: query
 *         name: clotheColor
 *         schema:
 *           type: string
 *           enum: [Black, Blue01, Blue02, Blue03, Gray01, Gray02, Heather, PastelBlue, PastelGreen, PastelOrange, PastelRed, PastelYellow, Pink, Red, White]
 *         description: The clothing color
 *       - in: query
 *         name: eyeType
 *         schema:
 *           type: string
 *           enum: [Close, Cry, Default, Dizzy, EyeRoll, Happy, Hearts, Side, Squint, Surprised, Wink, WinkWacky]
 *         description: The eye type
 *       - in: query
 *         name: eyebrowType
 *         schema:
 *           type: string
 *           enum: [Angry, AngryNatural, Default, DefaultNatural, FlatNatural, RaisedExcited, RaisedExcitedNatural, SadConcerned, SadConcernedNatural, UnibrowNatural, UpDown, UpDownNatural]
 *         description: The eyebrow type
 *       - in: query
 *         name: mouthType
 *         schema:
 *           type: string
 *           enum: [Concerned, Default, Disbelief, Eating, Grimace, Sad, ScreamOpen, Serious, Smile, Tongue, Twinkle, Vomit]
 *         description: The mouth type
 *       - in: query
 *         name: skinColor
 *         schema:
 *           type: string
 *           enum: [Tanned, Yellow, Pale, Light, Brown, DarkBrown, Black]
 *         description: The skin color
 *     responses:
 *       200:
 *         description: SVG image of the avatar
 *         content:
 *           image/svg+xml:
 *             schema:
 *               type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/avatar', (req, res) => {
  try {
    const options = req.query;
    const svg = generateAvatarSvg(options);
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error('Error generating avatar:', error);
    res.status(500).json({ error: 'Failed to generate avatar' });
  }
});

/**
 * @swagger
 * /avatar.png:
 *   get:
 *     summary: Generate a custom avatar in PNG format
 *     description: Returns a PNG avatar based on the provided options
 *     parameters:
 *       - in: query
 *         name: width
 *         schema:
 *           type: integer
 *           default: 300
 *         description: The width of the PNG image
 *       - in: query
 *         name: height
 *         schema:
 *           type: integer
 *           default: 300
 *         description: The height of the PNG image
 *       - in: query
 *         name: avatarStyle
 *         schema:
 *           type: string
 *           enum: [Circle, Transparent]
 *         description: The avatar style
 *       - in: query
 *         name: topType
 *         schema:
 *           type: string
 *           enum: [NoHair, Eyepatch, Hat, Hijab, Turban, WinterHat1, WinterHat2, WinterHat3, WinterHat4, LongHairBigHair, LongHairBob, LongHairBun, LongHairCurly, LongHairCurvy, LongHairDreads, LongHairFrida, LongHairFro, LongHairFroBand, LongHairNotTooLong, LongHairShavedSides, LongHairMiaWallace, LongHairStraight, LongHairStraight2, LongHairStraightStrand, ShortHairDreads01, ShortHairDreads02, ShortHairFrizzle, ShortHairShaggyMullet, ShortHairShortCurly, ShortHairShortFlat, ShortHairShortRound, ShortHairShortWaved, ShortHairSides, ShortHairTheCaesar, ShortHairTheCaesarSidePart]
 *         description: The top/hair style
 *       - in: query
 *         name: accessoriesType
 *         schema:
 *           type: string
 *           enum: [Blank, Kurt, Prescription01, Prescription02, Round, Sunglasses, Wayfarers]
 *         description: The accessories type
 *       - in: query
 *         name: hairColor
 *         schema:
 *           type: string
 *           enum: [Auburn, Black, Blonde, BlondeGolden, Brown, BrownDark, PastelPink, Platinum, Red, SilverGray]
 *         description: The hair color
 *       - in: query
 *         name: facialHairType
 *         schema:
 *           type: string
 *           enum: [Blank, BeardMedium, BeardLight, BeardMajestic, MoustacheFancy, MoustacheMagnum]
 *         description: The facial hair type
 *       - in: query
 *         name: clotheType
 *         schema:
 *           type: string
 *           enum: [BlazerShirt, BlazerSweater, CollarSweater, GraphicShirt, Hoodie, Overall, ShirtCrewNeck, ShirtScoopNeck, ShirtVNeck]
 *         description: The clothing type
 *       - in: query
 *         name: clotheColor
 *         schema:
 *           type: string
 *           enum: [Black, Blue01, Blue02, Blue03, Gray01, Gray02, Heather, PastelBlue, PastelGreen, PastelOrange, PastelRed, PastelYellow, Pink, Red, White]
 *         description: The clothing color
 *       - in: query
 *         name: eyeType
 *         schema:
 *           type: string
 *           enum: [Close, Cry, Default, Dizzy, EyeRoll, Happy, Hearts, Side, Squint, Surprised, Wink, WinkWacky]
 *         description: The eye type
 *       - in: query
 *         name: eyebrowType
 *         schema:
 *           type: string
 *           enum: [Angry, AngryNatural, Default, DefaultNatural, FlatNatural, RaisedExcited, RaisedExcitedNatural, SadConcerned, SadConcernedNatural, UnibrowNatural, UpDown, UpDownNatural]
 *         description: The eyebrow type
 *       - in: query
 *         name: mouthType
 *         schema:
 *           type: string
 *           enum: [Concerned, Default, Disbelief, Eating, Grimace, Sad, ScreamOpen, Serious, Smile, Tongue, Twinkle, Vomit]
 *         description: The mouth type
 *       - in: query
 *         name: skinColor
 *         schema:
 *           type: string
 *           enum: [Tanned, Yellow, Pale, Light, Brown, DarkBrown, Black]
 *         description: The skin color
 *     responses:
 *       200:
 *         description: PNG image of the avatar
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/avatar.png', async (req, res) => {
  try {
    // Extract width and height from query parameters
    const width = req.query.width ? parseInt(req.query.width as string) : 300;
    const height = req.query.height ? parseInt(req.query.height as string) : 300;
    
    // Remove width and height from options
    const { width: _, height: __, ...options } = req.query;
    
    // Generate SVG
    const svg = generateAvatarSvg(options);
    
    // Convert SVG to PNG
    const pngBuffer = await convertSvgToPng(svg, width, height);
    
    // Send PNG response
    res.setHeader('Content-Type', 'image/png');
    res.send(pngBuffer);
  } catch (error) {
    console.error('Error generating PNG avatar:', error);
    res.status(500).json({ error: 'Failed to generate PNG avatar' });
  }
});

/**
 * @swagger
 * /random-avatar:
 *   get:
 *     summary: Generate a random avatar in SVG format
 *     description: Returns a randomly generated SVG avatar
 *     responses:
 *       200:
 *         description: SVG image of the random avatar
 *         content:
 *           image/svg+xml:
 *             schema:
 *               type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/random-avatar', (req, res) => {
  try {
    const svg = generateAvatarSvg();
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error('Error generating random avatar:', error);
    res.status(500).json({ error: 'Failed to generate random avatar' });
  }
});

/**
 * @swagger
 * /random-avatar.png:
 *   get:
 *     summary: Generate a random avatar in PNG format
 *     description: Returns a randomly generated PNG avatar
 *     parameters:
 *       - in: query
 *         name: width
 *         schema:
 *           type: integer
 *           default: 300
 *         description: The width of the PNG image
 *       - in: query
 *         name: height
 *         schema:
 *           type: integer
 *           default: 300
 *         description: The height of the PNG image
 *     responses:
 *       200:
 *         description: PNG image of the random avatar
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get('/random-avatar.png', async (req, res) => {
  try {
    // Extract width and height from query parameters
    const width = req.query.width ? parseInt(req.query.width as string) : 300;
    const height = req.query.height ? parseInt(req.query.height as string) : 300;
    
    // Generate random SVG
    const svg = generateAvatarSvg();
    
    // Convert SVG to PNG
    const pngBuffer = await convertSvgToPng(svg, width, height);
    
    // Send PNG response
    res.setHeader('Content-Type', 'image/png');
    res.send(pngBuffer);
  } catch (error) {
    console.error('Error generating random PNG avatar:', error);
    res.status(500).json({ error: 'Failed to generate random PNG avatar' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Avatar API server running at http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
}); 