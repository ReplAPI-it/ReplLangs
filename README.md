> Part of the [ReplAPI.it Project](https://replit.com/@ReplAPIit)

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

# ReplLangs
This is ReplLangs, an API that allows you to fetch more accurate language data from a Repl. It functions by scanning the file extension of every file in a Repl and formatting it to output data in a user-friendly manner!

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
    { 
      "name": "javascript", 
      "count": 1
    }
  ]
}
```

[contributors-shield]: https://img.shields.io/github/contributors/RayhanADev/ReplLangs.svg?style=for-the-badge
[contributors-url]: https://github.com/RayhanADev/ReplLangs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/RayhanADev/ReplLangs.svg?style=for-the-badge
[forks-url]: https://github.com/RayhanADev/ReplLangs/network/members
[stars-shield]: https://img.shields.io/github/stars/RayhanADev/ReplLangs.svg?style=for-the-badge
[stars-url]: https://github.com/RayhanADev/ReplLangs/stargazers
[issues-shield]: https://img.shields.io/github/issues/RayhanADev/ReplLangs.svg?style=for-the-badge
[issues-url]: https://github.com/RayhanADev/ReplLangs/issues
[license-shield]: https://img.shields.io/github/license/RayhanADev/ReplLangs.svg?style=for-the-badge
[license-url]: https://github.com/RayhanADev/ReplLangs/blob/master/LICENSE.txt
