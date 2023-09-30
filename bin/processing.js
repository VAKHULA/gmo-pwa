const fs = require("fs");

const data = require("../scrap.json");

const processData = () => {
  // eventName: 'Event Name: 31803',
  // eventCode: 'Event Code : not available\nTrade Name: BXN™ Plus Bollgard™ Cotton',
  // eventCrop: 'Crop: Gossypium hirsutum L. - Cotton',
  // url: 'https://www.isaaa.org/gmapprovaldatabase/event/default.asp?EventID=258'
  return data.map((item) => {
    const id = item.eventName.split('EventID=')[1]
    const eventName = item.eventName.split('Event Name: ')[1]
    const eventCode = item.eventCode.split('Trade Name: ')[0].split('Event Code : ')[1]
    const tradeName = item.eventCode.split('Trade Name: ')[1]
    const eventCrop = item.eventCrop.split('Crop: ')[1]
    const tags = [eventCrop.split(' - ')[0], ...eventCrop.split(' - ')[1].split(', ')]
    return {
      id,
      eventName,
      eventCode,
      tradeName,
      eventCrop,
      tags,
    }
  })
};



try {
  fs.writeFileSync('./data.json', JSON.stringify(processData()));

} catch (err) {
  console.error(err);
}