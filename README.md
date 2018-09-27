# Glassdoor review scraper

Run

```
npm i
node index.js https://www.glassdoor.com/Reviews/XXXXX-Reviews-YYYYYYY.htm?sort.sortType=RD&sort.ascending=false&filter.employmentStatus=REGULAR&filter.employmentStatus=PART_TIME&filter.employmentStatus=UNKNOWN
```

Output

```
{
  "review": {
    "date": "Jan 2, 2018",
    "summary": "\"Still great company\"",
    "stars": "****",
    "author": "Current Employee - Anonymous Employee",
    "pros": "Still great benefits.",
    "cons": "Still too political.",
    "advice": "We told you to fix the politics."
  }
}
{
  "review": {
    "date": "Jan 1, 2018",
    "summary": "\"Great company\"",
    "stars": "****",
    "author": "Current Employee - Anonymous Employee",
    "pros": "Great benefits.",
    "cons": "Too political.",
    "advice": "Fix the politics."
  }
}

```
