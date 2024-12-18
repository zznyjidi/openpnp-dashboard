function asyncHttpPostJson(url, jsonData) {
  var URL = java.net.URL;
  var HttpURLConnection = java.net.HttpURLConnection;

  var thread = new java.lang.Thread(function () {
    try {
      var connection = new URL(url).openConnection();
      connection.setRequestMethod("POST");

      // Set request headers for JSON
      connection.setRequestProperty("Content-Type", "application/json");
      connection.setRequestProperty("Accept", "application/json");
      connection.setDoOutput(true);

      // Convert JSON object to string
      var jsonString = JSON.stringify(jsonData);

      // Write JSON data to request body
      var outputStream = connection.getOutputStream();
      var writer = new java.io.OutputStreamWriter(outputStream, "UTF-8");
      writer.write(jsonString);
      writer.close();

      // Get response
      var responseCode = connection.getResponseCode();

      var reader = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));

      var response = "";
      var inputLine;
      while ((inputLine = reader.readLine()) !== null) {
        response += inputLine;
      }
      reader.close();

      // Parse response back to object
      var responseData = JSON.parse(response);

      print("[Dashboard]", "Status Code: " + responseCode, "Response: " + response);

      return responseData;
    } catch (error) {
      print("Error: " + error);
      return null;
    }
  });

  thread.start();
}

const nozzleName = nozzle.getName();

// Example usage
var postData = {
  nozzles: [{ id: nozzleName, isVacActive: true, isPicking: false, isPlacing: true, hasComponent: false }],
};

asyncHttpPostJson("http://127.0.0.1:10064/update-status", postData);
