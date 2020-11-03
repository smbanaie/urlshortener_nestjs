## Redirect rate test 
 .\ab.exe -n 1000 -c 30 http://localhost:3000/r/7tQrzH
 
 
 ## Link Crreation 
  .\ab.exe -n 1000 -c 30 -H  "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inlla3RhbmV0IiwiaWF0IjoxNjA0NDA5MTY4LCJleHAiOjE2MDQ0OTU1Njh9.sQHTuVmceCc6YGlUnsB5MyzOYsThpUqn627IGLqlRac"   -T application/json -p 'J:\yektanet\shortener\benchmark\link_create.json' -g 'J:\yektanet\shortener\benchmark\link_creation.txt' -e 'J:\yektanet\shortener\benchmark\link_creation.csv'  http://localhost:3000/api/v1/shorten/link 