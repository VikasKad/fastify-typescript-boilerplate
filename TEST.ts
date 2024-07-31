import axios from 'axios';
import https from 'https';

const url = 'https://hermes-beta.pyth.network/v2/updates/price/stream?ids[]=0x44a93dddd8effa54ea51076c4e851b6cbbfd938e82eb90197de38fe8876bb66e';

// Create an https agent for keep-alive connections
const agent = new https.Agent({ keepAlive: true });

// Function to fetch the price stream with retry logic
const fetchPriceStream = async (retries = 5) => {
  try {
    // Create a readable stream from the axios request
    const response = await axios.get(url, { responseType: 'stream', timeout: 60000, httpsAgent: agent });

    let buffer = '';

    // Listen for data events
    response.data.on('data', (chunk: any) => {
      console.log(`----------------${new Date()} Received message------------------`);
      // Append the chunk to the buffer
      buffer += chunk.toString();
      
      // Split buffer into parts by new lines
      const parts = buffer.split('\n');

      // Keep the last part in the buffer for the next chunk
      buffer = parts.pop() || '';

      // Process each complete part
      for (const part of parts) {
        console.log("part", part);
        // Check if the part contains 'data:'
        if (part.startsWith('data:')) {
          try {
            // Parse the JSON data after 'data:'
            const jsonData = JSON.parse(part.substring(5).trim());
            
            // Extract the parsed data
            const parsedData = jsonData.parsed;
            // Extract and log only the price value from parsed data
            if (parsedData && parsedData.length > 0) {
              parsedData.forEach((item: any) => {
                const price = item.price.price;
                console.log('Price:', price);
              });
            }
          } catch (error) {
            console.log("Error parsing JSON:", error);
          }
        }
      }
    });

    // Listen for the end of the stream
    response.data.on('end', () => {
      console.log('Stream ended');
    });

    // Handle errors in the stream
    response.data.on('error', (error: any) => {
      console.error('Stream error:', error);
      if (retries > 0) {
        console.log(`Retrying... (${retries} retries left)`);
        fetchPriceStream(retries - 1);
      }
    });
  } catch (error) {
    console.error('Error fetching price stream:', error);
    if (retries > 0) {
      console.log(`Retrying... (${retries} retries left)`);
      fetchPriceStream(retries - 1);
    }
  }
};

// Call the function to fetch the price stream
fetchPriceStream();
