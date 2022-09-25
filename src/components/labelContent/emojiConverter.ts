const emojiMap = {
  joy: '&#x1f602',
  shades: '&#x1f60e',
  happy: '&#x1f600'
};
export const regExpression = /:([^:]*):/g;
const text =
  'I was like :joy: and she was like :happy: and we ware like :shades:';



// export const emojiConverter = (reg: RegExp, text: string) => {
//   while ((result = reg.exec(text))) {
//     text = text.replace(result[0], emojiMap[result[1]]);
//   }
//   return text;
// };
