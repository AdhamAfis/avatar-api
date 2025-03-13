# Avatar API

A simple API for generating customizable SVG and PNG avatars using the [avataaars](https://github.com/fangpenlin/avataaars) library.

## Features

- Generate random avatars
- Create customized avatars with specific features
- Return avatars as SVG or PNG format
- Customize PNG dimensions
- Swagger API documentation

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd avatar-api

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Development

```bash
# Run in development mode with hot reloading
npm run dev
```

## API Documentation

The API is documented using Swagger. Once the server is running, you can access the Swagger UI at:

```
http://localhost:3000/api-docs
```

This provides an interactive interface to explore and test all available endpoints.

## API Endpoints

### SVG Endpoints

#### Get a Random Avatar (SVG)

```
GET /random-avatar
```

Returns a random SVG avatar.

#### Get a Custom Avatar (SVG)

```
GET /avatar?topType=ShortHairShortRound&hairColor=Black&...
```

Returns a customized SVG avatar based on the query parameters.

### PNG Endpoints

#### Get a Random Avatar (PNG)

```
GET /random-avatar.png?width=300&height=300
```

Returns a random PNG avatar with the specified dimensions.

#### Get a Custom Avatar (PNG)

```
GET /avatar.png?width=300&height=300&topType=ShortHairShortRound&hairColor=Black&...
```

Returns a customized PNG avatar with the specified dimensions and based on the query parameters.

### Available Options

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| width | Width of PNG image (PNG only) | 300, 500, 1000 |
| height | Height of PNG image (PNG only) | 300, 500, 1000 |
| avatarStyle | The avatar style | 'Circle', 'Transparent' |
| topType | The top/hair style | 'NoHair', 'LongHairBob', 'ShortHairShortRound' |
| accessoriesType | Accessories | 'Blank', 'Kurt', 'Prescription01', 'Round', 'Sunglasses' |
| hairColor | Hair color | 'Auburn', 'Black', 'Blonde', 'Brown', 'Red' |
| facialHairType | Facial hair style | 'Blank', 'BeardMedium', 'MoustacheFancy' |
| clotheType | Clothing style | 'BlazerShirt', 'Hoodie', 'ShirtVNeck' |
| clotheColor | Clothing color | 'Black', 'Blue01', 'Gray01', 'PastelBlue', 'White' |
| eyeType | Eye style | 'Default', 'Happy', 'Wink', 'Surprised' |
| eyebrowType | Eyebrow style | 'Default', 'RaisedExcited', 'SadConcerned' |
| mouthType | Mouth style | 'Default', 'Smile', 'Serious', 'Tongue' |
| skinColor | Skin color | 'Light', 'Brown', 'DarkBrown', 'Black', 'Tanned' |

## Examples

### SVG Examples

```html
<!-- Random SVG Avatar -->
<img src="http://localhost:3000/random-avatar" alt="Random Avatar" />

<!-- Custom SVG Avatar -->
<img src="http://localhost:3000/avatar?topType=LongHairMiaWallace&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light" alt="Custom Avatar" />
```

### PNG Examples

```html
<!-- Random PNG Avatar -->
<img src="http://localhost:3000/random-avatar.png?width=200&height=200" alt="Random Avatar" />

<!-- Custom PNG Avatar -->
<img src="http://localhost:3000/avatar.png?width=200&height=200&topType=LongHairMiaWallace&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light" alt="Custom Avatar" />
```

## License

MIT 