
import axios from 'axios';

export  async function fetchAPOD(date) {
  "use server"
 
  try {

    const params = {
      api_key: 'hgc0vubnB1QZoiWCc8XQTtX9JwHnBk0fdskQ1scu'
    };

    const responseAPOD = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=hgc0vubnB1QZoiWCc8XQTtX9JwHnBk0fdskQ1scu&date=${date}`, { params });
    const imagemLink = responseAPOD.data.url;
    const imagemText = responseAPOD.data.explanation;
    const imagemTitle = responseAPOD.data.title; 
  
    return { imagemLink, imagemText, imagemTitle };

  } catch (error) {

    console.error('Erro ao buscar dados em APOD:', error);

    return null;
  }
}
 

export async function fetchNASALIBRARY(query) {
  "use server"
  try {
    const params = {
      api_key: 'hgc0vubnB1QZoiWCc8XQTtX9JwHnBk0fdskQ1scu'
    };
    
    const dataArray = [];
    const responseNASALIBRARY = await axios.get(`https://images-api.nasa.gov/search?q=${query}&&page_size=20`);
    
    for (const nasa of responseNASALIBRARY.data.collection.items) {
      let link;
      let linkVideo;

      if (nasa.data[0].media_type === 'video') {
        link = `http://images-assets.nasa.gov/video/${nasa.data[0].nasa_id}/${nasa.data[0].nasa_id}~thumb.jpg`;
        linkVideo =   `http://images-assets.nasa.gov/video/${nasa.data[0].nasa_id}/${nasa.data[0].nasa_id}~orig.mp4 `;
      } else if (nasa.data[0].media_type === 'image') {
        link = `http://images-assets.nasa.gov/image/${nasa.data[0].nasa_id}/${nasa.data[0].nasa_id}~orig.jpg`;
      }
      
      const isAccessible = await checkImageAccessibility(link);

      if (isAccessible) {
        const dataObj = {
          "collection": nasa.href,
          "title": nasa.data[0].title,
          "keywords": nasa.data[0].keywords,
          "description": nasa.data[0].description,
          "media_type": nasa.data[0].media_type,
          "thumbnail": nasa.links[0].href,
          "link": link,
          "nasa_id": nasa.data[0].nasa_id,
          "linkVideo" : link
        };

        dataArray.push(dataObj);
      }
    }

    console.log(dataArray);
    return { dataArray };
  } catch (error) {
    console.error('Erro ao buscar dados em NASA LIBRARY:', error);
    return null;
  }
}

export async function checkImageAccessibility(link) {
  try {
    const response = await axios.head(link);
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error("Error checking image accessibility:", error);
    return false;
  }
}

export  async function fetchEPIC(date) {
  "use server"
 
  try {

    const params = {
      api_key: 'hgc0vubnB1QZoiWCc8XQTtX9JwHnBk0fdskQ1scu'
    };
    
    const imageDados = [];
    const responseEPIC = await axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${date}?`, { params });

    
    responseEPIC.data.map((media) => {imageDados.push({imageName: media.image, 
      imageSunPositionX: media.sun_j2000_position.x,
      imageSunPositionY: media.sun_j2000_position.y,
      imageSunPositionZ: media.sun_j2000_position.z,
      imageLunarPositionX : media.lunar_j2000_position.x,
      imageLunarPositionY : media.lunar_j2000_position.y,
      imageLunarPositionZ : media.lunar_j2000_position.z,
      centroidLat : media.centroid_coordinates.lat,
      centroidLon : media.centroid_coordinates.lon,
      caption: media.caption,
    })});
  


    return { imageDados };

  } catch (error) {

    console.error('Erro ao buscar dados em APOD:', error);

    return null;
  }
}
 

export async function checkEPICLastAvailable() {
  "use server"
  try {
    const params = {
      api_key: 'hgc0vubnB1QZoiWCc8XQTtX9JwHnBk0fdskQ1scu'
    };

    const responseAvailable = await axios.get(`https://api.nasa.gov/EPIC/api/natural/available?`, { params });
    const lastDateAvailable = responseAvailable.data[responseAvailable.data.length - 1]

    return {lastDateAvailable};
  } catch (error) {
    console.error("Error checking EPIC's last available date:", error);
    return false;
  }
}