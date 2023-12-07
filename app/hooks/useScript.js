import { exec } from "child_process";
import * as path from "path";

const useScript = (scriptName) => {
  // Get the full path to the file
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      __dirname,
      "../../../../../public/data/data.txt"
    );
    exec(
      `D:/Sites/ECG/pyScripts/venv/Scripts/python.exe D:/Sites/ECG/pyScripts/${scriptName} ${filePath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Script Error: ${stderr}`);
          return;
        }

        // Parse the JSON data
        const data = JSON.parse(stdout);

        // Resolve the promise with the data
        resolve(data.value);
      }
    );
  });
};

export default useScript;
