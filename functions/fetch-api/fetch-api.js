const fetch = require("node-fetch");
const {api_key} = process.env;

const handler = async function (event, context) {
  var input = event.queryStringParameters.input.trim() || "";

  console.log(input);

  var check = input.split(".");
  if (check.length >= 4) {
    var ip = input;

    try {
      const response = await fetch(
        "https://geo.ipify.org/api/v1?apiKey=" + api_key + "&ipAddress=" + ip
      );
      if (!response.ok) {
        try {
          var res = await fetch(
            "https://geo.ipify.org/api/v1?apiKey=" + api_key
          );
          var myData = await res.json();
          return {
            statusCode: 200,
            body: JSON.stringify({...myData, notFound : true}),
          };
        } catch (err) {
          return { statusCode: response.status, body: response.statusText };
        }
      } else {
        const data = await response.json();
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: error.message,
        }),
      };
    }
  } else {
    var domain = input;

    try {
      const response = await fetch(
        "https://geo.ipify.org/api/v1?apiKey=" + api_key + "&domain=" + domain
      );

      if (!response.ok) {
        try {
          var res = await fetch(
            "https://geo.ipify.org/api/v1?apiKey=" + api_key
          );
          var myData = await res.json();
          return {
            statusCode: 200,
            body: JSON.stringify({...myData, notFound : true}),
          };
        } catch (err) {
          return { statusCode: response.status, body: response.statusText };
        }
      } else {
        const data = await response.json();
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: error.message,
        }),
      };
    }
  }
};

module.exports = { handler };
