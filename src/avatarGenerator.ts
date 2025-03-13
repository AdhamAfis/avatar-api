import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Avatar, { AvatarStyle } from 'avataaars';
import sharp from 'sharp';

// Define types for avatar options
export interface AvatarOptions {
  avatarStyle?: string;
  topType?: string;
  accessoriesType?: string;
  hairColor?: string;
  facialHairType?: string;
  clotheType?: string;
  clotheColor?: string;
  eyeType?: string;
  eyebrowType?: string;
  mouthType?: string;
  skinColor?: string;
  [key: string]: string | undefined;
}

// Default options for random avatar generation
const defaultOptions: { [key: string]: string[] } = {
  avatarStyle: ['Circle', 'Transparent'],
  topType: [
    'NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4',
    'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads',
    'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides',
    'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand',
    'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet',
    'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved',
    'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart'
  ],
  accessoriesType: [
    'Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'
  ],
  hairColor: [
    'Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink',
    'Platinum', 'Red', 'SilverGray'
  ],
  facialHairType: [
    'Blank', 'BeardMedium', 'BeardLight', 'BeardMajestic', 'MoustacheFancy', 'MoustacheMagnum'
  ],
  clotheType: [
    'BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall',
    'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'
  ],
  clotheColor: [
    'Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue',
    'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'
  ],
  eyeType: [
    'Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side',
    'Squint', 'Surprised', 'Wink', 'WinkWacky'
  ],
  eyebrowType: [
    'Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited',
    'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'
  ],
  mouthType: [
    'Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen',
    'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'
  ],
  skinColor: [
    'Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'
  ]
};

// Helper function to get a random item from an array
const getRandomItem = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate random avatar options
const generateRandomOptions = (): AvatarOptions => {
  const options: AvatarOptions = {};
  
  Object.keys(defaultOptions).forEach(key => {
    options[key] = getRandomItem(defaultOptions[key]);
  });
  
  return options;
};

// Generate avatar SVG based on provided options or random options
export const generateAvatarSvg = (options?: any): string => {
  // If no options provided or empty object, generate random options
  const avatarOptions: AvatarOptions = Object.keys(options || {}).length > 0 
    ? options 
    : generateRandomOptions();
  
  // Create the Avatar component with the options
  const avatarElement = React.createElement(Avatar, {
    style: { width: '100%', height: '100%' },
    avatarStyle: avatarOptions.avatarStyle as AvatarStyle || 'Circle',
    topType: avatarOptions.topType || 'ShortHairShortRound',
    accessoriesType: avatarOptions.accessoriesType || 'Blank',
    hairColor: avatarOptions.hairColor || 'BrownDark',
    facialHairType: avatarOptions.facialHairType || 'Blank',
    clotheType: avatarOptions.clotheType || 'Hoodie',
    clotheColor: avatarOptions.clotheColor || 'Black',
    eyeType: avatarOptions.eyeType || 'Default',
    eyebrowType: avatarOptions.eyebrowType || 'Default',
    mouthType: avatarOptions.mouthType || 'Default',
    skinColor: avatarOptions.skinColor || 'Light'
  });
  
  // Render the Avatar component to an SVG string
  return ReactDOMServer.renderToString(avatarElement);
};

// Convert SVG to PNG with specified width and height
export const convertSvgToPng = async (
  svgString: string, 
  width: number = 300, 
  height: number = 300
): Promise<Buffer> => {
  try {
    // Add XML declaration if not present
    if (!svgString.startsWith('<?xml')) {
      svgString = '<?xml version="1.0" encoding="UTF-8"?>' + svgString;
    }
    
    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svgString))
      .resize(width, height)
      .png()
      .toBuffer();
    
    return pngBuffer;
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
    throw new Error('Failed to convert SVG to PNG');
  }
}; 