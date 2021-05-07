> Part of the [ReplAPI.it Project](https://replit.com/@ReplAPIit)

# ReplLangs
This is ReplLangs, and API that allows you to fetch more accurate language data from a Repl. It functions by scanning the file extension of every file in a Repl and formatting it to output data in a user-friendly manner!

## Usage
The API can be found at:
`https:/langsapi.replapiit.repl.co`

Available Endpoints include:
* `/{username}/{repl-slug}`

The output is a JSON object with total language data and and array containing the counts of each language.

## Example
Fetching: `https://langsapi.replapiit.repl.co/HelperFurret/Example-Project`
Returns:
```json
{
  "totalLanguages": 1,
  "languageCounts": [
    {"name":"javascript","count":1}
  ]
}
```
