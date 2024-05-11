# DirWatcher Application

DirWatcher is an application designed to run a long-running background task that monitors a configured directory at scheduled intervals. It reads the contents of files in the directory, counts the occurrences of a configured magic string, and saves the results in a database. Additionally, it tracks any new files added or deleted during the monitoring process.

## Components

### 1. REST API Server

The REST API Server provides endpoints to interact with the DirWatcher application. It allows users to perform various actions such as configuring the monitored directory, setting the time interval for the background task, changing the magic string, starting or stopping the task manually, and retrieving task run details.

### 2. Long Running Background Task

The long-running background task is responsible for monitoring the configured directory at scheduled intervals. It reads the contents of files, counts the occurrences of the configured magic string, and saves the results in the database. Additionally, it tracks any changes in the directory, including newly added files and deleted files.

## Actions

The DirWatcher application supports the following actions:

1. **Configure Directory**: Set the directory to be monitored.
2. **Set Time Interval**: Set the time interval for the background task.
3. **Set Magic String**: Configure the magic string to search for in the files.
4. **Start Task**: Manually start the background task.
5. **Stop Task**: Manually stop the background task.
6. **Get Task Run Details**: Retrieve details of each task run, including start time, end time, total runtime, list of added files, list of deleted files, total occurrences of the magic string, and task status.

## Usage

To use the DirWatcher application, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.
3. Configure the environment variables according to your setup.
4. Start the application by running `npm run local`.
5. Access the REST API endpoints to perform desired actions.

## Environment Variables

Ensure the following environment variables are configured:

- `NODE_ENV`: Development or Production environment.
- `basicAuthUser`: Lumel
- `basicAuthKey`: DAF87DSFDSFDSA98FSADKJE324KJL32HFD7FDSFB24343J49DSF
- `MONGODB_URL`:mongodb://127.0.0.1:27017/lumel
- `PORT`: 2000

## Additional Improvements

Consider implementing the following additional improvements:

- Implement an API endpoint to manually start or stop the task.
- Enhance error handling and logging mechanisms for better debugging.
- Implement authentication and authorization mechanisms to secure the API endpoints.
- Add support for monitoring multiple directories simultaneously.
- Implement functionality to archive task run details for historical analysis.

## API CURL LINKS

**Start Task:**

curl --location 'http://localhost:2000/api/task/start' 
--header 'Content-Type: application/json' \
--header 'Authorization: Basic THVtZWw6REFGODdEU0ZEU0ZEU0E5OEZTQURLSkUzMjRLSkwzMkhGRDdGRFNGQjI0MzQzSjQ5RFNG' \
--data '{
    "directory": "C:/Desktop/monitor",
    "magicString": "apple",
    "interval": 5000
}'

**Stop Task:**

curl --location 'http://localhost:2000/api/task/stop' 
--header 'Content-Type: application/json' \
--header 'Authorization: Basic THVtZWw6REFGODdEU0ZEU0ZEU0E5OEZTQURLSkUzMjRLSkwzMkhGRDdGRFNGQjI0MzQzSjQ5RFNG' \
--data '{
    "directory": "C:/Desktop/monitor"
}'

**Get Task Details:**

curl --location 'http://localhost:2000/api/task/' 
--header 'Authorization: Basic THVtZWw6REFGODdEU0ZEU0ZEU0E5OEZTQURLSkUzMjRLSkwzMkhGRDdGRFNGQjI0MzQzSjQ5RFNG' \
--data ''


## Database Diagram


{
  "_id": {
    "$oid": "663f2ffbca46a8f023efa21a"
  },
  "directory": "C:/Desktop/monitor",
  "magicString": "apple",
  "interval": 5000,
  "status": 1,
  "fileContent": "An apple is the edible fruit of a number of trees, known for its juicy, green, or red fruits. The tree (Malus spp.) is grown worldwide. Its fruit is low-cost, popular, and common all over the earth.\r\n\r\nApplewood is a type of wood that comes from this tree.\r\n\r\nThe apple tree comes from southern Kazakhstan, Kyrgyzstan, Uzbekistan, and northwestern part of China.[1][2][3] Apples have been grown for thousands of years in Asia and Europe. They were brought to North America by European settlers. Apples have religious and mythological significance in many cultures.\r\n\r\nApples are generally grown by grafting, although wild apples grow readily from seed. Apple trees are large if grown from seed, but small if grafted onto roots (rootstock). There are more than 10000 known variants of apples, with a range of desired characteristics. Different variants are bred for various tastes and uses: cooking, eating raw and cider production are the most common uses. In addition to that, when it comes to food toxicity, the seeds in apples can be fatal, but only if they've been crushed. Apples contain amygdalin, which can release cyanide when digested. Though the amount in apple seeds is generally low and requires significant ingestion to be harmful( killing or paralyzing you) it is still important to address such issue.\r\n\r\nTrees and fruit are attacked by fungi, bacteria and pests. In 2010, the fruit's genome was sequenced as part of research on disease control and selective breeding in apple production.",
  "occurrences": 7,
  "startedOn": {
    "$date": "2024-05-11T08:56:26.914Z"
  },
  "stoppedOn": {
    "$date": "2024-05-11T08:50:29.863Z"
  },
  "__v": 0
}


## Contributor

PraveenKumar - praveenkumarkesavan3@gmail.com
Mobile Number: 7708879327

--- 
